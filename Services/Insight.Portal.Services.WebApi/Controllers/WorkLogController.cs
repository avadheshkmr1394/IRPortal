using Insight.Portal.Services.DataRepository;
using System;
using System.Data;
using System.Linq;
using System.Web.Http;
using Vici.Common.LogHelper;
using System.Collections.Generic;


using Insight.Portal.Services.Models;
using System.Web.Script.Serialization;

namespace Insight.Portal.Services.WebApi.Controllers
{
    public class WorkLogController : ApiController
    {
        [System.Web.Http.Route("WorkLog/BindWorklogs")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult BindWorklogs(WorkLog WL)
        {
            if (WL.userId == null)
            {
                WL.userId = Guid.Parse(UserRepository.GetUserId(GetUserId()));
            }
            else
            {
                WL.userId = Guid.Parse(UserRepository.GetUserId(WL.userId.ToString()));
            }
            DataSet ds = new DataSet();
            if (WL.ViewId == "0")
            {
                ds = WorkLogRepository.GetUserWorkLogs(WL.userId.ToString(), DateTime.Parse(WL.startMonthDate));
            }
            else if (WL.ViewId == "1")
            {
                ds = WorkLogRepository.GetTeamWorkLogs(DateTime.Parse(WL.startMonthDate));
            }
            else if (WL.ViewId == "2")
            {
                ds = WorkLogRepository.GetProjectWorkLogs(DateTime.Parse(WL.startMonthDate));
                
            }

            worklogDataResponse res = new worklogDataResponse();
            if (ds.Tables.Count>0)
            {
            DataTable dt = new DataTable();
               dt.TableName = "worklogdata";
               ds.Tables.Add(dt.Copy());
               ds.Tables[1].Merge(ds.Tables[0]);
               res.column = ds.Tables[0].Columns;
               res.Table = ds.Tables[1];
            }
            return Ok(res);
        }
        [System.Web.Http.Route("WorkLog/GetAllProjects")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult GetAllProjects(WorkLog wl )
        {
             string userId = UserRepository.GetUserId(Convert.ToString(wl.userId));
            DataSet ds = WorkLogRepository.GetAllProjects(userId);
            return Ok(ds.Tables[0]);
        }
        [System.Web.Http.Route("WorkLog/GetAllTasksForCombo")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult GetAllTasksForCombo(addWorkLog aw)
        {
            int entity_Type_Task = 11;
            DataTable dtStatus = WorkLogRepository.GetTaskStatus(entity_Type_Task);
            string status = string.Empty;
            if (!aw.isAllChecked)
            {
                foreach (DataRow dr in dtStatus.Rows)
                {
                    if (Convert.ToInt32(dr["Status"]) < 50)
                    {
                        status = status + Convert.ToString(dr["Status"]) + ",";
                    }
                }
            }
            DataSet ds = TaskListRepository.GetTasks(Convert.ToString(aw.ProjectId), status, null);
            return Ok(ds.Tables[0]);
        }
        [System.Web.Http.Route("WorkLog/InsertWorkLog")]
        [System.Web.Http.HttpPost]
        public void InsertWorkLog(addWorkLog wl)
        {

            JavaScriptSerializer serializer = new JavaScriptSerializer();
            dynamic workLogobj = serializer.Deserialize<object>(wl.workLogJson);
            string test = workLogobj["TaskId"];
            int timeRemaining = (string.IsNullOrEmpty(Convert.ToString(workLogobj["RemainHours"]))) ? 0 : Convert.ToInt32((Convert.ToDecimal(workLogobj["RemainHours"]) * (decimal)60.0));
            DateTime startingDate = Convert.ToDateTime(workLogobj["WorkDateFrom"]);
            DateTime endingDate = Convert.ToDateTime(workLogobj["WorkDateTo"]);
            for (DateTime date = startingDate; date <= endingDate; date = date.AddDays(1))
            {
                WorkLogRepository.AddWorkLog(
                    Guid.NewGuid(), Guid.Parse(UserRepository.GetUserId(Convert.ToString(workLogobj["UserId"]))), null, date, Convert.ToDecimal(workLogobj["WorkHours"]), System.Uri.UnescapeDataString(Convert.ToString(workLogobj["Comment"])), Guid.Parse(workLogobj["TaskId"]),
                     (string.IsNullOrEmpty(Convert.ToString(workLogobj["RemainHours"])) ? (int?)null : timeRemaining));
            }
        }
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
