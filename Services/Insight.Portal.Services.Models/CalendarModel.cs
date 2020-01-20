using System;

namespace Insight.Portal.Services.Models
{
    public class CalendarModel
    {
        public string EventType { get; set; }
        public DateTime? EventDate { get; set; }
        public string Name { get; set; }
        public int IsApproved { get; set; }
        public Guid ? EmployeeId {get;set;}
        public Guid ? LeaveId { get; set; }
    }
}
