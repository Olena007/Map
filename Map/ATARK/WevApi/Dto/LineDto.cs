namespace WebApi.Dto
{
    public class LineDto
    {
        public int LineId { get; set; }
        public string LineColor { get; set; }
        public int? PeriodId { get; set; }
        public int? IntervalId { get; set; }
    }
}
