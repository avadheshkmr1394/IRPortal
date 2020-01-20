using Insight.Portal.Services.DataRepository;
using Insight.Portal.Services.WebApi.Utils.Excel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Insight.Portal.Services.WebApi.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }
    }
}
