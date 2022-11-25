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
    //[Authorize(Roles = "Admin")]
    public class LineController : Controller
    {
        private readonly ILineProvider _provider;

        public LineController(ILineProvider provider)
        {
            _provider = provider;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Line>>> GetAll()
        {
            var getAll = await _provider.GetAll();

            return getAll;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Line>> Get([FromRoute] int id)
        {
            var get = await _provider.Get(id);

            return get;
        }

        [HttpPost]
        public async Task<ActionResult<Line>> Post([FromBody] LineDto dto)
        {
            if (dto == null)
            {
                return BadRequest();
            }
            var d = new Line() { LineId = dto.LineId, LineColor = dto.LineColor, IntervalId = dto.IntervalId, PeriodId = dto.PeriodId };
            await _provider.Post(d);

            return Ok(d);
        }

        [HttpPut]
        public async Task<ActionResult<Line>> Put([FromBody] LineDto dto)
        {
            if (dto == null)
            {
                return BadRequest();
            }
            var d = new Line() { LineId = dto.LineId, LineColor = dto.LineColor, IntervalId = dto.IntervalId, PeriodId = dto.PeriodId };
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
