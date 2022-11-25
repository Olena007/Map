using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domen.Models
{
    [Table("Road")]
    public class Road
    {
        [Key]
        public int RoadId { get; set; }
        public string StationNameX { get; set; }
        public string StationNameY { get; set; }
        //public string DestinationX { get; set; }
        //public string DestinationY { get; set; }
        //public string CoordinatesXa { get; set; }
        //public string CoordinatesXb { get; set; }
        //public string CoordinatesYa { get; set; }
        //public string CoordinatesYb { get; set; }
        public virtual ICollection<Trip>? Tripes { get; set; }
    }
}
