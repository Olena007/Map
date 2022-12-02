using Domen.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IPeriodProvider
    {
        Task<ActionResult<IEnumerable<Period>>> GetAll();

        Task<ActionResult<Period>> Get(int id);

        Task<int> Post(Period period);

        Task Put(Period period);

        Task Delete(int id);
    }
}
