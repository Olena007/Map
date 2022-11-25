using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domen.Models
{
    [Table("Period")]
    public class Period
    {
        [Key]
        public int PeriodId { get; set; }
        public DateTime TimeFrom { get; set; }
        public DateTime TimeTo { get; set; }
        public virtual ICollection<Line>? Lines { get; set; }
    }
}
