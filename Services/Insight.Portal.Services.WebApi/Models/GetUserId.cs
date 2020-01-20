using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Insight.Portal.Services.WebApi.Models
{
    public class GetUserId
    {
      public  string UserId()
        {
            string _userId = "";
            if (Request.Headers.Contains("userId"))
            {
                _userId = Convert.ToString(Request.Headers.GetValues("userId").First());
            }

            return _userId;
        }
    }
}