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
    //[Authorize(Roles = "Admin, User")]
    public class InitialController : Controller
    {
        private readonly IInitialProvider _provider;
        private readonly IAtrkContext _context;


        public InitialController(IInitialProvider provider, IAtrkContext context)
        {
            _provider = provider;
            _context = context;
        }

        [HttpPost("waiting")]
        public ActionResult<IInitialProvider> WaitingTime([FromBody] WaitingDto dto)
        {
            var get =  _provider.GetTimeBefore(dto.Station);
            //var t = new TimeDto { Time = get };
            return Ok(get);
        }
        [HttpPost("travel")]
        public ActionResult<IInitialProvider> TravelTime([FromBody] TravelDto dto)
        {
            var get = _provider.GetTravelTime(dto.firstStation, dto.secondStation);
            return Ok(get);
        }
        [HttpPost("price")]
        public ActionResult<IInitialProvider> TravelPrice([FromBody] TravelDto dto)
        {
            var get = _provider.GetPrice(dto.firstStation, dto.secondStation);
            var price = _context.Prices.FirstOrDefault(p => p.PriceId == get);

            return Ok(price.Cost);
        }
        [HttpPost("interval")]
        public async Task<ActionResult<IEnumerable<Interval>>> SearchInterval([FromBody] SearchStringDto search)
        {
            var info = await _provider.SearchInterval(search.Element);

            return info;
        }
        [HttpPost("line")]
        public async Task<ActionResult<IEnumerable<Line>>> SearchLine([FromBody] SearchStringDto search)
        {
            var info = await _provider.SearchLine(search.Element);

            return info;
        }
        [HttpPost("period")]
        public async Task<ActionResult<IEnumerable<Period>>> SearchPeriod([FromBody] SearchIntDto search)
        {
            var info = await _provider.SearchPeriod(search.Element);

            return info;
        }
        [HttpPost("searchPrice")]
        public async Task<ActionResult<IEnumerable<Price>>> SearchPrice([FromBody] SearchIntDto search)
        {
            var info = await _provider.SearchPrice(search.Element);

            return info;
        }
        [HttpPost("station")]
        public async Task<ActionResult<IEnumerable<Station>>> SearchStation([FromBody] SearchStringDto search)
        {
            var info = await _provider.SearchStation(search.Element);

            return info;
        }
        [HttpPost("timetable")]
        public async Task<ActionResult<IEnumerable<Timetable>>> SearchTimetable([FromBody] SearchIntDto search)
        {
            var info = await _provider.SearchTimetable(search.Element);

            return info;
        }
        [HttpPost("transport")]
        public async Task<ActionResult<IEnumerable<Transport>>> SearchTransport([FromBody] SearchStringDto search)
        {
            var info = await _provider.SearchTransport(search.Element);

            return info;
        }
    }
}
