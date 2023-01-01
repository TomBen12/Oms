using System;
namespace OrderManagementSystemApi.Models
{
	public class Order
	{
		public int id { get; set; }
		public int customerId { get; set; }
		public string name {get; set; }
		public int price { get; set; }
	}
}

