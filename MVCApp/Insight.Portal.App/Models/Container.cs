using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Insight.Portal.App.Models
{
    public class Container
    {
        public Guid? ContainerId { get; set; }

        [Required(ErrorMessage = "Please enter Container Name")]
        [Display(Name = "Name")]
        public string Name { get; set; }
        public string Directories { get; set; }
    }
}