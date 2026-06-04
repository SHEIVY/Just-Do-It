using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TASKS.Data;
using TASKS.DTOs;
using TASKS.Models;
using TASKS.Services;

namespace TASKS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var tasks = await _taskService.GetAllTasks();

            return Ok(tasks);
        }
        // public async Task<IActionResult> GetAll(
        //string? search,
        //string? status,
        //int page = 1,
        //int pageSize = 10)
        //{
        //  var result = await _taskService.GetAllTasks_(search, status, page, pageSize);
        //return Ok(result);
        //}
        [HttpPost]
        public async Task<IActionResult> Create(TaskItem task)
        {
            var createdTask = await _taskService.CreateTask(task);

            return Ok(createdTask);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, TaskItem updatedTask)
        {
            if (id != updatedTask.Id)
            {
                return BadRequest();
            }

            var result = await _taskService.UpdateTask(id, updatedTask);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {


            var task = await _taskService.DeleteTask(id);

            if (task == null)
            {
                return NotFound();
            }
            return Ok(task);
        }
    }
}
