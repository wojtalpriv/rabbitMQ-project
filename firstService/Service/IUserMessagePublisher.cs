namespace firstService.Service
{
    public interface IUserMessagePublisher
    {
        Task PublishUserCreated(string username, string password);
    }
}
