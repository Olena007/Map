using Domen.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface ILineProvider
    {
        Task<ActionResult<IEnumerable<Line>>> GetAll();

        Task<ActionResult<Line>> Get(int id);

        Task<int> Post(Line line);

        Task Put(Line line);

        Task Delete(int id);
    }
}
