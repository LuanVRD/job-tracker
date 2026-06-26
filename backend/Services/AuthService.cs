using backend.Data;
using backend.DTOs.Auth;
using backend.Entities;
using BC = BCrypt.Net.BCrypt;

namespace backend.Services
{
    public class AuthService
    {
        private readonly AppDbContext _db;
        private readonly TokenService _tokenService;

        public AuthService(AppDbContext db, TokenService tokenService)
        {
            _db = db;
            _tokenService = tokenService;
        }

        public AuthResponse Register(RegisterRequest registerRequest)
        {
            if (registerRequest.Password != registerRequest.PasswordConfirm)
            {
                throw new Exception("A senha e a confirmação de senha não coincidem.");
            }

            if (_db.Users.Any(x => x.Email.Equals(registerRequest.Email)))
            {
                throw new Exception("Email já cadastrado");
            }

            var user = new User
            {
                Id = Guid.NewGuid(),
                Name = registerRequest.Name,
                Email = registerRequest.Email,
                CreatedAt = DateTime.UtcNow,
                PasswordHash = BC.HashPassword(registerRequest.Password)
            };

            _db.Users.Add(user);
            _db.SaveChanges();

            var token = _tokenService.GenerateToken(user);

            return new AuthResponse { 
                Token = token,
                UserEmail = user.Email,
                UserName = user.Name,
            };
        }

        public AuthResponse Login(LoginRequest loginRequest)
        {
            var user = _db.Users.FirstOrDefault(x => x.Email.Equals(loginRequest.Email));

            if (user == null)
            {
                throw new Exception("Email ou senha estão incorretos");
            }

            var isValidPassword = BC.Verify(loginRequest.Password, user.PasswordHash);

            if (!isValidPassword)
            {
                throw new Exception("Email ou senha estão incorretos");
            }


            var token = _tokenService.GenerateToken(user);

            return new AuthResponse
            {
                Token = token,
                UserEmail = user.Email,
                UserName = user.Name,
            };
        }
    }
}
