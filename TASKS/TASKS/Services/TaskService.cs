using Microsoft.EntityFrameworkCore;
using TASKS.Data;
using TASKS.Models;
using TASKS.DTOs;


namespace TASKS.Services
{
    public class TaskService : ITaskService
    {
        private readonly AppDbContext _context;

        public TaskService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<TaskItem>> GetAllTasks(int userId)
        {
            return await _context.Tasks.Where(t => t.UserId == userId).ToListAsync();
        }

        public async Task<TaskItem?> GetTaskById(int id)
        {
            return await _context.Tasks.FindAsync(id);
        }

        public async Task<PagedResult<TaskDto>> GetAllTasks_(
          string? search,
          string? status,
          int page = 1,
          int pageSize = 10)
        {
            var query = _context.Tasks.AsQueryable();

            // 🔎 חיפוש
            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(t =>
                    t.Title.Contains(search) ||
                    t.Description.Contains(search));
            }

            // 📌 סינון
            if (!string.IsNullOrWhiteSpace(status))
            {
                query = query.Where(t => t.Status.ToString() == status);
            }

            var totalCount = await query.CountAsync();

            var items = await query
                .OrderByDescending(t => t.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(t => new TaskDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    Status = t.Status
                })
                .ToListAsync();

            return new PagedResult<TaskDto>
            {
                Items = items,
                TotalCount = totalCount,
                Page = page,
                PageSize = pageSize
            };
        }
        public async Task<TaskItem> CreateTask(TaskItem task)
        {
            task.CreatedAt = DateTime.Now;

            _context.Tasks.Add(task);

            await _context.SaveChangesAsync();

            return task;
        }
        public async Task<TaskItem?> UpdateTask(int id, TaskItem updatedTask)
        {
            var existingTask = await _context.Tasks.FindAsync(id);

            if (existingTask == null)
            {
                return null;
            }

            existingTask.Title = updatedTask.Title;
            existingTask.Description = updatedTask.Description;
            existingTask.Status = updatedTask.Status;

            await _context.SaveChangesAsync();

            return existingTask;
        }
        public async Task<TaskItem?> DeleteTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
            {
                return null;

            }

            _context.Tasks.Remove(task);

            await _context.SaveChangesAsync();
            return task;

        }
    }
}