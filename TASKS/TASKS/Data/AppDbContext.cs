using Microsoft.EntityFrameworkCore;
using TASKS.Models;

namespace TASKS.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Models.TaskItem> Tasks { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
