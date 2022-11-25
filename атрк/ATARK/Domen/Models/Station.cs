using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domen.Models
{
    [Table("Station")]
    public class Station
    {
        [Key]
        public int StationId { get; set; }
        public string StationName { get; set; }
        //public int LineId { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        //public virtual Line? Line { get; set; }
        public virtual ICollection<Timetable>? Timetables { get; set; }
        public virtual ICollection<StationLine>? StationLines { get; set; }

    }
}
