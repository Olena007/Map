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
    public class StationLineProvider : IStationLines
    {
        private readonly IAtrkContext _context;

        public StationLineProvider(IAtrkContext context)
        {
            _context = context;
        }

        public async Task Delete(int id)
        {
            StationLine line = _context.StationLines.FirstOrDefault(x => x.LineId == id);

            _context.StationLines.Remove(line);
            await _context.SaveChangesAsync();
        }
        public async Task<ActionResult<IEnumerable<StationLine>>> GetAll()
        {
            var items = await _context.StationLines.ToListAsync();
            if (items == null)
            {
                return null;
            }
            return items;
        }

        public async Task<int> Post(StationLine line)
        {
            var added = _context.StationLines.Add(line);
            line.StationLineId = await _context.SaveChangesAsync();

            return line.LineId;
        }
    }
}
