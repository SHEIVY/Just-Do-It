namespace TASKS.Models
{
    public class TaskItem
    {
        public int Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public int Status { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

}
