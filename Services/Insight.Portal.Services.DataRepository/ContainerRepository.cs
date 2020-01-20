using System;
using System.Configuration;
using System.Data;
using Insight.Portal.Services.Models;
using Vici.Common.SqlHelper;

namespace Insight.Portal.Services.DataRepository
{
    public class ContainerRepository
    {
        public static DataSet GetContainers(bool isAdminRole, string userId)
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@IsAdminRole", isAdminRole, SqlDbType.Bit);
            if (!string.IsNullOrWhiteSpace(userId))
            {
                qb.SetInParam("@UserId", Guid.Parse(userId), SqlDbType.UniqueIdentifier);
            }
            return qb.ExecuteDataset("spGetContainers");
        }

        public static DataSet GetUserContainerPermission(string containerId)
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            if (!string.IsNullOrWhiteSpace(containerId))
                qb.SetInParam("@ContainerId", Guid.Parse(containerId), SqlDbType.UniqueIdentifier);
            return qb.ExecuteDataset("spGetUserContainerPermission");
        }

        public static DataSet GetContainers(bool isAdminRole, string containerId, string containerName)
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@IsAdminRole", isAdminRole, SqlDbType.Bit);
            if (!string.IsNullOrWhiteSpace(containerId))
            {
                qb.SetInParam("@ContainerId", Guid.Parse(containerId), SqlDbType.UniqueIdentifier);
            }
            qb.SetInParam("@ContainerName", containerName, SqlDbType.NVarChar);
            return qb.ExecuteDataset("spGetContainers");
        }

        //public static string GetContainerId(bool isAdminRole,string containerName)
        //{
        //    DataSet ds = GetContainers(isAdminRole,"", containerName);
        //    return Convert.ToString(ds.Tables[0].Rows.Count > 0 ? ds.Tables[0].Rows[0]["ContainerId"] : string.Empty);
        //}

        public static string GetContainerName(bool isAdminRole,string containerId)
        {
            DataSet ds = GetContainers(isAdminRole,containerId, "");
            return Convert.ToString(ds.Tables[0].Rows.Count > 0 ? ds.Tables[0].Rows[0]["Name"] : string.Empty);
        }

        public static string GetContainerDirectories(bool isAdminRole,string containerId)
        {
            DataSet ds = GetContainers(isAdminRole, containerId, "");
            return Convert.ToString(ds.Tables[0].Rows.Count > 0 ? ds.Tables[0].Rows[0]["Folders"] : string.Empty);
        }

        public static int UpdateContainer(Container container)
        {
            int retStatus = 0;

            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@ContainerId", container.ContainerId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@ContainerName", container.Name, SqlDbType.NVarChar);
            qb.SetInParam("@Directories", container.Directories, SqlDbType.NVarChar);
            retStatus = Convert.ToInt32(qb.ExecuteNonQuery("spUpdateContainer"));
            return retStatus;
        }

        public static int UpdateUserContainer(string containerId, string userIds)
        {
            int retStatus = 0;

            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@ContainerId", Guid.Parse(containerId), SqlDbType.UniqueIdentifier);
            qb.SetInParam("@UserIds", userIds, SqlDbType.VarChar);
            retStatus = Convert.ToInt32(qb.ExecuteNonQuery("spUpdateUserContainer"));
            return retStatus;
        }

        public static int InsertContainer(Container container)
        {
            int retStatus = 0;

            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@ContainerName", container.Name, SqlDbType.NVarChar);
            qb.SetInParam("@Directories", container.Directories, SqlDbType.NVarChar);
            retStatus = Convert.ToInt32(qb.ExecuteNonQuery("spInsertContainer"));
            return retStatus;
        }

        public static int DeleteContainer(string containerId)
        {
            int retStatus = 0;

            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@ContainerId", Guid.Parse(containerId), SqlDbType.UniqueIdentifier);
            retStatus = Convert.ToInt32(qb.ExecuteNonQuery("spDeleteContainer"));
            return retStatus;
        }
    }
}