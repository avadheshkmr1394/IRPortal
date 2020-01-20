using Insight.Portal.App.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;

namespace Insight.Portal.App.Repositories
{
    public class ProjectRepository
    {
        public static DataSet GetProjectSummary()
        {
            DataSet ds = null;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            ds = qb.ExecuteDataset("spGetProjectSummary");
            return ds;
        }

        public static DataSet GetResourceWorkload()
        {
            DataSet ds = null;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            ds = qb.ExecuteDataset("spGetResourceWorkload");
            return ds;
        }

        public static DataSet GetProjects(string projectId, string userId, int statusId = 0)
        {
            DataSet ds = null;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            if(!string.IsNullOrWhiteSpace(projectId))
                qb.SetInParam("@ProjectId", Guid.Parse(projectId), SqlDbType.UniqueIdentifier);
            if(!string.IsNullOrWhiteSpace(userId))
                qb.SetInParam("@UserId", Guid.Parse(userId), SqlDbType.UniqueIdentifier);
            qb.SetInParam("@StatusId", statusId, SqlDbType.Int);
            ds = qb.ExecuteDataset("spGetProjects");
            return ds;
        }

        public static DataSet GetProjectUserPermission(string projectId)
        {
            DataSet ds = null;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            if (!string.IsNullOrWhiteSpace(projectId))
                qb.SetInParam("@ProjectId", Guid.Parse(projectId), SqlDbType.UniqueIdentifier);
            ds = qb.ExecuteDataset("spGetProjectUserPermission");
            return ds;
        }

        public static DataSet GetComponents(string projectId , string componentId)
        {
            DataSet ds = null;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            if (!string.IsNullOrWhiteSpace(projectId))
                qb.SetInParam("@ProjectId", Guid.Parse(projectId), SqlDbType.UniqueIdentifier);
            if (!string.IsNullOrWhiteSpace(componentId))
                qb.SetInParam("@ComponentId", Guid.Parse(componentId), SqlDbType.UniqueIdentifier);
            
            ds = qb.ExecuteDataset("spGetComponents");
            return ds;
        }

        public static DataSet GetClients()
        {
            DataSet ds = null;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            ds = qb.ExecuteDataset("spSelectActiveClient");
            return ds;
        }

        public static int UpdateProject(Project project, string userId)
        {
            int retStatus = 0;

            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@ProjectId", project.ProjectId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@ClientId", project.ClientId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@Name", project.Name, SqlDbType.NVarChar);
            qb.SetInParam("@Code", project.Code, SqlDbType.NVarChar);
            qb.SetInParam("@Status", project.Status == true ? "1" : "0", SqlDbType.NVarChar);
            qb.SetInParam("@Description", project.Description, SqlDbType.NVarChar);
            qb.SetInParam("@ModifiedBy", Guid.Parse(userId), SqlDbType.UniqueIdentifier);
            retStatus = Convert.ToInt32(qb.ExecuteNonQuery("spUpdateProject"));
            return retStatus;
        }

        public static int InsertProject(Project project, string userId)
        {
            int retStatus = 0;

            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@ClientId", project.ClientId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@Name", project.Name, SqlDbType.NVarChar);
            qb.SetInParam("@Code", project.Code, SqlDbType.NVarChar);
            qb.SetInParam("@Status", project.Status == true ? "1" : "0", SqlDbType.NVarChar);
            qb.SetInParam("@Description", project.Description, SqlDbType.NVarChar);
            qb.SetInParam("@CreatedBy", Guid.Parse(userId), SqlDbType.UniqueIdentifier);
            retStatus = Convert.ToInt32(qb.ExecuteNonQuery("spInsertProject"));
            return retStatus;
        }

        public static int UpdateProjectPermission(string projectId, string userIds)
        {
            int retStatus = 0;

            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@ProjectId", Guid.Parse(projectId), SqlDbType.UniqueIdentifier);
            qb.SetInParam("@UserIds", userIds, SqlDbType.NVarChar);
            retStatus = Convert.ToInt32(qb.ExecuteNonQuery("spUpdateProjectPermission"));
            return retStatus;
        }

        public static int UpdateComponent(ProjectComponent component, string userId)
        {
            int retStatus = 0;

            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@ComponentId", component.ComponentId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@ModifiedBy", Guid.Parse(userId), SqlDbType.UniqueIdentifier);
            qb.SetInParam("@ComponentName", component.Name, SqlDbType.NVarChar);
            qb.SetInParam("@IsDBComponent", component.IsDBComponent, SqlDbType.Bit);
            qb.SetInParam("@IsVersionComponent", component.IsVersionComponent, SqlDbType.Bit);
            qb.SetInParam("@GitUrl", component.GitUrl, SqlDbType.NVarChar);
            qb.SetInParam("@BuildPrefixForConfig", component.BuildPrefixForConfig, SqlDbType.NVarChar);
            retStatus = Convert.ToInt32(qb.ExecuteNonQuery("spUpdateComponents"));
            return retStatus;
        }

        public static int InsertComponent(ProjectComponent component, string projectId, string userId)
        {
            int retStatus = 0;

            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@ProjectId", Guid.Parse(projectId), SqlDbType.UniqueIdentifier);
            qb.SetInParam("@ComponentName", component.Name, SqlDbType.NVarChar);
            qb.SetInParam("@CreatedBy", Guid.Parse(userId), SqlDbType.UniqueIdentifier);
            qb.SetInParam("@IsDBComponent", component.IsDBComponent, SqlDbType.Bit);
            qb.SetInParam("@IsVersionComponent", component.IsVersionComponent, SqlDbType.Bit);
            qb.SetInParam("@GitUrl", component.GitUrl, SqlDbType.NVarChar);
            qb.SetInParam("@BuildPrefixForConfig", component.BuildPrefixForConfig, SqlDbType.NVarChar);
            retStatus = Convert.ToInt32(qb.ExecuteNonQuery("spInsertComponents"));
            return retStatus;
        }

        public static int DeleteComponent(ProjectComponent component)
        {
            int retStatus = 0;

            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@ComponentId", component.ComponentId, SqlDbType.UniqueIdentifier);
            retStatus = Convert.ToInt32(qb.ExecuteNonQuery("spDeleteComponents"));
            return retStatus;
        }
    }
}
