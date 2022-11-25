using Domen.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IStationLines
    {
        Task<ActionResult<IEnumerable<StationLine>>> GetAll();

        Task<int> Post(StationLine st);

        Task Delete(int id);
    }
}
