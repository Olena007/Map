using Application.Interfaces;
using Application.Providers;
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
    public class PeriodController : Controller
    {
        private readonly IPeriodProvider _provider;

        public PeriodController(IPeriodProvider provider)
        {
            _provider = provider;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Period>>> GetAll()
        {
            var getAll = await _provider.GetAll();

            return getAll;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Period>> Get([FromRoute] int id)
        {
            var get = await _provider.Get(id);

            return get;
        }

        [HttpPost]
        public async Task<ActionResult<Period>> Post([FromBody] PeriodDto dto)
        {
            if (dto == null)
            {
                return BadRequest();
            }
            var timefrom = DateTime.Parse(dto.TimeFrom);
            var timeto = DateTime.Parse(dto.TimeTo);
            //var timefrom = new DateTime(dto.TimeFrom.Hour, dto.TimeFrom.Minute, dto.TimeFrom.Second);
            //var timeto = new DateTime(dto.TimeTo.Hour, dto.TimeTo.Minute, dto.TimeTo.Second);
            var d = new Period() { PeriodId = dto.PeriodId, TimeFrom = timefrom, TimeTo = timeto };
            await _provider.Post(d);

            return Ok(d);
        }

        [HttpPut]
        public async Task<ActionResult<Period>> Put([FromBody] PeriodDto dto)
        {
            if (dto == null)
            {
                return BadRequest();
            }
            var timefrom = DateTime.Parse(dto.TimeFrom);
            var timeto = DateTime.Parse(dto.TimeTo);

            var d = new Period() { PeriodId = dto.PeriodId, TimeFrom = timefrom, TimeTo = timeto };
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
