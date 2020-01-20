using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using Insight.Portal.App.Models;

namespace Insight.Portal.App.Repositories
{
    public class AttendanceRepository
    {
        public static DataSet GetAttendance(Guid employeeId, int? day, int month, int year)
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@EmployeeId", employeeId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@Day", day, SqlDbType.Int);
            qb.SetInParam("@Month", month, SqlDbType.Int);
            qb.SetInParam("@Year", year, SqlDbType.Int);
            DataSet ds = qb.ExecuteDataset("spGetAttendance");
            return ds;

        }
        public static DataTable GetTotalWorkingHours(Guid employeeId, int day, int month, int year)
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@EmployeeId", employeeId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@Day", day, SqlDbType.Int);
            qb.SetInParam("@Month", month, SqlDbType.Int);
            qb.SetInParam("@Year", year, SqlDbType.Int);
            DataSet ds = qb.ExecuteDataset("spEmployeeTotalPresentHour");
            return ds.Tables[0];
        }
        public static long DeleteAttandence(Guid attendanceId)
        {
            long result;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@AttendanceId", attendanceId, SqlDbType.UniqueIdentifier);
            result = qb.ExecuteNonQuery("spDeleteAttendance");
            return result;
        }
        public static long UpdateAttendance(Guid? attendanceId, DateTime? attendanceDate, DateTime? inTime, DateTime? outTime, decimal? attendance, bool? isWorkFromHome, int? totalMinute, string remarks)
        {
            long result;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@AttendanceId", attendanceId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@AttendanceDate", attendanceDate, SqlDbType.DateTime);
            qb.SetInParam("@InTime", inTime, SqlDbType.DateTime);
            qb.SetInParam("@OutTime", outTime, SqlDbType.DateTime);
            qb.SetInParam("@Attendance", attendance, SqlDbType.Decimal);
            qb.SetInParam("@IsWorkFromHome", isWorkFromHome, SqlDbType.Bit);
            qb.SetInParam("@TotalMinute", totalMinute, SqlDbType.Int);
            qb.SetInParam("@Remarks", remarks, SqlDbType.NVarChar);
            result = qb.ExecuteNonQuery("spUpdateAttendance");
            return result;
        }
        public static long InsertAttendance(Guid? employeeId, DateTime? attendanceDate, DateTime? inTime, DateTime? outTime, decimal? attendance, bool? isWorkFromHome, int? totalMinute, string remarks)
        {
            long result;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@EmployeeId", employeeId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@AttendanceDate", attendanceDate, SqlDbType.DateTime);
            qb.SetInParam("@InTime", inTime, SqlDbType.DateTime);
            qb.SetInParam("@OutTime", outTime, SqlDbType.DateTime);
            qb.SetInParam("@Attendance", attendance, SqlDbType.Decimal);
            qb.SetInParam("@IsWorkFromHome", isWorkFromHome, SqlDbType.Bit);
            qb.SetInParam("@TotalMinute", totalMinute, SqlDbType.Int);
            qb.SetInParam("@Remarks", remarks, SqlDbType.NVarChar);
            result = qb.ExecuteNonQuery("spInsertAttendance");
            return result;
        }
        public static long InsertOutTime(Guid? employeeId, DateTime? attendanceDate, DateTime? outTime)
        {
            long result;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@EmployeeId", employeeId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@AttendanceDate", attendanceDate, SqlDbType.DateTime);
            qb.SetInParam("@OutTime", outTime, SqlDbType.DateTime);
            result = qb.ExecuteNonQuery("spOutTimeAttendance");
            return result;
        }
        public static DataSet CheckAttendanceTime(Guid? employeeId, DateTime? date)
        {
            DataSet ds;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@EmployeeId", employeeId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@Date", date, SqlDbType.DateTime);
            ds = qb.ExecuteDataset("spCheckAttendanceTime");
            return ds;
        }

        public static DataSet GetAttendanceReport(DateTime? reportDate)
        {
            DataSet ds;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@Period", reportDate, SqlDbType.DateTime);
            ds = qb.ExecuteDataset("spGetEmployeeAttendance");
            return ds;
        }

    }
}
