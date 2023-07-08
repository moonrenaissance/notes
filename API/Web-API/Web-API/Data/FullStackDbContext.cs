using Microsoft.EntityFrameworkCore;

namespace Web_API.Controllers
{
    public class FullStackDbContext : DbContext
    {
        public FullStackDbContext(DbContextOptions options) : base(options) {}
        public DbSet<Notes> Notes{ get; set; }
        public DbSet<Tags> Tags{ get; set; }
    }
}
