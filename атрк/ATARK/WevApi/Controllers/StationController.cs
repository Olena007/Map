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
    public class StationController : Controller
    {
        private readonly IStationProvider _provider;

        public StationController(IStationProvider provider)
        {
            _provider = provider;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Station>>> GetAll()
        {
            var getAll = await _provider.GetAll();

            return getAll;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Station>> Get([FromRoute] int id)
        {
            var get = await _provider.Get(id);

            return get;
        }

        [HttpPost]
        public async Task<ActionResult<Station>> Post([FromBody] StationDto dto)
        {
            if (dto == null)
            {
                return BadRequest();
            }
            var d = new Station() { StationId = dto.StationId, StationName = dto.StationName, Latitude = dto.Latitude, Longitude= dto.Longitude };
            await _provider.Post(d);

            return Ok(d);
        }

        [HttpPut]
        public async Task<ActionResult<Station>> Put([FromBody] StationDto dto)
        {
            if (dto == null)
            {
                return BadRequest();
            }
            var d = new Station() { StationId = dto.StationId, StationName = dto.StationName, Latitude = dto.Latitude, Longitude = dto.Longitude };
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
