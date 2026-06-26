using backend.DTOs.Auth;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _service;

        public AuthController(AuthService service)
        {
            _service = service;
        }

        [HttpPost("register")]
        public ActionResult<AuthResponse> PostRegister([FromBody] RegisterRequest register)
        {
            return _service.Register(register);
        }
    }
}
