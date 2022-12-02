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
    public class TimetableProvider : ITimetableProvider
    {
        private readonly IAtrkContext _context;

        public TimetableProvider(IAtrkContext context)
        {
            _context = context;
        }

        public async Task Delete(int id)
        {
            Timetable timetable = _context.Timetables.FirstOrDefault(x => x.TimetableId == id);

            _context.Timetables.Remove(timetable);
            await _context.SaveChangesAsync();
        }

        public async Task<ActionResult<Timetable>> Get(int id)
        {
            Timetable timetable = await _context.Timetables.FirstOrDefaultAsync(x => x.TimetableId == id);
            if (timetable == null)
            {
                return null;
            }

            return new ObjectResult(timetable);
        }

        public async Task<ActionResult<IEnumerable<Timetable>>> GetAll()
        {
            var items = await _context.Timetables.ToListAsync();
            if (items == null)
            {
                return null;
            }
            return items;
        }

        public async Task<int> Post(Timetable timetable)
        {
            var added = _context.Timetables.Add(timetable);
            timetable.TimetableId = await _context.SaveChangesAsync();

            return timetable.TimetableId;
        }

        public async Task Put(Timetable timetable)
        {
            _context.Timetables.Update(timetable);
            await _context.SaveChangesAsync();
        }
    }
}
