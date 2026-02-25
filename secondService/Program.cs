using secondService.Data;
using Microsoft.EntityFrameworkCore;
using secondService.Service;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DbConnection"));
});
builder.Services.AddHostedService<RabbitMqUserMessageConsumer>();

var app = builder.Build();

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
