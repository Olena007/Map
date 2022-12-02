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
    public class PriceProvider : IPriceProvider
    {
        private readonly IAtrkContext _context;

        public PriceProvider(IAtrkContext context)
        {
            _context = context;
        }

        public async Task Delete(int id)
        {
            Price price = _context.Prices.FirstOrDefault(x => x.PriceId == id);

            _context.Prices.Remove(price);
            await _context.SaveChangesAsync();
        }

        public async Task<ActionResult<Price>> Get(int id)
        {
            Price price = await _context.Prices.FirstOrDefaultAsync(x => x.PriceId == id);
            if (price == null)
            {
                return null;
            }

            return new ObjectResult(price);
        }

        public async Task<ActionResult<IEnumerable<Price>>> GetAll()
        {
            var items = await _context.Prices.ToListAsync();
            if (items == null)
            {
                return null;
            }
            return items;
        }

        public async Task<int> Post(Price price)
        {
            var added = _context.Prices.Add(price);
            price.PriceId = await _context.SaveChangesAsync();

            return price.PriceId;
        }

        public async Task Put(Price price)
        {
            _context.Prices.Update(price);
            await _context.SaveChangesAsync();
        }
    }
}
