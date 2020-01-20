using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;

namespace Insight.Portal.App.Repositories
{
    public class DeploymentRepository
    {
        public static DataSet GetLatestDeploymentDetail(Guid? componentId)
        {
                DataSet ds;
                BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
                qb.SetInParam("@ComponentId", componentId, SqlDbType.UniqueIdentifier);
                ds = qb.ExecuteDataset("spGetSummaryDetail");
                return ds;
        }

        public static DataSet GetDeploymentDetail(Guid? versionId)
        {
                DataSet ds;
                BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
                qb.SetInParam("@VersionId", versionId, SqlDbType.UniqueIdentifier);
                ds = qb.ExecuteDataset("spGetBuildDetail");
                return ds;
        }

        public static DataSet GetDeploymentSites(Guid? componentId)
        {
                DataSet ds;
                BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
                qb.SetInParam("@ComponentId", componentId, SqlDbType.UniqueIdentifier);
                ds = qb.ExecuteDataset("spGetSiteName");
                return ds;
        }

        public static long InsertDeploymentDetails(Guid? versionId, Guid? deploymentSiteId, string deployedBy, DateTime? deployedOn, string remarks)
        {
            long result;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@VersionId", versionId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@DeploymentSiteId", deploymentSiteId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@DeployedBy", deployedBy, SqlDbType.NVarChar);
            qb.SetInParam("@DeployedOn", deployedOn, SqlDbType.DateTime);
            qb.SetInParam("@Remarks", remarks, SqlDbType.NVarChar);
            result = qb.ExecuteNonQuery("spInsertVersionDeployment");
            return result;
        }

        public static long DeleteDeploymentDetails(Guid? versionId, Guid? deploymentSiteId)
        {
            long result;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@VersionId", versionId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@DeploymentSiteId", deploymentSiteId, SqlDbType.UniqueIdentifier);
            result = qb.ExecuteNonQuery("spDeleteDeploymentDetail");
            return result;
        }
    }
}