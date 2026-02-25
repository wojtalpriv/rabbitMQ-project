using secondService.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace secondService.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions options) : base(options)
    {

    }

    public DbSet<Users> Users { get; set; }
}
