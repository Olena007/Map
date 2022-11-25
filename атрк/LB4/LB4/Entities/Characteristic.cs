using System;
using System.Collections.Generic;

namespace LB4.Entities
{
    public partial class Characteristic
    {
        public Characteristic()
        {
            Products = new HashSet<Product>();
        }

        public int CharacteristicId { get; set; }
        public string? ProcessorName { get; set; }
        public int? Memory { get; set; }
        public decimal? ScreenDiagonal { get; set; }

        public virtual ICollection<Product> Products { get; set; }
    }
}
