using System;
namespace OrderManagementSystemApi.Models
{
    public class User
    {
        public int id { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string icon { get; set; }
        public bool isAdmin { get; set; }
    }
}

