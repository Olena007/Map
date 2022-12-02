using Domen.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IStationProvider
    {
        Task<ActionResult<IEnumerable<Station>>> GetAll();

        Task<ActionResult<Station>> Get(int id);

        Task<int> Post(Station st);

        Task Put(Station st);

        Task Delete(int id);
    }
}
