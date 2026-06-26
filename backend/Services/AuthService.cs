using backend.Data;
using backend.DTOs.Auth;
using backend.Entities;
using BC = BCrypt.Net.BCrypt;

namespace backend.Services
{
    public class AuthService
    {
        private AppDbContext _db;

        public AuthService(AppDbContext db)
        {
            _db = db;
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

            return new AuthResponse { 
                Token = "",
                UserEmail = user.Email,
                UserName = user.Name,
            };
        }
    }
}
