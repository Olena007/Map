using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domen.Models
{
    [Table("Interval")]
    public class Interval
    {
        [Key]
        public int IntervalId { get; set; }
        public int IntervalNumber { get; set; }
        public virtual ICollection<Line>? Lines { get; set; }
    }
}
