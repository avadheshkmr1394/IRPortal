using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

namespace Insight.Portal.Services.Models
{
  public  class WorkLog
    {
        public string ViewId { get; set; }
        public string startMonthDate { get; set; }
        public Guid ? userId { get; set; }
    }
    public class worklogDataResponse
    {
        public DataColumnCollection column { get; set; }
        public DataTable Table { get; set; }
    }
    public class addWorkLog
    {
        public Guid ProjectId { get; set; }
        public bool isAllChecked { get; set; }
        public string workLogJson { get; set; }
    }
}
