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
    //[Authorize(Roles = "Admin, User")]
    public class TripController : Controller
    {
        private readonly ITripProvider _provider;
        private readonly IInitialProvider _initialProvider;
        private readonly IClientProvider _clientProvider;
        private readonly IAtrkContext _context;
        private readonly TokenProvider _tokenProvider;

        public TripController(ITripProvider provider, IInitialProvider initialProvider, IClientProvider clientProvider, TokenProvider tokenProvider, IAtrkContext context)
        {
            _provider = provider;
            _initialProvider = initialProvider;
            _clientProvider = clientProvider;
            _tokenProvider = tokenProvider;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Trip>>> GetAll()
        {
            var getAll = await _provider.GetAll();

            return getAll;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Trip>> Get([FromRoute] int id)
        {
            var get = await _provider.Get(id);

            return get;
        }

        [HttpPost]
        public async Task<ActionResult<Trip>> Post([FromBody] TripDto dto)
        {
            if (dto == null)
            {
                return BadRequest();
            }
            var jwt = Request.Cookies["jwt"];

            var token = _tokenProvider.Verify(jwt);

            var email = token.Claims.First(claim => claim.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name").Value;
            var clientId = _clientProvider.GetIdByEmail(email);
            var client = _clientProvider.GetById(clientId);

            var d = new Trip() { TripId = dto.TripId, RoadId = dto.RoadId, TransportId = dto.TransportId, PriceId = 1, ClientId = clientId };
            await _provider.Post(d);

            var road = _context.Roads.FirstOrDefault(r => r.RoadId == dto.RoadId);

            var p = new Trip() { TripId = dto.TripId, RoadId = dto.RoadId, TransportId = dto.TransportId, PriceId = _initialProvider.GetPrice(road.StationNameX, road.StationNameY), ClientId = clientId };
            
            await _provider.Put(p);

            return Ok(p);
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
