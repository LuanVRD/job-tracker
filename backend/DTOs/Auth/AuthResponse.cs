namespace backend.DTOs.Auth
{
    public class AuthResponse
    {
        public required string Token { get; set; }
        public required string UserName { get; set; }
        public required string UserEmail { get; set; }
    }
}
