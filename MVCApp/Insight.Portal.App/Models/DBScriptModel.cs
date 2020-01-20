using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Insight.Portal.App.Models
{
    public class DBScriptModel
    {
        public Guid DBScriptId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int? DBScriptType { get; set; }
        public int? DBChangeType { get; set; }
        public string Reference { get; set; }
        public string Script { get; set; }
        public int Sequence { get; set; }
        public Guid? ChangedBy { get; set; }
        public DateTime? ChangedOn { get; set; }
        public string DBScriptTypeName { get; set; }
        public string DBChangeTypeName { get; set; }
        public string UserName { get; set; }
        public string LoginName { get; set; }
        public Guid DBBuildId { get; set; }
    }
}