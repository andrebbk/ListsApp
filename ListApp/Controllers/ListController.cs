using ListApp.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;

namespace ListApp.Controllers
{
    [Authorize]
    [RequiredScope("Lists.Read")]
    [Route("api/[controller]")]
    [ApiController]
    public class ListController(ILogger<ListController> _logger) : Controller
    {
        [HttpGet]
        public IActionResult Get()
        {
            var lists = new List<ListDTO>()
            {
                new ListDTO() { Id = 1, Name = "Mercearias", TypeId = 1, Type = "Compras", ItemsCount = 4 },
                new ListDTO() { Id = 1, Name = "Ferramentas", TypeId = 1, Type = "Compras", ItemsCount = 6 },
                new ListDTO() { Id = 1, Name = "Prendas", TypeId = 1, Type = "Compras", ItemsCount = 85 },
                new ListDTO() { Id = 1, Name = "Arrumações", TypeId = 1, Type = "Tarefas", ItemsCount = 40 },
                new ListDTO() { Id = 1, Name = "Melhores Filmes 2024", TypeId = 1, Type = "Filmes", ItemsCount = 129 },
                new ListDTO() { Id = 1, Name = "Férias", TypeId = 1, Type = "Tarefas", ItemsCount = 30 }
            };

            return Ok(lists.AsEnumerable());
        }
    }
}
