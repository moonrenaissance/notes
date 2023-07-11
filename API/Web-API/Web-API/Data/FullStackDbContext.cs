using Microsoft.EntityFrameworkCore;
using Web_API.Models;

namespace Web_API.Data
{
    public class FullStackDbContext : DbContext
    {
        public FullStackDbContext(DbContextOptions options) : base(options) {}
        public DbSet<Notes> Notes { get; set; }
        public DbSet<Tags> Tags { get; set; }
  }
}
