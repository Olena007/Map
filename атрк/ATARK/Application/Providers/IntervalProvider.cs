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
    public class IntervalProvider : IIntervalProvider
    {
        private readonly IAtrkContext _context;

        public IntervalProvider(IAtrkContext context)
        {
            _context = context;
        }

        public async Task Delete(int id)
        {
            Interval interval = _context.Intervals.FirstOrDefault(x => x.IntervalId == id);

            _context.Intervals.Remove(interval);
            await _context.SaveChangesAsync();
        }

        public async Task<ActionResult<Interval>> Get(int id)
        {
            Interval interval = await _context.Intervals.FirstOrDefaultAsync(x => x.IntervalId == id);
            if (interval == null)
            {
                return null;
            }

            return new ObjectResult(interval);
        }

        public async Task<ActionResult<IEnumerable<Interval>>> GetAll()
        {
            var items = await _context.Intervals.ToListAsync();
            if (items == null)
            {
                return null;
            }
            return items;
        }

        public async Task<int> Post(Interval interval)
        {
            var added = _context.Intervals.Add(interval);
            interval.IntervalId = await _context.SaveChangesAsync();

            return interval.IntervalId;
        }

        public async Task Put(Interval interval)
        {
            _context.Intervals.Update(interval);
            await _context.SaveChangesAsync();
        }
    }
}
