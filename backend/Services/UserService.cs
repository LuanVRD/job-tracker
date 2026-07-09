using backend.Data;
using backend.DTOs.User;

namespace backend.Services
{
    public class UserService
    {
        private readonly AppDbContext _db;

        public UserService(AppDbContext db)
        {
            _db = db;
        }

        public BasicDataResponse GetBasicUserData(Guid userId)
        {
            var user = _db.Users.FirstOrDefault(x => x.Id.Equals(userId));

            if (user == null)
            {
                throw new Exception("Usuário não encontrado");
            }

            return new BasicDataResponse() {
                Name = user.Name,
                Email = user.Email
            };
        }
    }
}
