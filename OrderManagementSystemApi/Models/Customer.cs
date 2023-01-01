using System;

using System.Collections.Generic;
namespace OrderManagementSystemApi.Models


{
	public class Customer
	{
        public int id { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string icon { get; set; }
        public string email { get; set; }
        public string orders { get; set; }
    }
}

