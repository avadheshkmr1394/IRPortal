using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Insight.Portal.Services.Models
{
    public class LeaveViewModel
    {
        public Guid LeaveId { get; set; }
        public Guid EmployeeId { get; set; }
        public DateTime LeaveDate { get; set; }
        public string LeaveType { get; set; }
        public decimal? LeaveCount { get; set; }
        public string Remarks { get; set; }
        public bool? IsApproved { get; set; }
    }
}