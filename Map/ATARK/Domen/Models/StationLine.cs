using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domen.Models
{
    [Table("StationLine")]
    public class StationLine
    {
        [Key]
        public int StationLineId { get; set; }
        public int StationId { get; set; }
        public int LineId { get; set; }
        public virtual Line? Line { get; set; }
        public virtual Station? Station { get; set; }

    }
}
