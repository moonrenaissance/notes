namespace Web_API.Models
{
    public class Tags
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Color { get; set; }
        public List<Notes> Notes { get; set; }
    }
}
