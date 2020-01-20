using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Insight.Portal.App.Controllers
{
    public class AdminController : Controller
    {
        // GET: Admin
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Employee()
        {
            return View("Index");
        }
        public ActionResult AttendanceReport()
        {
            return View("Index");
        }
        public ActionResult EmailTemplates()
        {
            return View("Index");
        }
        public ActionResult Containers()
        {
            return View("Index");
        }
        public ActionResult LeaveReport()
        {
            return View("Index");
        }
        public ActionResult ManageHolidays()
        {
            return View("Index");
        }
        public ActionResult ManageTaxSavingTypes()
        {
            return View("Index");
        }
        public ActionResult MapEmployee()
        {
            return View("Index");
        }
    }
}