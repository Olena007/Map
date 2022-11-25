using Domen.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface ITimetableProvider
    {
        Task<ActionResult<IEnumerable<Timetable>>> GetAll();

        Task<ActionResult<Timetable>> Get(int id);

        Task<int> Post(Timetable timetable);

        Task Put(Timetable timetable);

        Task Delete(int id);
    }
}
