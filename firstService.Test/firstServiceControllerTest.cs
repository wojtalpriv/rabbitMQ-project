using firstService.Controllers;
using firstService.Data;
using firstService.Models.Entities;
using firstService.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.FeatureManagement;
using Moq;

namespace firstService.Test
{
    public class UsersControllerCreateTest : IDisposable
    {
        private readonly AppDbContext _dbContext;
        private readonly Mock<IUserMessagePublisher> _mockPublisher;
        private readonly Mock<IFeatureManager> _mockFeatureManager;
        private readonly UsersController _controller;

        public UsersControllerCreateTest()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            _dbContext = new AppDbContext(options);

            _mockPublisher = new Mock<IUserMessagePublisher>();

            _mockFeatureManager = new Mock<IFeatureManager>();

            _controller = new UsersController(_dbContext, _mockPublisher.Object, _mockFeatureManager.Object);
        }

        public void Dispose()
        {
            _dbContext.Database.EnsureDeleted();
            _dbContext.Dispose();
        }

        [Theory]
        [InlineData("", "password123")]
        [InlineData("   ", "password123")]
        [InlineData(null, "password123")]
        [InlineData("jan", "")]
        [InlineData("jan", "   ")]
        [InlineData("jan", null)]
        [InlineData("", "")]
        [InlineData(null, null)]
        public async Task Create_InvalidInput_ReturnsBadRequest(
            string? userName, string? password)
        {
            // Arrange
            var user = new Users
            {
                UserName = userName!,
                Password = password!
            };

            // Act
            var result = await _controller.Create(user);

            // Assert
            var badRequest = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("Invallid Request", badRequest.Value);
        }

        [Fact]
        public async Task Create_DuplicateUserName_ReturnsBadRequest()
        {
            // Arrange
            _dbContext.Users.Add(new Users
            {
                UserName = "jan",
                Password = "existing123"
            });
            await _dbContext.SaveChangesAsync();

            var duplicateUser = new Users
            {
                UserName = "jan",
                Password = "newpassword"
            };

            // Act
            var result = await _controller.Create(duplicateUser);

            // Assert
            var badRequest = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("Login taken!", badRequest.Value);
        }

        [Fact]
        public async Task Create_ValidUser_ReturnsOk()
        {
            // Arrange
            var user = new Users
            {
                UserName = "jan",
                Password = "password123"
            };

            // Act
            var result = await _controller.Create(user);

            // Assert
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async Task Create_ValidUser_SavesUserToDatabase()
        {
            // Arrange
            var user = new Users
            {
                UserName = "jan",
                Password = "password123"
            };

            // Act
            await _controller.Create(user);

            // Assert
            var savedUser = await _dbContext.Users
                .FirstOrDefaultAsync(u => u.UserName == "jan");

            Assert.NotNull(savedUser);
            Assert.Equal("jan", savedUser.UserName);
            Assert.Equal("password123", savedUser.Password);
        }

        [Fact]
        public async Task Create_ValidUser_PublishesMessage()
        {
            // Arrange
            var user = new Users
            {
                UserName = "jan",
                Password = "password123"
            };

            // Act
            await _controller.Create(user);

            // Assert
            _mockPublisher.Verify(
                p => p.PublishUserCreated("jan", "password123"),
                Times.Once
            );
        }

        [Fact]
        public async Task Create_InvalidInput_DoesNotPublishMessage()
        {
            // Arrange
            var user = new Users
            {
                UserName = "",
                Password = "password123"
            };

            // Act
            await _controller.Create(user);

            // Assert
            _mockPublisher.Verify(
                p => p.PublishUserCreated(It.IsAny<string>(), It.IsAny<string>()),
                Times.Never
            );
        }

        [Fact]
        public async Task Create_DuplicateUser_DoesNotPublishMessage()
        {
            // Arrange
            _dbContext.Users.Add(new Users
            {
                UserName = "jan",
                Password = "existing123"
            });
            await _dbContext.SaveChangesAsync();

            var duplicateUser = new Users
            {
                UserName = "jan",
                Password = "newpassword"
            };

            // Act
            await _controller.Create(duplicateUser);

            // Assert
            _mockPublisher.Verify(
                p => p.PublishUserCreated(It.IsAny<string>(), It.IsAny<string>()),
                Times.Never
            );
        }
    }
}