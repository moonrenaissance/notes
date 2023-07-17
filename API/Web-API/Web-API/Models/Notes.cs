using System.Diagnostics.CodeAnalysis;

namespace Web_API.Models
{
    public class Notes
    {
        public Guid Id { get; set; }

        [NotNull]
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }

        public List<NoteTag> NotesTags { get; set; }
    }
}
