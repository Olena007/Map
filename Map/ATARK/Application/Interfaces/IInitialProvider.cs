using Domen.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IInitialProvider
    {
        double GetTimeBefore(string stationFrom);
        //double GetTimeAfter(int roadId);
        int GetPrice(string beginStation, string endStation);
        double DistanceTo(double lat1, double lon1, double lat2, double lon2);
        double GetTravelTime(string beginStation, string endStation);
        double GetTravelTimeForPrice(string beginStation, string endStation);
        Task<ActionResult<IEnumerable<Interval>>> SearchInterval(string search);
        Task<ActionResult<IEnumerable<Client>>> SearchClient(string search);
        Task<ActionResult<IEnumerable<Line>>> SearchLine(string search);
        Task<ActionResult<IEnumerable<Period>>> SearchPeriod(int search);
        Task<ActionResult<IEnumerable<Price>>> SearchPrice(int search);
        Task<ActionResult<IEnumerable<Station>>> SearchStation(string search);
        Task<ActionResult<IEnumerable<Timetable>>> SearchTimetable(int search);
        Task<ActionResult<IEnumerable<Transport>>> SearchTransport(string search);
        //double GetTravelTime(string beginStation, string endStation);
    }
}
