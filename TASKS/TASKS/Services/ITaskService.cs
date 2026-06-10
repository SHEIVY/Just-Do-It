using TASKS.Models;
using TASKS.DTOs;
namespace TASKS.Services
{
    public interface ITaskService
    {
        Task<List<TaskItem>> GetAllTasks(int userId);
        Task<PagedResult<TaskDto>> GetAllTasks_(
        string? search,
        string? status,
        int page,
        int pageSize);
        Task<TaskItem> CreateTask(TaskItem task);

        Task<TaskItem?> UpdateTask(int id, TaskItem updatedTask);
        Task<TaskItem?> DeleteTask(int id);
    }

}