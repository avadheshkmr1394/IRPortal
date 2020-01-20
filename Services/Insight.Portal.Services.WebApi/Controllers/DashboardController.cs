using Insight.Portal.Services.Models;
using System;
using System.Linq;
using System.Web.Http;

namespace Insight.Portal.Services.WebApi.Controllers
{
    public class DashboardController : ApiController
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [System.Web.Http.Route("Dashboard/GetDashboardData")]
        [System.Web.Http.HttpGet]
        public DashboardData GetDashboardData()
        {
            string _userId = GetUserId();
            Guid userId;
            if (!Guid.TryParse(_userId, out userId))
            {
                return null;
            }

            return Services.Business.Dashboard.GetDashboardData(userId); ;
        }



        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [System.Web.Mvc.NonAction]
        private string GetUserId()
        {
            string _userId = "";
            if (Request.Headers.Contains("userId"))
            {
                _userId = Convert.ToString(Request.Headers.GetValues("userId").First());
            }

            return _userId;
        }
    }
}