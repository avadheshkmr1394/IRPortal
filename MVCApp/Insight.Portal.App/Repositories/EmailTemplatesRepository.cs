using Insight.Portal.App.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;

namespace Insight.Portal.App.Repositories
{
    public class EmailTemplatesRepository
    {
        public static DataSet GetEmailTemplates()
        {
                DataSet ds;
                BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
                ds = qb.ExecuteDataset("GetEmailTemplates");
                return ds;
        }

        public static void UpdateEmailTemplate(EmailTemplateModel updated)
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@EmailTemplateId", updated.EmailTemplateId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@TemplateName", updated.TemplateName, SqlDbType.VarChar);
            qb.SetInParam("@FromEmailId", updated.FromEmailId, SqlDbType.VarChar);
            qb.SetInParam("@ToEmailId", updated.ToEmailId, SqlDbType.VarChar);
            qb.SetInParam("@CCEmailId", updated.CCEmailId, SqlDbType.VarChar);
            qb.SetInParam("@Subject", updated.Subject, SqlDbType.VarChar);
            qb.SetInParam("@Body", updated.Body, SqlDbType.VarChar);
            qb.SetInParam("@ModifiedBy", updated.ModifiedBy, SqlDbType.UniqueIdentifier);
            long returnValue = qb.ExecuteNonQuery("spUpdateEmailTepmlate", CommandType.StoredProcedure);
        }
    }
}