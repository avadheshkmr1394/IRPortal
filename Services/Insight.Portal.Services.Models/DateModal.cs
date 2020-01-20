using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Insight.Portal.Services.Models
{
   public class DateModal
    {
        public string monthStartDate { get; set; }
        public string todayDay { get; set; }
        public string attendanceDate { get; set; }
        public Guid employeeId { get; set; }
        public Guid ?  attendanceId { get; set; }
        public string attendanceJsonObj { get; set; }
    }
}
