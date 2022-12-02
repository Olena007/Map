using Domen.Models;
using Microsoft.AspNetCore.Mvc;

namespace Application.Interfaces
{
    public interface IClientProvider
    {
        Task<ActionResult<IEnumerable<Client>>> GetAll();
        Task<int> Create(Client client);
        Client GetByEmail(string email);
        int GetIdByEmail(string email);
        Client GetById(int id);

        Client GetByRole(string role);
        Task<ActionResult<IEnumerable<Client>>> GetAllClients(string role);
        Task<ActionResult<IEnumerable<Client>>> SearchClient(string search);
        Task Delete(int id);
    }
}
