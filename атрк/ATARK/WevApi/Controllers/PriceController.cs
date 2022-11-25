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
    public class PriceController : Controller
    {
        private readonly IPriceProvider _provider;

        public PriceController(IPriceProvider provider)
        {
            _provider = provider;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Price>>> GetAll()
        {
            var getAll = await _provider.GetAll();

            return getAll;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Price>> Get([FromRoute] int id)
        {
            var get = await _provider.Get(id);

            return get;
        }

        [HttpPost]
        public async Task<ActionResult<Price>> Post([FromBody] PriceDto dto)
        {
            if (dto == null)
            {
                return BadRequest();
            }
            var d = new Price() { PriceId = dto.PriceId, ZoneName = dto.ZoneName, Cost = dto.Cost };
            await _provider.Post(d);

            return Ok(d);
        }

        [HttpPut]
        public async Task<ActionResult<Price>> Put([FromBody] PriceDto dto)
        {
            if (dto == null)
            {
                return BadRequest();
            }
            var d = new Price() { PriceId = dto.PriceId, ZoneName = dto.ZoneName, Cost = dto.Cost };
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
