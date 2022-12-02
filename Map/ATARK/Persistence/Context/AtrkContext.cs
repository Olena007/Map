using Application.Interfaces;
using Domen.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Context
{
    public class AtrkContext : DbContext, IAtrkContext
    {
        public AtrkContext(DbContextOptions<AtrkContext> options)
        : base(options)
        {
        }
        public DbSet<Interval> Intervals { get; set; }
        public DbSet<Period> Periods { get; set; }
        public DbSet<Road> Roads { get; set; }
        public DbSet<Line> Lines { get; set; }
        public DbSet<Station> Stations { get; set; }
        public DbSet<StationLine> StationLines { get; set; }
        public DbSet<Timetable> Timetables { get; set; }
        public DbSet<Transport> Transports { get; set; }
        public DbSet<Price> Prices { get; set; }
        public DbSet<Trip> Trips { get; set; }
        public DbSet<Client> Clients { get; set; }

        public async Task<int> SaveChangesAsync()
        {
            return await base.SaveChangesAsync();
        }
    }
}
