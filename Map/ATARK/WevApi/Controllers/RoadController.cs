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
    //[Authorize(Roles = "Admin")]
    public class RoadController : Controller
    {
        private readonly IRoadProvider _provider;

        public RoadController(IRoadProvider provider)
        {
            _provider = provider;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Road>>> GetAll()
        {
            var getAll = await _provider.GetAll();

            return getAll;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Road>> Get([FromRoute] int id)
        {
            var get = await _provider.Get(id);

            return get;
        }

        [HttpPost]
        public async Task<ActionResult<Road>> Post([FromBody] RoadDto dto)
        {
            if (dto == null)
            {
                return BadRequest();
            }
            var d = new Road() { RoadId = dto.RoadId, StationNameX = dto.StationNameX, StationNameY = dto.StationNameY };
            await _provider.Post(d);

            return Ok(d);
        }

        [HttpPut]
        public async Task<ActionResult<Road>> Put([FromBody] RoadDto dto)
        {
            if (dto == null)
            {
                return BadRequest();
            }
            var d = new Road() { RoadId = dto.RoadId, StationNameX = dto.StationNameX, StationNameY = dto.StationNameY };
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
