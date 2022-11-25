using Domen.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IAtrkContext
    {
        DbSet<Interval> Intervals { get; set; }
        DbSet<Period> Periods { get; set; }
        DbSet<Road> Roads { get; set; }
        DbSet<Line> Lines { get; set; }
        DbSet<Station> Stations { get; set; }
        DbSet<StationLine> StationLines { get; set; }
        DbSet<Timetable> Timetables { get; set; }
        DbSet<Transport> Transports { get; set; }
        DbSet<Price> Prices { get; set; }
        DbSet<Trip> Trips { get; set; }
        DbSet<Client> Clients { get; set; }
        Task<int> SaveChangesAsync();
    }
}
