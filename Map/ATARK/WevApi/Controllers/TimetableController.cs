using Application.Interfaces;
using Domen.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using WebApi.Dto;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
   // [Authorize(Roles = "Admin")]
    public class TimetableController : Controller
    {
        private readonly ITimetableProvider _provider;

        public TimetableController(ITimetableProvider provider)
        {
            _provider = provider;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Timetable>>> GetAll()
        {
            var getAll = await _provider.GetAll();

            return getAll;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Timetable>> Get([FromRoute] int id)
        {
            var get = await _provider.Get(id);

            return get;
        }

        [HttpPost]
        public async Task<ActionResult<Timetable>> Post([FromBody] TimetableDto dto)
        {
            if (dto == null)
            {
                return BadRequest();
            }
            var d = new Timetable() { TimetableId = dto.TimetableId, StationId = dto.StationId, Beginning = dto.Beginning, Ending = dto.Ending, TransportId = dto.TransportId };
            await _provider.Post(d);

            return Ok(d);
        }

        [HttpPut]
        public async Task<ActionResult<Timetable>> Put([FromBody] TimetableDto dto)
        {
            if (dto == null)
            {
                return BadRequest();
            }
            var d = new Timetable() { TimetableId = dto.TimetableId, StationId = dto.StationId, Beginning = dto.Beginning, Ending = dto.Ending, TransportId = dto.TransportId };
            await _provider.Put(d);

            return Ok(d);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete([FromRoute] int id)
        {
            try
            {
                var k = _provider.Delete(id);
                return Ok(k);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }

        }
    }
}
