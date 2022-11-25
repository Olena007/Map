using System.ComponentModel.DataAnnotations.Schema;

namespace LB4.Models
{
    [NotMapped]
    public class MyFunctionResult
    {
        public int Value { get; set; } = 0;
    }
}
