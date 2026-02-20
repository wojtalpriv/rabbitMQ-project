using firstService.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace firstService.Data;

public class AppDbContext : DbContext
{
	public AppDbContext(DbContextOptions options) : base(options)
	{

	}

	public DbSet<Users> Users { get; set; }
}
