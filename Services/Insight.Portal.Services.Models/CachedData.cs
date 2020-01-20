using System;
using System.Collections.Generic;

namespace Insight.Portal.Services.Models
{
    public class CachedData<T>
    {
        public List<T> List { get; set; }
        public DateTime TimeStamp { get; set; }
    }
}
