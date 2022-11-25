using Application.Interfaces;
using Domen.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using WebApi.Dto;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    //[Authorize(Roles = "Admin")]
    public class IntervalController : Controller
    {
        private readonly IIntervalProvider _provider;

        public IntervalController(IIntervalProvider provider)
        {
            _provider = provider;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Interval>>> GetAll()
        {
            var getAll = await _provider.GetAll();

            return getAll;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Interval>> Get([FromRoute] int id)
        {
            var get = await _provider.Get(id);

            return get;
        }

        [HttpPost]
        public async Task<ActionResult<Interval>> Post([FromBody] IntervalDto dto)
        {
            if (dto == null)
            {
                return BadRequest();
            }
            var d = new Interval() { IntervalId = dto.IntervalId, IntervalNumber = dto.IntervalNumber };
            await _provider.Post(d);

            return Ok(d);
        }

        [HttpPut]
        public async Task<ActionResult<Interval>> Put([FromBody] IntervalDto dto)
        {
            if (dto == null)
            {
                return BadRequest();
            }
            var d = new Interval() { IntervalId = dto.IntervalId, IntervalNumber = dto.IntervalNumber };
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
