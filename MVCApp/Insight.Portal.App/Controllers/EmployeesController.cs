using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IRPortal.Controllers
{
    public class EmployeesController : Controller
    {
        // GET: Employees
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Leaves()
        {
            return View("Index");
        }
        public ActionResult Holidays()
        {
            return View("Index");
        }
        public ActionResult TaxSavings()
        {
            return View("Index");
        } 
    }
}