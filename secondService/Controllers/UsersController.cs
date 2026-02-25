using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using secondService.Data;
using secondService.Models.Entities;

namespace secondService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public UsersController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }


        [HttpGet]
        public async Task<List<Users>> Get()
        {
            return await _dbContext.Users.ToListAsync();
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<Users>> GetById(string username)
        {
            var user =  await _dbContext.Users.FirstOrDefaultAsync(x => x.UserName == username);
            if (user == null)
            {
                return NotFound("Not found!");
            }

            return Ok(user);
        }

    }
}
