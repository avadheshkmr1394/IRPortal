using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Insight.Portal.App.Models
{
    public class ReleaseNotesModel
    {
        public Nullable<System.Guid> ReleaseNoteId { get; set; }
        public Nullable<System.Guid> VersionId { get; set; }
        public string Version { get; set; }
        public string Reference { get; set; }
        public string Title { get; set; }
        public string Remarks { get; set; }
        public Nullable<bool> IsPublic { get; set; }
        public Nullable<int> Type { get; set; }
        public Nullable<int> Sequence { get; set; }
        public string IssueName { get; set; }
        public Nullable<bool> UpdateTaskFields { get; set; }
    }
}