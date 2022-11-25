using System;
using System.Collections.Generic;

namespace LB4.Entities
{
    public partial class Producer
    {
        public Producer()
        {
            Products = new HashSet<Product>();
        }

        public int ProducerId { get; set; }
        public string? ProducerName { get; set; }

        public virtual ICollection<Product> Products { get; set; }
    }
}
