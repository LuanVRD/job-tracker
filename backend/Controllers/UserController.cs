using backend.DTOs.User;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService _service;

        public UserController(UserService service)
        {
            _service = service;
        }

        [Authorize]
        [HttpGet("me")]
        public ActionResult<BasicDataResponse> GetBasicData()
        {
            try
            {
                Guid.TryParse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value, out Guid userId);
                var result = _service.GetBasicUserData(userId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Unauthorized(new { ex.Message });
            }
        }
    }
}
