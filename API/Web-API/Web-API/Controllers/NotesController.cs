using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
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

            if (notesRequest.NotesTags != null)
            {
                foreach (var NoteTag in notesRequest.NotesTags)
                {
                    NoteTag.NoteId = notesRequest.Id;
                }
            }

            await _fullStackDbContext.Notes.AddAsync(notesRequest);
            await _fullStackDbContext.SaveChangesAsync();

            return Ok(notesRequest);
        }

        [HttpGet]
        [Route("{Text}")]
        public async Task<IActionResult> GetNoteOnText([FromRoute] string Text)
        {
            //var tags = await _fullStackDbContext.Tags.Where
            //    (t => t.Title.ToLower().Contains(Text)).ToListAsync();

            //var notes = await _fullStackDbContext.Notes.Include(n => n.NotesTags).ToListAsync();

            var notes = await _fullStackDbContext.Notes.
                Where(n => n.Title.ToLower().Contains(Text.ToLower())
                      || n.Description.ToLower().Contains(Text.ToLower())).ToListAsync();



            if (notes == null)
            {
                return NotFound();
            }

            return Ok(notes);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetNote([FromRoute] Guid id)
        {
            var note = await _fullStackDbContext.Notes.FirstOrDefaultAsync(x => x.Id == id);

            if(note == null)
            {
                return NotFound();
            }

            return Ok(note);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateNote([FromRoute] Guid id, Notes updateNoteRequest)
        {
            var note = await _fullStackDbContext.Notes.FindAsync(id);

            if (note == null)
            {
                return NotFound();
            }

            note.Title = updateNoteRequest.Title;
            note.Description = updateNoteRequest.Description;
            note.Date = updateNoteRequest.Date;
            //note.Tags = updateNoteRequest.Tags;

            await _fullStackDbContext.SaveChangesAsync();

            return Ok(note);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteNote([FromRoute] Guid id)
        {
            var note = await _fullStackDbContext.Notes.FindAsync(id);

            if (note == null)
            {
            return NotFound();
            }

            _fullStackDbContext.Notes.Remove(note);
            await _fullStackDbContext.SaveChangesAsync();

            return Ok(note);
        }
    }
}
