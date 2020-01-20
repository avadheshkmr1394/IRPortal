using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using Insight.Portal.App.Models;

namespace Insight.Portal.App.Repositories
{
    public class LeaveRepository
    {
        public static DataSet GetLeaves(Guid? employeeId, DateTime? leaveDate, bool? isAdmin, int? year)
        {
            DataSet ds;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@EmployeeId", employeeId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@LeaveDate", leaveDate, SqlDbType.DateTime);
            qb.SetInParam("@IsAdmin", isAdmin, SqlDbType.Bit);
            qb.SetInParam("@Year", year, SqlDbType.Int);
            ds = qb.ExecuteDataset("spGetLeave");
            return ds;
        }
        public static long UpdateLeave(Guid? leaveId, DateTime? leaveDate, string leaveType, decimal? leaveCount, string remarks, bool? isApproved)
        {
            long result;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@LeaveId", leaveId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@LeaveDate", leaveDate, SqlDbType.DateTime);
            qb.SetInParam("@LeaveType", leaveType, SqlDbType.NVarChar);
            qb.SetInParam("@LeaveCount", leaveCount, SqlDbType.Decimal);
            qb.SetInParam("@Remarks", remarks, SqlDbType.NVarChar);
            qb.SetInParam("@IsApproved", isApproved, SqlDbType.Bit);
            result = qb.ExecuteNonQuery("spUpdateLeave");
            return result;
        }
        public static long DeleteLeave(Guid? leaveId)
        {
            long result;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@LeaveId", leaveId, SqlDbType.UniqueIdentifier);
            result = qb.ExecuteNonQuery("spDeleteLeave");
            return result;
        }
        public static long InsertLeave(Guid? employeeId, DateTime? leaveFromDate, DateTime? leaveToDate, string leaveType, decimal? leaveCount, string remarks)
        {
            long result;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@EmployeeId", employeeId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@LeaveFromDate", leaveFromDate, SqlDbType.DateTime);
            qb.SetInParam("@LeaveToDate", leaveToDate, SqlDbType.DateTime);
            qb.SetInParam("@LeaveType", leaveType, SqlDbType.NVarChar);
            qb.SetInParam("@LeaveCount", leaveCount, SqlDbType.Decimal);
            qb.SetInParam("@Remarks", remarks, SqlDbType.NVarChar);
            result = qb.ExecuteNonQuery("spInsertLeave");
            return result;
        }
        public static DataTable GetEmployeeTotalLeave(Guid? employeeId, DateTime? leaveDate, int? year)
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@EmployeeId", employeeId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@LeaveDate", leaveDate, SqlDbType.DateTime);
            qb.SetInParam("@Year", year, SqlDbType.Int);
            DataSet ds = qb.ExecuteDataset("spGetEmployeeTotalLeave");
            return ds.Tables[0];
        }
        public static DataTable EmployeeLeaveRecord(string isAdmin, Guid? employeeId)
        {
            DataSet ds;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            if (isAdmin == "1")
            {
                ds = qb.ExecuteDataset("spGetEmployeeLeaveCount");
            }
            else
            {
                qb.SetInParam("@EmployeeId", employeeId, SqlDbType.UniqueIdentifier);
                ds = qb.ExecuteDataset("spGetEmployeeLeaveCount");
            }
            return ds.Tables[0];
        }
        public static DataTable EmployeeLeaveCount(Guid? employeeId)
        {
            DataSet ds;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@EmployeeId", employeeId, SqlDbType.UniqueIdentifier);
            ds = qb.ExecuteDataset("spGetEmployeeLeaveCount");
            return ds.Tables[0];
        }
        public static DataTable UpcomingLeaves()
        {
                BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
                DataSet ds = qb.ExecuteDataset("spGetUpcomingLeaves");
                return ds.Tables[0];
        }
        public static DataSet LeaveReport(string employeeStatus)
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@EmployeeStatus", employeeStatus, SqlDbType.NVarChar);
            DataSet ds = qb.ExecuteDataset("spGetEmployeeLeaveRecord");
            return ds;
        }
    }
}