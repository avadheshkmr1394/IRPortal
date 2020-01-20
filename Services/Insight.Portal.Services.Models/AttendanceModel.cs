using System;

namespace Insight.Portal.Services.Models
{
    public class AttendanceModel
    {
        public Guid AttendanceId { get; set; }
        public Guid EmployeeId { get; set; }
        public DateTime AttendanceDate { get; set; }
        public decimal? Attendance { get; set; }
        public DateTime? InTime { get; set; }
        public DateTime? OutTime { get; set; }
        public bool? IsWorkFromHome { get; set; }
        public int? TimeInMinutes { get; set; }
    }
}
