using Application.Interfaces;
using Trackers;
using Domen.Models;
using Elasticsearch.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Application.Providers
{
    public class InitialProvider : IInitialProvider
    {
        private readonly IAtrkContext _context;
        public InitialProvider(IAtrkContext context)
        {
            _context = context;
        }
        public double GetTimeBefore(string station)
        {
            var currentTime = DateTime.Now;
            var getStation = _context.Stations.FirstOrDefault(s => s.StationName == station);
            int stationId = getStation.StationId;
            var stationList = _context.StationLines.Where(s => s.StationId == stationId).ToList();
            var currentHour = currentTime.Hour;

            if ((currentHour >= 0 && currentHour < 5) || (currentTime.Hour == 00 && currentTime.Minute != 0))
            {
                var periodOpen = _context.Periods.FirstOrDefault(p => p.TimeFrom.Hour == 5);
                var timeOpen = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, periodOpen.TimeFrom.Hour, periodOpen.TimeFrom.Minute, periodOpen.TimeFrom.Second);

                var dateFinal = (timeOpen - currentTime).TotalSeconds;

                //TimeSpan t = TimeSpan.FromSeconds(dateFinal);

                //string answer = string.Format("{0:D2}:{1:D2}:{2:D2}",
                //                t.Hours,
                //                t.Minutes,
                //                t.Seconds);
                //return answer;
                //return Math.Round(dateFinal, 2);
                return Math.Round(dateFinal);
            }
            else
            {
                Period period;
                if(currentHour == 23)
                {
                    period = _context.Periods.FirstOrDefault(p => p.TimeFrom.Hour == 23 && p.TimeTo.Hour == 00);
                }
                else
                {
                    period = _context.Periods.FirstOrDefault(p => p.TimeFrom.Hour <= currentHour && p.TimeTo.Hour > currentHour);
                }
                var line = _context.Lines.FirstOrDefault(s => s.PeriodId == period.PeriodId);
                var interval = _context.Intervals.FirstOrDefault(p => p.IntervalId == line.IntervalId);
                var periodFrom = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, period.TimeFrom.Hour, period.TimeFrom.Minute, period.TimeFrom.Second);
                var periodTo = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, period.TimeTo.Hour, period.TimeTo.Minute, period.TimeTo.Second);
                var timeFromCompare = DateTime.Compare(periodFrom, currentTime);
                var timeToCompare = DateTime.Compare(periodTo, currentTime);
                TimeSpan time;
                double timesec = 0;

                if ((timeFromCompare <= 0 && timeToCompare >= 0) || (currentHour == 23 && periodTo.Hour == 0))
                {
                    var extra = periodFrom;
                    DateTime extrafinal;
                    var stopper = 0;
                    while (stopper is 0)
                    {
                        var extraCompare = DateTime.Compare(extra, currentTime);
                        if (extraCompare < 0)
                        {
                            extra = extra.AddMinutes(interval.IntervalNumber);
                            extra = extra.AddSeconds(15);
                        }
                        else
                        {
                            extrafinal = extra;
                            time = extrafinal - currentTime;
                            stopper++;
                            timesec = (double)time.TotalSeconds;
                        }
                    }
                   // TimeSpan t = TimeSpan.FromSeconds(timesec);

                    //string answer = string.Format("{0:D2}:{1:D2}:{2:D2}",
                    //                t.Hours,
                    //                t.Minutes,
                    //                t.Seconds);
                    //return answer;
                    //return Math.Round(timesec, 2);
                    return Math.Round(timesec);
                }
                else return 0;
            } 
        }

        public double DistanceTo(double lat1, double lon1, double lat2, double lon2)
        {
            double rlat1 = Math.PI * lat1 / 180;
            double rlat2 = Math.PI * lat2 / 180;
            double theta = lon1 - lon2;
            double rtheta = Math.PI * theta / 180;
            double dist =
                Math.Sin(rlat1) * Math.Sin(rlat2) + Math.Cos(rlat1) *
                Math.Cos(rlat2) * Math.Cos(rtheta);
            dist = Math.Acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;

            return dist * 1.609344;
        }
        public int GetPrice(string beginStation, string endStation)
        {
            var time = GetTravelTimeForPrice(beginStation, endStation);
            if (time < 20)
            {
                return 1;
            }
            else
            if (time > 20 && time < 60)
            {
               return 2;
            }
            else
            {
                return 3;
            }
        }

        public double GetTravelTimeForPrice(string beginStation, string endStation)
        {
            var getBegin = _context.Stations.FirstOrDefault(s => s.StationName == beginStation);
            var getEnd = _context.Stations.FirstOrDefault(s => s.StationName == endStation);

            var stationIdX = _context.Stations.FirstOrDefault(s => s.StationId == getBegin.StationId);
            var stationIdY = _context.Stations.FirstOrDefault(s => s.StationId == getEnd.StationId);

            var timetable = _context.Timetables.FirstOrDefault(t => t.StationId == getBegin.StationId || t.StationId == getEnd.StationId);
            var transport = _context.Transports.FirstOrDefault(t => t.TransportId == timetable.TransportId);

            var S = DistanceTo(stationIdX.Latitude, stationIdX.Longitude, stationIdY.Latitude, stationIdY.Longitude);
            var tracker = new Tracker();
            var V = tracker.SpeedGenerate(true);

            var t = (S / V) * 60; //minutes
            return Math.Round(t, 2);
        }

        public double GetTravelTime(string beginStation, string endStation)
        {
            var getBegin = _context.Stations.FirstOrDefault(s => s.StationName == beginStation);
            var getEnd = _context.Stations.FirstOrDefault(s => s.StationName == endStation);

            var stationIdX = _context.Stations.FirstOrDefault(s => s.StationId == getBegin.StationId);
            var stationIdY = _context.Stations.FirstOrDefault(s => s.StationId == getEnd.StationId);

            var timetable = _context.Timetables.FirstOrDefault(t => t.StationId == getBegin.StationId || t.StationId == getEnd.StationId);
            var transport = _context.Transports.FirstOrDefault(t => t.TransportId == timetable.TransportId);

            var S = DistanceTo(stationIdX.Latitude, stationIdX.Longitude, stationIdY.Latitude, stationIdY.Longitude);
            var tracker = new Tracker();
            var V = tracker.SpeedGenerate(true);

            var tt = (S / V) * 3600; //minutes
            //TimeSpan t = TimeSpan.FromSeconds(tt);

            //string answer = string.Format("{0:D2}:{1:D2}:{2:D2}",
            //                t.Hours,
            //                t.Minutes,
            //                t.Seconds);
            //return answer;

            //return Math.Round(t, 2);
            return tt;
        }

        public async Task<ActionResult<IEnumerable<Interval>>> SearchInterval(string search)
        {
            var parametr = await _context.Intervals.Where(x => x.IntervalNumber == Convert.ToInt32(search)).ToListAsync();
            if (parametr == null)
            {
                return null;
            }

            return new ObjectResult(parametr);
        }

        public async Task<ActionResult<IEnumerable<Client>>> SearchClient(string search)
        {
            var parametr = await _context.Clients.Where(x => x.Email == search).ToListAsync();
            if (parametr == null)
            {
                return null;
            }

            return new ObjectResult(parametr);
        }

        public async Task<ActionResult<IEnumerable<Line>>> SearchLine(string search)
        {
            var parametr = await _context.Lines.Where(x => x.LineColor == search).ToListAsync();
            if (parametr == null)
            {
                return null;
            }

            return new ObjectResult(parametr);
        }

        public async Task<ActionResult<IEnumerable<Period>>> SearchPeriod(int search)
        {
            var parametr = await _context.Periods.Where(x => x.TimeFrom.Hour == search || x.TimeTo.Hour == search).ToListAsync();
            if (parametr == null)
            {
                return null;
            }

            return new ObjectResult(parametr);
        }

        public async Task<ActionResult<IEnumerable<Price>>> SearchPrice(int search)
        {
            var parametr = await _context.Prices.Where(x => x.Cost == search).ToListAsync();
            if (parametr == null)
            {
                return null;
            }

            return new ObjectResult(parametr);
        }

        public async Task<ActionResult<IEnumerable<Station>>> SearchStation(string search)
        {
            var parametr = await _context.Stations.Where(x => x.StationName == search).ToListAsync();
            if (parametr == null)
            {
                return null;
            }

            return new ObjectResult(parametr);
        }

        public async Task<ActionResult<IEnumerable<Timetable>>> SearchTimetable(int search)
        {
            var parametr = await _context.Timetables.Where(x => x.TransportId == search).ToListAsync();
            if (parametr == null)
            {
                return null;
            }

            return new ObjectResult(parametr);
        }

        public async Task<ActionResult<IEnumerable<Transport>>> SearchTransport(string search)
        {
            var parametr = await _context.Transports.Where(x => x.Type == search).ToListAsync();
            if (parametr == null)
            {
                return null;
            }

            return new ObjectResult(parametr);
        }
    }
}
