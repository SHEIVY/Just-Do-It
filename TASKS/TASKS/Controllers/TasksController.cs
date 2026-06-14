using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TASKS.Data;
using TASKS.DTOs;
using TASKS.Models;
using TASKS.Services;

namespace TASKS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]  // Require JWT authentication for all endpoints
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        // Helper method to extract userId from JWT token
        private int GetUserIdFromToken()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out var userId))
                throw new UnauthorizedAccessException("Invalid or missing user ID in token.");
            return userId;
        }

        // GET: api/tasks
        // Only returns tasks for the authenticated user
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            try
            {
                var userId = GetUserIdFromToken();
                // Only fetch tasks for this user
                var tasks = await _taskService.GetAllTasks(userId);

                return Ok(tasks);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
        }

        // GET: api/tasks/{id}
        // Verify user owns the task before returning it
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var userId = GetUserIdFromToken();
                var task = await _taskService.GetTaskById(id);

                if (task == null)
                    return NotFound(new { message = "Task not found." });

                // SECURITY: Verify ownership - task must belong to authenticated user
                if (task.UserId != userId)
                    return Forbid("You do not have permission to access this task.");

                return Ok(task);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
        }

        // POST: api/tasks
        // Create task for authenticated user
        // CRITICAL: Do NOT trust userId from request body
        // Extract userId from JWT token instead
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TaskItem task)
        {
            try
            {
                var userId = GetUserIdFromToken();

                // SECURITY: Override userId with authenticated user's ID
                // Never trust the userId sent by the client
                task.UserId = userId;

                var createdTask = await _taskService.CreateTask(task);

                return CreatedAtAction(nameof(GetById), new { id = createdTask.Id }, createdTask);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
        }

        // PUT: api/tasks/{id}
        // Update task - verify user owns it first
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] TaskItem updatedTask)
        {
            try
            {
                var userId = GetUserIdFromToken();

                if (id != updatedTask.Id)
                    return BadRequest(new { message = "ID mismatch." });

                // SECURITY: Fetch existing task to verify ownership
                var existingTask = await _taskService.GetTaskById(id);
                if (existingTask == null)
                    return NotFound(new { message = "Task not found." });

                // Verify user owns this task
                if (existingTask.UserId != userId)
                    return Forbid("You do not have permission to update this task.");

                // SECURITY: Never allow updating UserId from client
                updatedTask.UserId = userId;

                var result = await _taskService.UpdateTask(id, updatedTask);
                return Ok(result);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
        }

        // DELETE: api/tasks/{id}
        // Delete task - verify user owns it first
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var userId = GetUserIdFromToken();

                // SECURITY: Fetch task to verify ownership
                var existingTask = await _taskService.GetTaskById(id);
                if (existingTask == null)
                    return NotFound(new { message = "Task not found." });

                // Verify user owns this task
                if (existingTask.UserId != userId)
                    return Forbid("You do not have permission to delete this task.");

                var task = await _taskService.DeleteTask(id);
                return Ok(task);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
        }
    }
}
