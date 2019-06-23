using System.IO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace AgileFootPrints.API.Controllers
{
    [AllowAnonymous]
    public class FallBack : Controller
    {
        public IActionResult Index()
        {
            return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory(),
                        "wwwroot", "index.html"
                        ), "text/HTML");
        }

    }
}