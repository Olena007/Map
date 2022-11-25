using Domen.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IIntervalProvider
    {
        Task<ActionResult<IEnumerable<Interval>>> GetAll();

        Task<ActionResult<Interval>> Get(int id);

        Task<int> Post(Interval interval);

        Task Put(Interval interval);

        Task Delete(int id);
    }
}
