using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domen.Models
{
    [Table("Price")]
    public class Price
    {
        [Key]
        public int PriceId { get; set; }
        public string ZoneName { get; set; }
        public int Cost { get; set; }
        public virtual ICollection<Trip>? Tripes { get; set; }
    }
}
