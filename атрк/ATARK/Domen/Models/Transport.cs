using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domen.Models
{
    [Table("Transport")]
    public class Transport
    {
        [Key]
        public int TransportId { get; set; }
        public string Type { get; set; }
        public int TransportNumber { get; set; }
        public string? CitName { get; set; }
        public virtual ICollection<Timetable>? Timetables { get; set; }
        public virtual ICollection<Trip>? Tripes { get; set; }
    }
}
