using Application.Interfaces;
using Application.Providers;
using Domen.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Crypto.Generators;
using System.Security.Claims;
using WebApi.Dto;

namespace WebApi.Controllers
{
    [Route("api")]
    [ApiController]
    public class AccountController : Controller
    {
        private readonly IClientProvider _clientProvider;
        private readonly TokenProvider _tokenProvider;

        public AccountController(IClientProvider client, TokenProvider tokenProvider)
        {
            _clientProvider = client;
            _tokenProvider = tokenProvider;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Client>>> GetAll()
        {
            var getAll = await _clientProvider.GetAll();

            return getAll;
        }


        [HttpPost("register/user")]
        public ActionResult<Client> Register([FromBody] RegisterDto dto)
        {
            var d = new Client() { ClientRole = "User", Email = dto.Email, Password = BCrypt.Net.BCrypt.HashPassword(dto.Password) };
            _clientProvider.Create(d);

            return Ok(d);
        }

        [HttpPost("register/admin")]
        public ActionResult<Client> RegisterAdmin([FromBody] RegisterDto dto)
        {
            var d = new Client() { ClientRole = "Admin", Email = dto.Email, Password = BCrypt.Net.BCrypt.HashPassword(dto.Password) };
            _clientProvider.Create(d);

            return Ok(d);
        }
        [HttpPost("register/manager")]
        public ActionResult<Client> RegisterManager([FromBody] RegisterDto dto)
        {
            var d = new Client() { ClientRole = "Manager", Email = dto.Email, Password = BCrypt.Net.BCrypt.HashPassword(dto.Password) };
            _clientProvider.Create(d);

            return Ok(d);
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {
            var client = _clientProvider.GetByEmail(dto.Email);
            string jwt;

            if (client == null)
            {
                return BadRequest(new { message = "Invalid Operation" });
            }

            if (!BCrypt.Net.BCrypt.Verify(dto.Password, client.Password))
            {
                return BadRequest(new { message = "Wrong password" });
            }

            if (client.ClientRole == "User")
            {
                jwt = _tokenProvider.GenerateUserToken(client.Email);
            }
            else
            {
                jwt = _tokenProvider.GenerateAdminToken(client.Email);
            }
            
            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                HttpOnly = true
            });

            return Ok(jwt);
        }

        [HttpGet("client")]
        public IActionResult Client()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = _tokenProvider.Verify(jwt);

                var email = token.Claims.First(claim => claim.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name").Value;
                var clientId = _clientProvider.GetIdByEmail(email);

                //var clientEmail = token;

               // var clientId = int.Parse(token.Issuer);

                var client = _clientProvider.GetById(clientId);

                return Ok(client);
            }
            catch (Exception ex)
            {
                return Unauthorized();
            }
        }
        [HttpGet("role")]
        public IActionResult GetRole()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = _tokenProvider.Verify(jwt);

                var email = token.Claims.First(claim => claim.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name").Value;
                var clientId = _clientProvider.GetIdByEmail(email);

                var client = _clientProvider.GetById(clientId);

                var role = client.ClientRole;
                return Ok(role);
            }
            catch (Exception ex)
            {
                return Unauthorized();
            }
        }


        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");

            return Ok(new
            {
                message = "logouted"
            });
        }

        [HttpPost("role")]
        public async Task<ActionResult<IEnumerable<Client>>> GetAllAdmins(RoleDto dto)
        {
            var getAll = await _clientProvider.GetAllClients(dto.Role);

            return getAll;
        }

        [HttpPost("email")]
        public async Task<ActionResult<IEnumerable<Client>>> SearchTimetable([FromBody] RoleDto search)
        {
            var info = await _clientProvider.SearchClient(search.Role);

            return info;
        }
        [HttpDelete("{id}")]
        public ActionResult Delete([FromRoute] int id)
        {
            try
            {
                var k = _clientProvider.Delete(id);
                return Ok(k);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }

        }
    }
}
