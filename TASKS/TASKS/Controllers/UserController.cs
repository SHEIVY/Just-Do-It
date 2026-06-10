using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TASKS.Data;
using TASKS.Models;

namespace TASKS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetAll()
        {
            var users = await _context.Users
                .Include(u => u.Tasks)
                .AsNoTracking()
                .ToListAsync();

            return Ok(users);
        }

        // GET: api/user/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<User>> GetById(int id)
        {
            var user = await _context.Users
                .Include(u => u.Tasks)
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null) return NotFound();

            return Ok(user);
        }
        // POST: api/user
        [HttpPost]
        public async Task<ActionResult<User>> Create(User user)
        {
            // [ApiController] enforces model validation automatically.
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = user.Id }, user);
        }
        // PUT: api/user/5
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, User updatedUser)
        {
            if (id != updatedUser.Id) return BadRequest();

            var existing = await _context.Users
                .Include(u => u.Tasks)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (existing == null) return NotFound();

            // Copy scalar properties from incoming model to the tracked entity.
            _context.Entry(existing).CurrentValues.SetValues(updatedUser);

            // Note: updating navigation collections (Tasks) should be handled explicitly in a real app.
            await _context.SaveChangesAsync();

            return Ok(existing);
        }
        // DELETE: api/user/5
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}