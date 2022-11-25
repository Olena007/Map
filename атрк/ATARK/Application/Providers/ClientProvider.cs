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
    public class ClientProvider : IClientProvider
    {
        private readonly IAtrkContext _context;
        public ClientProvider(IAtrkContext context)
        {
            _context = context;
        }

        public async Task<int> Create(Client client)
        {
            var added = _context.Clients.Add(client);
            client.ClientId = await _context.SaveChangesAsync();

            return client.ClientId;

        }

        public async Task<ActionResult<IEnumerable<Client>>> GetAll()
        {
            var items = await _context.Clients.ToListAsync();

            if (items == null)
            {
                return null;
            }
            return items;
        }

        public async Task<ActionResult<IEnumerable<Client>>> GetAllClients(string role)
        {
            var items = await _context.Clients.Where(x => x.ClientRole == role).ToListAsync();

            if (items == null)
            {
                return null;
            }
            return items;
        }
        public Client GetByEmail(string email)
        {

            return _context.Clients.FirstOrDefault(u => u.Email == email);
        }

        public int GetIdByEmail(string email)
        {

            var clientEmail = _context.Clients.FirstOrDefault(u => u.Email == email);
            var id = clientEmail.ClientId;
            return id;
        }

        public Client GetById(int id)
        {
            return _context.Clients.FirstOrDefault(c => c.ClientId == id);
        }

        public Client GetByRole(string role)
        {
            return _context.Clients.FirstOrDefault(u => u.ClientRole == role);
        }

        public async Task<ActionResult<IEnumerable<Client>>> SearchClient(string search)
        {
            var parametr = await _context.Clients.Where(x => x.Email == search).ToListAsync();
            if (parametr == null)
            {
                return null;
            }

            return new ObjectResult(parametr);
        }

        public async Task Delete(int id)
        {
            Client interval = _context.Clients.FirstOrDefault(x => x.ClientId == id);

            _context.Clients.Remove(interval);
            await _context.SaveChangesAsync();
        }
    }
}
