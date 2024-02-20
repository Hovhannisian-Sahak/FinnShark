using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Account
{
    public class NewUserDto
    {
  
        public string Username { get; set; }
  
        [EmailAddress]
        public string Email { get; set; }
  
        public string Token { get; set; }
    }
}