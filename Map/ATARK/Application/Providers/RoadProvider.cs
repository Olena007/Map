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
    public class RoadProvider : IRoadProvider
    {
        private readonly IAtrkContext _context;

        public RoadProvider(IAtrkContext context)
        {
            _context = context;
        }

        public async Task Delete(int id)
        {
            Road road = _context.Roads.FirstOrDefault(x => x.RoadId == id);

            _context.Roads.Remove(road);
            await _context.SaveChangesAsync();
        }

        public async Task<ActionResult<Road>> Get(int id)
        {
            Road road = await _context.Roads.FirstOrDefaultAsync(x => x.RoadId == id);
            if (road == null)
            {
                return null;
            }

            return new ObjectResult(road);
        }

        public async Task<ActionResult<IEnumerable<Road>>> GetAll()
        {
            var items = await _context.Roads.ToListAsync();
            if (items == null)
            {
                return null;
            }
            return items;
        }

        public async Task<int> Post(Road road)
        {
            var added = _context.Roads.Add(road);
            road.RoadId = await _context.SaveChangesAsync();

            return road.RoadId;
        }

        public async Task Put(Road road)
        {
            _context.Roads.Update(road);
            await _context.SaveChangesAsync();
        }
    }
}
