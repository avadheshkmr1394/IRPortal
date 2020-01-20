using System.Collections.Generic;
using System;

namespace Insight.Portal.Services.Models
{
    public class DashboardData
    {
        public List<CalendarModel> CalendarList { get; set; } = new List<CalendarModel>();
        public List<IncompleteAttendanceModel> IncomplteAttendanceList { get; set; } = new List<IncompleteAttendanceModel>();
        public List<EmployeeAttedanceSummary> EmployeeAttedanceSummary { get; set; }
        public string UserRole { get; set; }
        public Guid EmployeeId { get; set; } 
    }
}
