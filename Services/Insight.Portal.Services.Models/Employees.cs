using System;
using System.Collections.Generic;
//using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Insight.Portal.Services.Models
{
    public class Employees
    {
        public Guid? EmployeeId { get; set; }
        //[Required(ErrorMessage = "Please enter FirstName")]
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Designation { get; set; }
        public string Gender { get; set; }
        public string FatherName { get; set; }
        public string DateOfBirth { get; set; }
        public string DateOfBirthDocumentorOriginal { get; set; }
        public string DateOfJoining { get; set; }
        public string DateOfRelieving { get; set; }
        public string PanNo { get; set; }
        public string BankDetail { get; set; }
        public string OrignalDateOfBirth { get; set; }
        public string EmployeeType { get; set; }
        public string Remarks { get; set; }
        public string LoginName { get; set; }
        public string Name { get; set; }
        public Boolean MapStatus { get; set; }

    }
}