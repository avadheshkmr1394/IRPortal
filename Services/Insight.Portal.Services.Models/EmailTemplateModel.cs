using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Insight.Portal.Services.Models
{
    public class EmailTemplateModel
    {
        public Guid EmailTemplateId { get; set; }
        public string TemplateName { get; set; }
        public string FromEmailId { get; set; }
        public string ToEmailId { get; set; }
        public string CCEmailId { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public Guid CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public Guid ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; }
    }
}