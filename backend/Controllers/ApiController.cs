using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ApiController : ControllerBase
    {
        [HttpGet("health")]
        public IActionResult GetHealth()
        {
            return Ok(new
            {
                status = "Healthy",
                timestamp = DateTime.UtcNow
            });
        }
    }
}
