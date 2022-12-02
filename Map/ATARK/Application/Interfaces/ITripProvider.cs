using Domen.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface ITripProvider
    {
        Task<ActionResult<IEnumerable<Trip>>> GetAll();

        Task<ActionResult<Trip>> Get(int id);

        Task<int> Post(Trip Trip);

        Task Put(Trip trip);

        Task Delete(int id);
    }
}
