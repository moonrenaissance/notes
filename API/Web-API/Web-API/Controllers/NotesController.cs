using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Web_API.Data;
using Web_API.Models;

namespace Web_API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class NotesController : Controller
  {
    private readonly FullStackDbContext _fullStackDbContext;

    public NotesController(FullStackDbContext fullStackDbContext)
    {
      _fullStackDbContext = fullStackDbContext;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllNotes()
    {
      var notes = await _fullStackDbContext.Notes.ToListAsync();

      return Ok(notes);
    }

    [HttpPost]
    public async Task<IActionResult> AddNotes([FromBody] Notes notesRequest)
    {
      notesRequest.Id = Guid.NewGuid();

      await _fullStackDbContext.Notes.AddAsync(notesRequest);
      await _fullStackDbContext.SaveChangesAsync();

      return Ok(notesRequest);
    }
  }
}
