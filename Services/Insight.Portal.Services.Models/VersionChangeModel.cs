using System;
using System.Collections.Generic;
//using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Linq;
using System.Web;
//using System.Web.Mvc;

namespace Insight.Portal.Services.Models
{
    public class VersionChangeModel
    {
        public Guid VersionChangeId { get; set; }
        public Guid VersionId { get; set; }
        public string Reference { get; set; }
        public string FileChanges { get; set; }
        public string DBChanges { get; set; }
        public string Description { get; set; }
        public string ChangedBy { get; set; }
        public DateTime? ChangedOn { get; set; }
        public int QAStatus { get; set; } = 0;
        public string IssueName { get; set; }
        public string Version { get; set; }
        public string DBBuilds { get; set; }
        public int TaskType { get; set; }
        public string Type { get; set; }
        public int PriorityType { get; set; }
        public string Priority { get; set; }
        public string Summary { get; set; }
        public List<VersionCommitDetails> VersionCommitDetails = new List<Models.VersionCommitDetails>();
    }

    public class VersionCommitDetails
    {

        public Guid VersionChangeCommitId { get; set; }
        public Guid? VersionChangeId { get; set; }
        //[Display(Name = "Git Commit Id")]
        public string GitCommitId { get; set; }
        //[Display(Name = "Committed By")]
        public Guid CommittedBy { get; set; }
        //[Display(Name = "Committed On")]
        public DateTime CommittedOn { get; set; }
        //[Display(Name = "Committed Files")]
        public string CommittedFiles { get; set; }
        //[Display(Name = "Commit Description")]
        //[AllowHtml]
        public string CommittedDescription { get; set; }
        public string LoginName { get; set; }
        public string UserName { get; set; }

    }
}