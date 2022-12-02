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
    public class TripProvider : ITripProvider
    {
        private readonly IAtrkContext _context;

        public TripProvider(IAtrkContext context)
        {
            _context = context;
        }

        public async Task Delete(int id)
        {
            Trip trip = _context.Trips.FirstOrDefault(x => x.TripId == id);

            _context.Trips.Remove(trip);
            await _context.SaveChangesAsync();
        }

        public async Task<ActionResult<Trip>> Get(int id)
        {
            Trip trip = await _context.Trips.FirstOrDefaultAsync(x => x.TripId == id);
            if (trip == null)
            {
                return null;
            }

            return new ObjectResult(trip);
        }

        public async Task<ActionResult<IEnumerable<Trip>>> GetAll()
        {
            var items = await _context.Trips.ToListAsync();
            if (items == null)
            {
                return null;
            }
            return items;
        }

        public async Task<int> Post(Trip trip)
        {
            var added = _context.Trips.Add(trip);
            trip.TripId = await _context.SaveChangesAsync();

            return trip.TripId;
        }

        public async Task Put(Trip trip)
        {
            _context.Trips.Update(trip);
            await _context.SaveChangesAsync();
        }
    }
}
