using firstService.Data;
using firstService.Models.Entities;
using firstService.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace firstService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _dbContext;
        private readonly IUserMessagePublisher _messagePublisher;

        public UsersController(AppDbContext dbContext, IUserMessagePublisher messagePublisher)
        {
            _dbContext = dbContext;
            _messagePublisher = messagePublisher;
        }

        // endpoint zostawiony do testów
        [HttpGet]
        public async Task<List<Users>> Get()
        {
            return await _dbContext.Users.ToListAsync();
        }

        // endpoint zostawiony do testów
        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null)
            {
                return NotFound("Not Found!");
            }

            return Ok(new
            {
                id = user.Id,
                userName = user.UserName
            });
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] Users user)
        {
            if (string.IsNullOrWhiteSpace(user.UserName) ||
                string.IsNullOrWhiteSpace(user.Password))
            {
                return BadRequest("Invallid Request");
            }
            else if (_dbContext.Users.Any(x => x.UserName == user.UserName))
            {
                return BadRequest("Login taken!");
            }
            await _dbContext.Users.AddAsync(user);
            await _dbContext.SaveChangesAsync();
            await _messagePublisher.PublishUserCreated(user.UserName, user.Password);

            return Ok();
        }
    }
}
