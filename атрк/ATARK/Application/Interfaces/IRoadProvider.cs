using Domen.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IRoadProvider
    {
        Task<ActionResult<IEnumerable<Road>>> GetAll();

        Task<ActionResult<Road>> Get(int id);

        Task<int> Post(Road road);

        Task Put(Road road);

        Task Delete(int id);
    }
}
