using Application.Interfaces;
using Domen.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Providers
{
    public class StationProvider : IStationProvider
    {
        private readonly IAtrkContext _context;

        public StationProvider(IAtrkContext context)
        {
            _context = context;
        }

        public async Task Delete(int id)
        {
            Station station = _context.Stations.FirstOrDefault(x => x.StationId == id);

            _context.Stations.Remove(station);
            await _context.SaveChangesAsync();
        }

        public async Task<ActionResult<Station>> Get(int id)
        {
            Station station = await _context.Stations.FirstOrDefaultAsync(x => x.StationId == id);
            if (station == null)
            {
                return null;
            }

            return new ObjectResult(station);
        }

        public async Task<ActionResult<IEnumerable<Station>>> GetAll()
        {
            var items = await _context.Stations.ToListAsync();
            if (items == null)
            {
                return null;
            }
            return items;
        }

        public async Task<int> Post(Station station)
        {
            var added = _context.Stations.Add(station);
            station.StationId = await _context.SaveChangesAsync();

            return station.StationId;
        }

        public async Task Put(Station station)
        {
            _context.Stations.Update(station);
            await _context.SaveChangesAsync();
        }
    }
}
