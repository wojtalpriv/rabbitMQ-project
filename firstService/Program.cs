using firstService.Data;
using firstService.Service;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DbConnection"));
});

builder.Services.AddSingleton<IUserMessagePublisher, RabbitMqUserMessagePublisher>();

var app = builder.Build();

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
