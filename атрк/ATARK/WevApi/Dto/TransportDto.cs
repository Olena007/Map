using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Dto
{
    public class TransportDto
    {
        public int TransportId { get; set; }
        public string Type { get; set; }
        public int TransportNumber { get; set; }
        public string CityName { get; set; }
    }
}
