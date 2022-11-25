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
    public class StationLineController : Controller
    {
        private readonly IStationLineProvider _provider;

        public StationLineController(IStationLineProvider provider)
        {
            _provider = provider;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StationLine>>> GetAll()
        {
            var getAll = await _provider.GetAll();

            return getAll;
        }
        [HttpPost]
        public async Task<ActionResult<StationLine>> Post([FromBody] StationLineDto dto)
        {
            if (dto == null)
            {
                return BadRequest();
            }
            var d = new StationLine() { StationLineId = dto.StationLineId, StationId = dto.StationId, LineId = dto.LineId };
            await _provider.Post(d);

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
