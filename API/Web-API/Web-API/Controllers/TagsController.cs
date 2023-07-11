using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Web_API.Data;
using Web_API.Models;

namespace Web_API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class TagsController : Controller
  {
    private readonly FullStackDbContext _fullStackDbContext;

    public TagsController(FullStackDbContext fullStackDbContext)
    {
      _fullStackDbContext = fullStackDbContext;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllTags()
    {
      var tags = await _fullStackDbContext.Tags.ToListAsync();

      return Ok(tags);
    }

    [HttpPost]
    public async Task<IActionResult> AddTags([FromBody] Tags tagsRequest)
    {
      tagsRequest.Id = Guid.NewGuid();

      await _fullStackDbContext.Tags.AddAsync(tagsRequest);
      await _fullStackDbContext.SaveChangesAsync();

      return Ok(tagsRequest);
    }
  }
}
