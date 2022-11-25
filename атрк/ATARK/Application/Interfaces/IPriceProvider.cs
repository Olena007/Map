using Domen.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IPriceProvider
    {
        Task<ActionResult<IEnumerable<Price>>> GetAll();

        Task<ActionResult<Price>> Get(int id);

        Task<int> Post(Price price);

        Task Put(Price price);

        Task Delete(int id);
    }
}
