using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Insight.Portal.App.Models
{

    public class Project
    {
        public Guid? ProjectId { get; set; }
        [Required(ErrorMessage = "Please enter Project Name")]
        [Display(Name = "Name")]
        public string Name { get; set; }
        [Display(Name = "Client")]
        public Guid? ClientId { get; set; }
        [Display(Name = "Code")]
        public string Code { get; set; }
        [UIHint("BooleanSwitch")]
        [Display(Name = "Inactive")]
        public bool Status { get; set; }
        [Display(Name = "Description")]
        [DataType(DataType.MultilineText)]
        public string Description { get; set; }

    }

    public class ProjectPermission
    {
        public Guid? ProjectId { get; set; }
        public List<Permission> Permissions { get; set; }
    }

    public class Permission
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public bool IsPermission { get; set; }
    }

    public class ProjectComponent
    {
        public Guid? ComponentId { get; set; }
        [Required(ErrorMessage = "Please enter Project Name")]
        [Display(Name = "Component")]
        public string Name { get; set; }
        [UIHint("BooleanSwitch")]
        [Display(Name = "DB Component")]
        public bool IsDBComponent { get; set; }
        [UIHint("BooleanSwitch1")]
        [Display(Name = "Version Component")]
        public bool IsVersionComponent { get; set; }
        [Display(Name = "Git Url")]
        public string GitUrl { get; set; }
        [Display(Name = "Build prefix for Config")]
        public string BuildPrefixForConfig { get; set; }
    }
}