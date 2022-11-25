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
    public class LineProvider : ILineProvider
    {
        private readonly IAtrkContext _context;

        public LineProvider(IAtrkContext context)
        {
            _context = context;
        }

        public async Task Delete(int id)
        {
            Line line = _context.Lines.FirstOrDefault(x => x.LineId == id);

            _context.Lines.Remove(line);
            await _context.SaveChangesAsync();
        }

        public async Task<ActionResult<Line>> Get(int id)
        {
            Line line = await _context.Lines.FirstOrDefaultAsync(x => x.LineId == id);
            if (line == null)
            {
                return null;
            }

            return new ObjectResult(line);
        }

        public async Task<ActionResult<IEnumerable<Line>>> GetAll()
        {
            var items = await _context.Lines.ToListAsync();
            if (items == null)
            {
                return null;
            }
            return items;
        }

        public async Task<int> Post(Line line)
        {
            var added = _context.Lines.Add(line);
            line.LineId = await _context.SaveChangesAsync();

            return line.LineId;
        }

        public async Task Put(Line line)
        {
            _context.Lines.Update(line);
            await _context.SaveChangesAsync();
        }
    }
}
