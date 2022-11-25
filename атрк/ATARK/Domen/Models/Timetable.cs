using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domen.Models
{
    [Table("Timetable")]
    public class Timetable
    {
        [Key]
        public int TimetableId { get; set; }
        public int StationId { get; set; }
        public string Beginning { get; set; }
        public string Ending { get; set; }
        public int? TransportId { get; set; }
        public virtual Station? Station { get; set; }
        public virtual Transport? Transport { get; set; }
    }
}
