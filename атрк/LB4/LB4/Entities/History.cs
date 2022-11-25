using System;
using System.Collections.Generic;

namespace LB4.Entities
{
    public partial class History
    {
        public int HistoryId { get; set; }
        public int? BasketId { get; set; }
        public DateTime? OrderDate { get; set; }

        public virtual Basket? Basket { get; set; }
    }
}
