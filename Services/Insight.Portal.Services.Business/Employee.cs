using Insight.Portal.Services.DataRepository;
using Insight.Portal.Services.Models;
using Insight.Portal.Services.Snapshots;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Vici.Common.LogHelper;

namespace Insight.Portal.Services.Business
{
    public static class Employee
    {
        public static List<EmployeeModel> GetEmployees()
        {
            return DatabaseSnapshots<Models.EmployeeModel>.Get("Employee").List;
        }

        public static List<LeaveModel> GetLeaves()
        {
            return DatabaseSnapshots<Models.LeaveModel>.Get("Leave").List;
        }


        public static object GetTodayAttendanceTime(DateTime finalDate, Guid loggedInEmployeeId)
        {
            DataSet ds = EmployeeRepository.TodayAttendanceTime(loggedInEmployeeId, finalDate);

            var result = from dataRow in ds.Tables[0].AsEnumerable()
                         select new
                         {
                             InTime = dataRow.Field<DateTime?>("InTime"),
                             OutTime = dataRow.Field<DateTime?>("OutTime"),
                             AttendanceDate = dataRow.Field<DateTime?>("AttendanceDate")
                         };
            return result;
        }

        public static long InsertInTime(Guid loggedInEmployeeId, DateTime inTime)
        {
            var result = EmployeeRepository.InsertAttendance(loggedInEmployeeId, inTime.Date, inTime, null, 1, false, null, null);
            return result;
        }

        public static long InsertOutTime(Guid loggedInEmployeeId, DateTime outTime)
        {
            var result = EmployeeRepository.InsertOutTime(loggedInEmployeeId, outTime.Date, outTime);
            return result;
        }


        public static long InsertLeave(Guid? employeeId, DateTime? leaveFromDate, DateTime? leaveToDate, string leaveType, decimal? leaveCount, string remarks,bool ? IsApproved,bool ? IsSecondHalf)
        {
            long result = EmployeeRepository.InsertLeave(employeeId, leaveFromDate, leaveToDate, leaveType, leaveCount, remarks, IsApproved, IsSecondHalf);
            return result;
        }
        public static long UpdateLeave(Guid? leaveId, DateTime? leaveDate, string leaveType, decimal? leaveCount, string remarks, bool? isApproved, bool? IsSecondHalf)
        {
            long result = EmployeeRepository.UpdateLeave(leaveId, leaveDate, leaveType, leaveCount, remarks, isApproved,IsSecondHalf);
            return result;
        }
        public static long DeleteLeave(Guid? leaveId)
        {
            long result = EmployeeRepository.DeleteLeave(leaveId);
            return result;
        }
        public static DataSet GetEmployeeLeaves(string employeeId, string leaveYear)
        {
            DataSet ds = EmployeeRepository.GetEmployeeLeaves(Guid.Parse(employeeId), null, false, int.Parse(leaveYear));
            return ds;
        }
        public static DataSet GetEmployees(Guid ? employeeId)
        {
            DataSet ds = EmployeeRepository.GetEmployees(employeeId);
            return ds;
        }
        public static DataTable EmployeeLeaveCount(Guid? employeeId)
        {
            DataTable ds = EmployeeRepository.EmployeeLeaveCount(employeeId); ;
            return ds;
        }
        public static DataSet GetUserRole(Guid? employeeId)
        {
            LogModel logModel = new LogModel { };
            DataSet ds = EmployeeRepository.CheckRole(employeeId, logModel);
           return ds;
        }
        public static long CreateEmployee(Employees employeeDetails)
        {
            return EmployeeRepository.CreateEmployee(employeeDetails);
        }
        public static long UpdateEmployee(Employees employeeDetails)
        {
            return EmployeeRepository.UpdateEmployee(employeeDetails);
        }

    }
}
