using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Insight.Portal.App.Repositories;
using Newtonsoft.Json;
using System.Web.Script.Serialization;
using System.Net.NetworkInformation;
using System.Net;
using System.Configuration;
using Microsoft.AspNet.Identity;
using Insight.Portal.App.Models;

namespace Insight.Portal.App.Controllers
{
    public class AttendanceController : Controller
    {
        // GET: Attendance
        public ActionResult Index()
        {
            return View();
        }
    }
}
