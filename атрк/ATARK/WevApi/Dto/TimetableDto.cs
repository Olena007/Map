namespace WebApi.Dto
{
    public class TimetableDto
    {
        public int TimetableId { get; set; }
        public int StationId { get; set; }
        public string Beginning { get; set; }
        public string Ending { get; set; }
        public int? TransportId { get; set; }

    }
}
