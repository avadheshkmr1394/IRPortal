using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Insight.Portal.App.Models
{
    public class ExportModel
    {
        public string fieldDisplayName { get; set; }
        public string fieldName { get; set; }
        public bool isDefaultSelected { get; set; }
        public int sortOrder { get; set; }
    }
}