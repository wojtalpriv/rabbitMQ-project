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

        //do przeniesienia do secondService
        [HttpGet]
        public async Task<List<Users>> Get()
        {
            return await _dbContext.Users.ToListAsync();
        }

        //do przeniesienia do secondService
        [HttpGet("{id}")]
        public async Task<Users?> GetById(int id)
        {
            return await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == id);
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] Users user)
        {
            if (string.IsNullOrWhiteSpace(user.UserName) ||
                string.IsNullOrWhiteSpace(user.Password))
            {
                return BadRequest("Invallid Request");
            }
            await _dbContext.Users.AddAsync(user);
            await _dbContext.SaveChangesAsync();
            await _messagePublisher.PublishUserCreated(user.UserName, user.Password);

            return Ok();
        }
    }
}
