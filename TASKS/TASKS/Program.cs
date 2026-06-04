using Microsoft.EntityFrameworkCore;
using TASKS.Data;
using TASKS.Services;

var builder = WebApplication.CreateBuilder(args);

// CORS (React)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// DB
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services.AddControllers();
builder.Services.AddScoped<ITaskService, TaskService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Swagger
app.UseSwagger();
app.UseSwaggerUI();

// ❗ חשוב: קודם CORS
app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();