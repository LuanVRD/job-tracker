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
            try
            {
                var result = _service.Register(register);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { ex.Message });
            }
        }

        [HttpPost("login")]
        public ActionResult<AuthResponse> PostLogin([FromBody] LoginRequest login)
        {

            try
            {
                var result = _service.Login(login);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Unauthorized(new { ex.Message });
            }
        }
    }
}
