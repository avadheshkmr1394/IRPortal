using Insight.Portal.Services.Models;
using Insight.Portal.Services.Snapshots;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Insight.Portal.Services.Business
{
    public class Attendance
    {
        public static List<IncompleteAttendanceModel> GetIncompleteAttendance(Guid loggedInEmployeeId)
        {
            DatabaseSnapshots<Models.EmployeeModel>.Refresh(",Holiday,Leave,Attendance,");

            DateTime dtTo = DateTime.Now.AddDays(-1);
            DateTime dtFrom = dtTo.AddDays(-90);

            return GetIncompleteAttendance(loggedInEmployeeId, dtFrom, dtTo);
        }

        private static List<IncompleteAttendanceModel> GetIncompleteAttendance(Guid loggedInEmployeeId, DateTime dateFrom, DateTime dateTo)
        {
            var holidays = GetHolidays(dateFrom, dateTo);
            var leaves = GetLeaves(loggedInEmployeeId, dateFrom, dateTo);
            var markedAttendance = GetMarkedAttendanceList(loggedInEmployeeId, dateFrom, dateTo);

            List<IncompleteAttendanceModel> listDateTime = new List<IncompleteAttendanceModel>();

            while (dateFrom < dateTo)
            {
                dateFrom = dateFrom.AddDays(1);
                DayOfWeek weekDay = dateFrom.DayOfWeek;
                if (weekDay != DayOfWeek.Saturday & weekDay != DayOfWeek.Sunday && holidays.IndexOf(dateFrom.Date) < 0 && leaves.IndexOf(dateFrom.Date) < 0)
                {
                    var incompleteAttendance = new IncompleteAttendanceModel();
                    var marked = markedAttendance?.FirstOrDefault(x => dateFrom.Date == x.DateTime);
                    if (marked == null)
                    {
                        incompleteAttendance.DateTime = dateFrom.Date;
                        listDateTime.Add(incompleteAttendance);
                    }
                    else if (marked != null && (marked.IsWorkFromHome ?? false) != true && (marked.InTime == null || marked.OutTime == null))
                    {
                        incompleteAttendance.DateTime = dateFrom.Date;
                        incompleteAttendance.InTime = marked.InTime;
                        incompleteAttendance.OutTime = marked.OutTime;
                        listDateTime.Add(incompleteAttendance);
                    }
                }
            }
            return listDateTime;
        }

        private static List<DateTime> GetHolidays(DateTime dateFrom, DateTime dateTo)
        {
            var holidayList = DatabaseSnapshots<HolidayModel>.Get("Holiday").List;

            var holidays = holidayList?.Where(y => y.HolidayDate <= dateTo && y.HolidayDate >= dateFrom)?.Select(x => x.HolidayDate.Date).ToList();

            return holidays;
        }

        private static List<DateTime> GetLeaves(Guid loggedInEmployeeId, DateTime dateFrom, DateTime dateTo)
        {
            var leaveList = DatabaseSnapshots<LeaveModel>.Get("Leave").List;
            var leaves = leaveList?.Where(y => y.EmployeeId == loggedInEmployeeId && y.LeaveDate <= dateTo && y.LeaveDate >= dateFrom)?.Select(x => x.LeaveDate.Date).ToList();
            return leaves;
        }


        private static List<IncompleteAttendanceModel> GetMarkedAttendanceList(Guid loggedInEmployeeId, DateTime dateFrom, DateTime dateTo)
        {
            return DatabaseSnapshots<AttendanceModel>.Get("Attendance").List?.Where(x => x.EmployeeId == loggedInEmployeeId && ((x.IsWorkFromHome ?? false) == true || x.InTime != null || x.OutTime != null) && x.AttendanceDate <= dateTo && x.AttendanceDate >= dateFrom)?.Select(x => new IncompleteAttendanceModel { DateTime = x.AttendanceDate, InTime = x.InTime, OutTime = x.OutTime, IsWorkFromHome = x.IsWorkFromHome }).ToList();
        }
    }
}
