using Domen.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IStationLineProvider
    {
        Task Delete(int id);
        Task<ActionResult<IEnumerable<StationLine>>> GetAll();
        Task<int> Post(StationLine line);
    }
}
