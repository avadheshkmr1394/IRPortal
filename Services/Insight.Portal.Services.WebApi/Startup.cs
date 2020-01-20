using System;
using System.IO;
using System.Threading.Tasks;
using Insight.Portal.Services.Snapshots;
using Microsoft.Owin;
using Newtonsoft.Json;
using Owin;

[assembly: OwinStartup(typeof(Insight.Portal.Services.WebApi.Startup))]

namespace Insight.Portal.Services.WebApi
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            JsonConvert.DefaultSettings = () => new JsonSerializerSettings
            {
                DateTimeZoneHandling = DateTimeZoneHandling.Utc,
            };
            DatabaseSnapshots<Models.EmployeeModel>.Refresh();
        }

    }
}

