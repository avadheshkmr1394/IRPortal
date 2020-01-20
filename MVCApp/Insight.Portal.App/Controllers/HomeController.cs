using Insight.Portal.App.Repositories;
using Microsoft.AspNet.Identity;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Insight.Portal.App.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            string employeeId = UserRepository.GetEmployeeId(User.Identity.GetUserId());
            TempData["EmployeeId"] = employeeId;
            return View();
        }

        public ActionResult Template()
        {
            return View();
        }

        public string GetUpcomingEvent()
        {
            DataSet ds = EmployeeRepository.GetUpcomingEvent();
            return JsonConvert.SerializeObject(ds, Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
        }

        public ActionResult Bootstrap()
        {
            return View();
        }

        public string GetConfigValue()
        {
            DataSet ds = UserRepository.GetConfigValue();
            return JsonConvert.SerializeObject(ds, Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
        }
    }
}
