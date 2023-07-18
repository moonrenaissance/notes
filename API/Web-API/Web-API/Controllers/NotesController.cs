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
            var notes = await _fullStackDbContext.Notes.Include(t => t.NotesTags).ToListAsync();

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
                    var tag = _fullStackDbContext.Tags.FirstOrDefault(t => t.Id == NoteTag.TagId);

                    if (tag == null)
                    {
                        return BadRequest();
                    }

                    NoteTag.Tag = tag;
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
            var notes = await _fullStackDbContext.Notes.
                Where(n => n.Title.ToLower().Contains(Text.ToLower())
                      || n.Description.ToLower().Contains(Text.ToLower())
                      || n.NotesTags.Any(
                          nt => nt.Tag.Title.ToLower().Contains(Text.ToLower()))).ToListAsync();

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

            if (updateNoteRequest.Title != null)
            {
                note.Title = updateNoteRequest.Title;
            }

            note.Description = updateNoteRequest.Description;
            note.Date = updateNoteRequest.Date;
            note.NotesTags = updateNoteRequest.NotesTags;

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

            var noteTags = await _fullStackDbContext.NotesTags.Where(
                nt => nt.NoteId == note.Id).ToListAsync();

            if (note != null)
            {
                _fullStackDbContext.NotesTags.RemoveRange(noteTags);
            }

            _fullStackDbContext.Notes.Remove(note);
            await _fullStackDbContext.SaveChangesAsync();

            return Ok(note);
        }
    }
}
