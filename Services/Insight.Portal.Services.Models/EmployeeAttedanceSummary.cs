using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Insight.Portal.Services.Models
{
    public class EmployeeAttedanceSummary
    {
        public string EmployeeName { get; set; }
        public string Attendance { get; set; }
        public string AttendanceDate { get; set; }
        public string InTime { get; set; }
        public string OutTime { get; set; }
        public string TotalTime { get; set; }
        public string ColorCode { get; set; }
    }
}
