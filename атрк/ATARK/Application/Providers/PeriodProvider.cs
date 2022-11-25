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
    public class PeriodProvider : IPeriodProvider
    {
        private readonly IAtrkContext _context;

        public PeriodProvider(IAtrkContext context)
        {
            _context = context;
        }

        public async Task Delete(int id)
        {
            Period period = _context.Periods.FirstOrDefault(x => x.PeriodId == id);

            _context.Periods.Remove(period);
            await _context.SaveChangesAsync();
        }

        public async Task<ActionResult<Period>> Get(int id)
        {
            Period period = await _context.Periods.FirstOrDefaultAsync(x => x.PeriodId == id);
            if (period == null)
            {
                return null;
            }

            return new ObjectResult(period);
        }

        public async Task<ActionResult<IEnumerable<Period>>> GetAll()
        {
            var items = await _context.Periods.ToListAsync();
            if (items == null)
            {
                return null;
            }
            return items;
        }

        public async Task<int> Post(Period period)
        {
            var added = _context.Periods.Add(period);
            period.PeriodId = await _context.SaveChangesAsync();

            return period.PeriodId;
        }

        public async Task Put(Period period)
        {
            _context.Periods.Update(period);
            await _context.SaveChangesAsync();
        }
    }
}
