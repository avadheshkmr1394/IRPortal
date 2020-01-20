using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Insight.Portal.Services.Models
{
    public class BlobItem
    {
        public string Name { get; set; }
        public long Size { get; set; }
        public string DownloadUrl { get; set; }
        public DateTime LastModified { get; set; }
        public string DirectoryName { get; set; }
    }
}