using LB4.Entities;
using LB4.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Core.EntityClient;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;
using System.Diagnostics;

namespace LB4.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [HttpGet]
        public IActionResult StoredProcedure()
        {
            return View();
        }
        [HttpGet]
        public IActionResult GetProducts()
        {
            var context = new lbnetContext();
            var items = context.Products.ToList();

            return View(items);
        }
        [HttpGet]
        public IActionResult GetCharacteristic()
        {
            var context = new lbnetContext();
            var items = context.Characteristics.ToList();

            return View(items);
        }
        [HttpPost]
        public IActionResult StoredProcedure([FromForm] StoredProcedure storedProcedure)
        {
            var context = new lbnetContext();
            List<SqlParameter> parms = new List<SqlParameter>
            { 
                new SqlParameter { ParameterName = "@p_id", Value = storedProcedure.Id },
                new SqlParameter { ParameterName = "@value", Value = storedProcedure.Name }
            };
            context.Database.ExecuteSqlRaw("product_changeLb4 @value, @p_id", parms.ToArray());

            return View(storedProcedure);
        }
        [HttpGet]
        public IActionResult Scalar()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Scalar([FromForm] ScalarFunc scalarFunc)
        {
            var context = new lbnetContext();
            List<SqlParameter> parms = new List<SqlParameter>
            {
                new SqlParameter { ParameterName = "@PRICE", Value = scalarFunc.Price }
            };
            var result = context.Set<MyFunctionResult>().FromSqlRaw($"SELECT dbo.COUNT_NAME_TO_PRICELb4({scalarFunc.Price}) as value").FirstOrDefault();
            ViewData["Count"] = result.Value;
            return View(scalarFunc);
        }
        [HttpGet]
        public IActionResult Table(List<Table> tables)
        {
            ViewBag.model = tables;
            return View();
        }

        [HttpPost]
        public IActionResult Table([FromForm] ScalarFunc table)
        {
            List<Table> tables = new List<Table>();
            using (lbnetContext db = new lbnetContext())
            {
                Microsoft.Data.SqlClient.SqlParameter param = new Microsoft.Data.SqlClient.SqlParameter("@PRICE", table.Price);
                var users = db.Products.FromSqlRaw("SELECT * FROM RETURN_NAMES (@PRICE)", param).ToList();
                foreach (var item in users)
                {
                    Table tab = new();
                    tab.Id = item.Id;
                    tab.Name = item.Name;
                    tab.Price = (decimal)item.Price;

                    tables.Add(tab);
                }
            }
            Table(tables);
            return View(table);

        }
    }
}