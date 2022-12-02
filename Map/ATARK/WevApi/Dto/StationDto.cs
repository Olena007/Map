namespace WebApi.Dto
{
    public class StationDto
    {
        public int StationId { get; set; }
        public string StationName { get; set; }
        public int LineId { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }

    }
}
