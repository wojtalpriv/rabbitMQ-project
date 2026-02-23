using RabbitMQ.Client;
using System.Text;
using System.Text.Json;
using firstService.Service;

public class RabbitMqUserMessagePublisher : IUserMessagePublisher, IAsyncDisposable
{
    private IConnection? _connection;
    private IChannel? _channel;
    private bool _initialized = false;

    private async Task InitializeConnection()
    {
        if (_initialized) return;

        var factory = new ConnectionFactory { HostName = "localhost" };

        _connection = await factory.CreateConnectionAsync();
        _channel = await _connection.CreateChannelAsync();

        await _channel.QueueDeclareAsync(
            queue: "user_queue",
            durable: true,
            exclusive: false,
            autoDelete: false,
            arguments: null);

        _initialized = true;
    }

    public async Task PublishUserCreated(string username, string password)
    {
        await InitializeConnection();

        var message = new { username, password };
        var body = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(message));

        await _channel!.BasicPublishAsync(
            exchange: string.Empty,
            routingKey: "user_queue",
            body: body);
    }

    public async ValueTask DisposeAsync()
    {
        if (_channel != null) await _channel.CloseAsync();
        if (_connection != null) await _connection.CloseAsync();
    }
}