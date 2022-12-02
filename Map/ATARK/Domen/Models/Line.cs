using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domen.Models
{
    [Table("Line")]
    public class Line
    {
        [Key]
        public int LineId { get; set; }
        public string LineColor { get; set; }
        public int? PeriodId { get; set; }
        public int? IntervalId { get; set; }
        public virtual Period? Period { get; set; }
        public virtual Interval? Interval { get; set; }
        //public virtual ICollection<Station>? Stations { get; set; }
    }
}
