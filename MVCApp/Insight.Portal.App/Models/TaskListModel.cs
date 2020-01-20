using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Insight.Portal.App.Models
{
    public class ViewModel
    {
        public TaskListModel Task { get; set; }
        public List<Attachment> Attachment { get; set; }
    }

    public class TaskListModel
    {
        public Guid? ProjectId { get; set; }
        public Guid TaskId { get; set; }
        public string Key { get; set; }
        public int? KeyNo { get; set; }
        [Required]
        [Display(Name = "Summary")]
        public string Summary { get; set; }
        [Display(Name = "Task Type")]
        public int TaskType { get; set; }
        public string Type { get; set; }
        [Required]
        [Display(Name = "Status")]
        public int StatusId { get; set; }
        public string StatusOrig { get; set; }
        public string Status { get; set; }
        [Display(Name = "Priority")]
        public int PriorityType { get; set; }
        public string Priority { get; set; }
        [Display(Name = "Resolution")]
        public int ResolutionType { get; set; }
        public string Resolution { get; set; }
        [Display(Name = "Assignee")]
        public string Assignee { get; set; }
        [Display(Name = "Reporter")]
        public string Reporter { get; set; }
        [Display(Name = "Component")]
        public Guid? ComponentId { get; set; }
        public string Component { get; set; }
        public DateTime? DueDate { get; set; }
        [Display(Name = "Orig Estimate")]
        public decimal? OriginalEstimate { get; set; }
        [Display(Name = "Spent")]
        public decimal? TimeSpent { get; set; }
        [Display(Name = "Remaining")]
        public decimal? RemainingEstimate { get; set; }
        [Display(Name = "Curr Estimate")]
        public decimal? CurrentEstimate { get; set; }
        public string Time { get; set; }
        [Display(Name = "Description")]
        public string Description { get; set; }
        [Display(Name = "Area")]
        public string Area { get; set; }
        public int? RANK { get; set; }
        public Guid CreatedBy { get; set; }
        public System.DateTime CreatedOn { get; set; }
        [Display(Name = "Created")]
        public string CreatedByUser { get; set; }
        public Guid? ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        [Display(Name = "Modified")]
        public string ModifiedByUser { get; set; }
        public string LoginName { get; set; }
        public string ReporterLoginName { get; set; }
        [Display(Name = "Attachments")]
        public int CountAttachment { get; set; }
        public int CommentCount { get; set; }
        public string IssueKeyAndSummary { get; set; }
        public string QAStatusName { get; set; }
        public float PctComplete { get; set; }
        public string GitUrl { get; set; }
        public string AssigneeOrig { get; set; }
    }

    public class Attachment
    {
        public Guid? AttachmentId { get; set; }
        public Guid? EntityId { get; set; }
        public string FileName { get; set; }
        public DateTime? UploadedOn { get; set; }

        public int EntityType { get; set; }
        public string ContentType { get; set; }
        public int ContentLength { get; set; }
        public byte[] FileContent { get; set; }
        public Guid? UploadedBy { get; set; }
    }

    public class GridSettingsJson
    {
        public string Page { get; set; }
        public string SelectedView { get; set; }
        public List<SorterGrouper> Groupers { get; set; }
        public List<SorterGrouper> Sorters { get; set; }
    }
    public class SorterGrouper
    {
        public string direction { get; set; }
        public string property { get; set; }
        public string root { get; set; }
    }

    public class BulkUpdateItems
    {
        public string taskIds { get; set; }
        public string operationType { get; set; }
        public string param1 { get; set; }
        public string param2 { get; set; }
    }
}
