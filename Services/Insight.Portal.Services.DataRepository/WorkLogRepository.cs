using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using Insight.Portal.Services.Models;
using Vici.Common.SqlHelper;

namespace Insight.Portal.Services.DataRepository
{
    public class WorkLogRepository
    {
        public static DataSet GetUserWorkLogs(string userId, DateTime dateWorklog)
        {
            DataSet ds = null;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@UserId", Guid.Parse(userId), SqlDbType.UniqueIdentifier);
            qb.SetInParam("@Period", dateWorklog, SqlDbType.DateTime);
            ds = qb.ExecuteDataset("spGetMonthlyWorkLog");
            return ds;
        }
        public static DataSet GetTeamWorkLogs(DateTime dateWorklog)
        {
            DataSet ds = null;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@Period", dateWorklog, SqlDbType.DateTime);
            ds = qb.ExecuteDataset("spGetMonthlyWorkLogTeam");
            return ds;
        }
        public static DataSet GetProjectWorkLogs(DateTime dateWorklog)
        {
            DataSet ds = null;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@Period", dateWorklog, SqlDbType.DateTime);
            ds = qb.ExecuteDataset("spGetMonthlyWorkLogProject");
            return ds;
        }
        public static DataSet GetAllProjects(string userId)
        {
            DataSet ds = null;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@UserId", Guid.Parse(userId), SqlDbType.UniqueIdentifier);
            ds = qb.ExecuteDataset("spGetAssignedProject");
            return ds;
        }

        public static DataTable GetTaskStatus(int entity_Type_Task)
        {
            DataSet ds = null;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@EntityType", entity_Type_Task, SqlDbType.Int);
            ds = qb.ExecuteDataset("spGetStatus");
            return ds.Tables[0];
        }

        public static void AddWorkLog(Guid workLogId, Guid userId, Nullable<int> jiraIssueId, DateTime workDate, decimal hours, string remarks, Guid taskId, Nullable<int> remainingEstimate)
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@WorkLogId", workLogId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@UserId", userId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@JiraIssueId", jiraIssueId, SqlDbType.Int);
            qb.SetInParam("@WorkDate", workDate, SqlDbType.DateTime);
            qb.SetInParam("@Hours", hours, SqlDbType.Decimal);
            qb.SetInParam("@Remarks", remarks, SqlDbType.NVarChar);
            qb.SetInParam("@TaskId", taskId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@RemainingEstimate", remainingEstimate, SqlDbType.Int);
            qb.ExecuteNonQuery("spInsertWorkLog");
        }

        //public static void UpdateWorkLog(Guid userId, Guid taskId, DateTime workDate, decimal hours, string remarks, Nullable<int> remainingEstimate)
        //{
        //    BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
        //    qb.SetInParam("@UserId", userId, SqlDbType.UniqueIdentifier);
        //    qb.SetInParam("@TaskId", taskId, SqlDbType.UniqueIdentifier);
        //    qb.SetInParam("@WorkDate", workDate, SqlDbType.DateTime);
        //    qb.SetInParam("@Hours", hours, SqlDbType.Decimal);
        //    qb.SetInParam("@Remarks", remarks, SqlDbType.NVarChar);
        //    qb.SetInParam("@RemainingEstimate", remainingEstimate, SqlDbType.Int);
        //    qb.ExecuteNonQuery("spUpdateWorkLog");
        //}

        //public static void DeleteWorkLog(Guid userId, Guid taskId, DateTime workDate)
        //{
        //    BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
        //    qb.SetInParam("@UserId", userId, SqlDbType.UniqueIdentifier);
        //    qb.SetInParam("@TaskId", taskId, SqlDbType.UniqueIdentifier);
        //    qb.SetInParam("@WorkDate", workDate, SqlDbType.DateTime);
        //    qb.ExecuteNonQuery("spDeleteWorkLog");
        //}

        //public static DataSet GetWorkLogByTask(string taskId)
        //{
        //    DataSet ds = null;
        //    BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
        //    qb.SetInParam("@TaskId", Guid.Parse(taskId), SqlDbType.UniqueIdentifier);
        //    ds = qb.ExecuteDataset("spGetWorklogByTask");
        //    return ds;
        //}

        //public static DataSet GetTodayWorklog(string taskId, string userId)
        //{
        //    DataSet ds = null;
        //    BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
        //    qb.SetInParam("@TaskId", Guid.Parse(taskId), SqlDbType.UniqueIdentifier);
        //    qb.SetInParam("@UserId", Guid.Parse(userId), SqlDbType.UniqueIdentifier);
        //    ds = qb.ExecuteDataset("spGetTodayWorklog");
        //    return ds;
        //}

        //public static void UpdateTodayWorkLog(Guid userId, Guid taskId, decimal hours)
        //{
        //    BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
        //    qb.SetInParam("@UserId", userId, SqlDbType.UniqueIdentifier);
        //    qb.SetInParam("@TaskId", taskId, SqlDbType.UniqueIdentifier);
        //    qb.SetInParam("@Hours", hours, SqlDbType.Decimal);
        //    qb.ExecuteNonQuery("spUpdateTodayWorkLog");
        //}
    }
}
