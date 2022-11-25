using System;
using System.Collections.Generic;

namespace LB4.Entities
{
    public partial class ProductBasket
    {
        public int ProductBasketId { get; set; }
        public int ProductId { get; set; }
        public int BasketId { get; set; }
        public decimal? TotalPrice { get; set; }

        public virtual Basket Basket { get; set; } = null!;
        public virtual Product Product { get; set; } = null!;
    }
}
