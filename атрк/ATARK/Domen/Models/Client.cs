using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domen.Models
{
    [Table("Client")]
    public class Client
    {
        [Key]
        public int ClientId { get; set; }
        public string ClientRole { get; set; }
        public string Email { get; set; } = null!;
        [JsonIgnore]
        public string Password { get; set; } = null!;
        public virtual ICollection<Trip>? Trips { get; set; }
    }
}
