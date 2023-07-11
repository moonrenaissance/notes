namespace Web_API.Models
{
    public class Notes
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }

        public List<Tags> Tags { get; set; }
    }
}
