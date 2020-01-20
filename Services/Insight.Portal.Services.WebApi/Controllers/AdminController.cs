
using Insight.Portal.Services.DataRepository;
using Insight.Portal.Services.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Vici.Common.LogHelper;
//using System.Web.Mvc;

namespace Insight.Portal.Services.WebApi.Controllers
{
    public class AdminController : ApiController
    {
        #region Email Templates
        [HttpGet]
        [Route("Admin/GetEmailTemplates")]
        public IHttpActionResult GetEmailTemplates()
        {
            DataSet ds = EmailTemplatesRepository.GetEmailTemplates();
            return Ok(ds);
        }

        [HttpPost]
        [Route("Admin/LoadEmailTemplateDetails")]
        public IHttpActionResult LoadEmailTemplateDetails(string templateId)
        {
            DataSet emailTemplateDs = EmailTemplatesRepository.GetEmailTemplates();
            if (emailTemplateDs.Tables.Count > 0)
            {
                DataTable emailTemplateDt = emailTemplateDs.Tables[0].Copy();
                DataTable dt = emailTemplateDt.Select("EmailTemplateId='" + Guid.Parse(templateId) + "'").CopyToDataTable();
                return Ok(dt);
            }
            return Ok(string.Empty);

        }

        [HttpPost]
        [Route("Admin/SaveEmailTemplates")]
        public IHttpActionResult SaveEmailTemplates(string data)
        {
            EmailTemplateModel emailTemplateObj = (EmailTemplateModel)Newtonsoft.Json.JsonConvert.DeserializeObject(System.Uri.UnescapeDataString(data), typeof(EmailTemplateModel));
            EmailTemplatesRepository.UpdateEmailTemplate(emailTemplateObj);
            return Ok();
        }
        #endregion Email Templates
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

        private string userRole()
        {
            LogModel logModel = new LogModel { };
            DataSet user = EmployeeRepository.CheckRole(Guid.Parse(GetUserId()), logModel);
            string isAdmin = "0";
            if (user.Tables[0].Rows.Count > 0)
            {
                isAdmin = "1";
            }
            else
            {
                isAdmin = "0";
            }
            return isAdmin;
        }
    }
}
