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
    public class TransportProvider : ITransportProvider
    {
        private readonly IAtrkContext _context;

        public TransportProvider(IAtrkContext context)
        {
            _context = context;
        }

        public async Task Delete(int id)
        {
            Transport transport = _context.Transports.FirstOrDefault(x => x.TransportId == id);

            _context.Transports.Remove(transport);
            await _context.SaveChangesAsync();
        }

        public async Task<ActionResult<Transport>> Get(int id)
        {
            Transport transport = await _context.Transports.FirstOrDefaultAsync(x => x.TransportId == id);
            if (transport == null)
            {
                return null;
            }

            return new ObjectResult(transport);
        }

        public async Task<ActionResult<IEnumerable<Transport>>> GetAll()
        {
            var items = await _context.Transports.ToListAsync();
            if (items == null)
            {
                return null;
            }
            return items;
        }

        public async Task<int> Post(Transport transport)
        {
            var added = _context.Transports.Add(transport);
            transport.TransportId = await _context.SaveChangesAsync();

            return transport.TransportId;
        }

        public async Task Put(Transport transport)
        {
            _context.Transports.Update(transport);
            await _context.SaveChangesAsync();
        }
    }
}
