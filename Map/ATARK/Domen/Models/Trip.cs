using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domen.Models
{
    [Table("Trip")]
    public class Trip
    {
        [Key]
        public int TripId { get; set; }
        public int ClientId { get; set; }
        public int TransportId { get; set; }
        public int RoadId { get; set; }
        public int PriceId { get; set; }
        public virtual Client? Client { get; set; }
        public virtual Road? Road { get; set; }
        public virtual Transport? Transport { get; set; }
        public virtual Price? Price { get; set; }
    }
}
