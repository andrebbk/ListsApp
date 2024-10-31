using ListsSecurity.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
using Newtonsoft.Json;

namespace ListsSecurity.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ClaimsController : Controller
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Lists Security running");
        }

        [HttpPost("GetClaims")]
        public async Task<IActionResult> GetClaims()
        {
            string body = await new StreamReader(Request.Body).ReadToEndAsync();
            ClaimsExchangeModel? model = JsonConvert.DeserializeObject<ClaimsExchangeModel>(body);

            if (model == null || string.IsNullOrEmpty(model.ObjectId))
            {
                return BadRequest("object id is null...");
            }

            return Ok(new { userId = 1, hasAccess = true });
        }
    }
}
