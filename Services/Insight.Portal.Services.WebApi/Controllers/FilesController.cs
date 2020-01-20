using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Insight.Portal.Services.Models;
using Insight.Portal.Services.DataRepository;
using Vici.Common.LogHelper;
using Newtonsoft.Json.Linq;
using System.Web.Script.Serialization;

namespace Insight.Portal.Services.WebApi.Controllers
{
    public class FilesController : ApiController
    {
        [Route("Files/GetContainers"), HttpGet]
        public IHttpActionResult GetContainers()
        {
            string userId = GetUserId();
            DataSet ds = ContainerRepository.GetContainers(userRole(), userId);
            return Ok(ds.Tables[0]);
        }
        [Route("Files/GetAllContainers"),HttpGet]
        public IHttpActionResult GetAllContainers()
        {
            DataSet ds = ContainerRepository.GetContainers(userRole(), string.Empty);
            return Ok(ds);
        }
        [Route("Files/GetUserContainerPermission"),HttpPost]
        public IHttpActionResult GetUserContainerPermission(JObject objData)
        {
            DataSet ds = ContainerRepository.GetUserContainerPermission(Convert.ToString(objData["containerId"]));
            return Ok(ds.Tables[0]);
        }
        [Route("Files/EditContainer"),HttpPost]
        public IHttpActionResult EditContainer(JObject jObject)
        {
            string userId = GetUserId();
            string containerId = Convert.ToString(jObject["containerId"]);
            DataSet ds = ContainerRepository.GetContainers(userRole(), "");
            if (string.IsNullOrEmpty(containerId))
            {
                return Ok(new Container());
            }
            string containerName = ContainerRepository.GetContainerName(userRole(), containerId);
            string directories = ContainerRepository.GetContainerDirectories(userRole(), containerId);
            Container containerModel = new Container { ContainerId = Guid.Parse(containerId), Name = containerName, Directories = directories };
            return Ok(containerModel);
        }

        [Route("Files/DeleteContainer"), HttpPost]
        public IHttpActionResult DeleteContainer(JObject jObject)
        {
            if (!string.IsNullOrEmpty(Convert.ToString(jObject["containerId"] )))
            {
                ContainerRepository.DeleteContainer(Convert.ToString(jObject["containerId"]));
            }
            return Json(true);
        }

        [Route("Files/SavePermission"), HttpPost]
        public IHttpActionResult SavePermission(JObject jObject)
        {
            string userIds = Convert.ToString(jObject["userIds"]);
            

            if (!string.IsNullOrEmpty(Convert.ToString(jObject["containerId"])))
            {
                ContainerRepository.UpdateUserContainer(Convert.ToString(jObject["containerId"]), Convert.ToString(jObject["userIds"]));
            }
            return Json(true);
        }
        [Route("Files/SaveContainer"), HttpPost]
        public IHttpActionResult SaveContainer(Container containerModel)
        {
            if (string.IsNullOrEmpty(Convert.ToString(containerModel.ContainerId)) || Convert.ToString(containerModel.ContainerId) == "00000000-0000-0000-0000-000000000000")
            {
                //Create Container
                ContainerRepository.InsertContainer(containerModel);
            }
            else
            {
                //Update Container
                ContainerRepository.UpdateContainer(containerModel);
            }
            return Ok("");
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
        private bool userRole()
        {
            LogModel logModel = new LogModel { };
            DataSet user = EmployeeRepository.CheckRole(Guid.Parse(GetUserId()), logModel);
            bool isAdmin = false;
            if (user.Tables[0].Rows.Count > 0)
            {
                isAdmin = true;
            }
            else
            {
                isAdmin = false;
            }
            return isAdmin;
        }
    }
}

