using Insight.Portal.Services.DataRepository;
using Insight.Portal.Services.Models;
using System;
using System.Collections.Generic;
using System.Data;
using Vici.Common.LogHelper;

namespace Insight.Portal.Services.Business
{
    public static class Dashboard
    {
        public static DashboardData GetDashboardData(Guid userId)
        {
            LogModel logModel = new LogModel { };
            DataSet ds = EmployeeRepository.GetCalendar(logModel);
            DashboardData dashboardData = new DashboardData();
            var calendar = Models.Utils.Table.ToClassList<Models.CalendarModel>(ds.Tables[0]);
            dashboardData.CalendarList = calendar;
            dashboardData.IncomplteAttendanceList = Attendance.GetIncompleteAttendance(userId);
            DataSet das = EmployeeRepository.GetAttendanceSummary();
            var attendanceSummary = Models.Utils.Table.ToClassList<Models.EmployeeAttedanceSummary>(das.Tables[0]);
            dashboardData.EmployeeAttedanceSummary = attendanceSummary;
            DataSet user = EmployeeRepository.CheckRole(userId, logModel);

            string userRole = string.Empty;
            if (user.Tables[0].Rows.Count > 0)
            {
                userRole = user.Tables[0].Rows[0]["Name"].ToString();
            }
            dashboardData.UserRole = userRole;
            dashboardData.EmployeeId = userId;
            return dashboardData;
        }
    }
}
