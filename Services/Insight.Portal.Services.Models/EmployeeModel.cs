using System;

namespace Insight.Portal.Services.Models
{
    public class EmployeeModel
    {
        public Guid EmployeeId { get; set; }
        public string FullName { get; set; }
        public string Designation { get; set; }
        public string Gender { get; set; }
        public DateTime? DateOfBirth { get; set; }
    }
}
