using System;
namespace OrderManagementSystemApi.Models
{
	public interface IUser
	{
		public long Id { get; set; }
        public string? UserName { get; set; }
		public string? LastName { get; set; }
		public string? PassWord { get; set; }
	}
}