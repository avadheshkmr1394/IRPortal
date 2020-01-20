using System;

namespace Insight.Portal.Services.Models
{
    public class IncompleteAttendanceModel
    {
        public DateTime DateTime { get; set; }
        public DateTime? InTime { get; set; }
        public DateTime? OutTime { get; set; }
        public bool? IsWorkFromHome { get; set; }
    }
}
