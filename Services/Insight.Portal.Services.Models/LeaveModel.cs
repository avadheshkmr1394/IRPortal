using System;

namespace Insight.Portal.Services.Models
{

    public class LeaveModel
    {
        public Guid LeaveId { get; set; }
        public Guid EmployeeId { get; set; }
        public DateTime LeaveDate { get; set; }
        public string LeaveType { get; set; }
        public decimal LeaveCount { get; set; }
        public string Remarks { get; set; }
        public bool? IsApproved { get; set; }
        public bool? IsSecondHalf { get; set; }
    }

    public class LeaveModelGet : LeaveModel
    {
        public new string LeaveCount { get; set; }
    }
    public class LeaveInsertModel
    {
        public Guid LeaveId { get; set; }
        public Guid employeeId { get; set; }
        public DateTime leaveFromDate { get; set; }
        public DateTime leaveToDate { get; set; }
        public string leaveType { get; set; }
        public decimal leaveCount { get; set; }
        public string remarks { get; set; }
        public bool? IsApproved { get; set; }
        public string jsondata { get; set; }
        public string leavedate { get; set; }
        public string year { get; set; }
        public bool ? IsSecondHalf { get; set; }
    }

}
