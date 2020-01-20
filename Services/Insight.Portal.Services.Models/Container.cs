using System;
using System.Collections.Generic;
//using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Insight.Portal.Services.Models
{
    public class Container
    {
        public Guid? ContainerId { get; set; }
        public string Name { get; set; }
        public string Directories { get; set; }
    }
}