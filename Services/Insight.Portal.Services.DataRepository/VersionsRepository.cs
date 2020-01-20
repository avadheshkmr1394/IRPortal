using Insight.Portal.Services.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using Vici.Common.SqlHelper;


namespace Insight.Portal.Services.DataRepository
{
    public class VersionsRepository
    {
        public static DataSet GetComponents(Guid? projectId = null, Boolean? isDBComponent = null, Boolean? isVersionComponent = null)
        {
                DataSet ds;
                BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
                qb.SetInParam("@ProjectId", projectId, SqlDbType.UniqueIdentifier);
                qb.SetInParam("@IsDBComponent", isDBComponent, SqlDbType.Bit);
                qb.SetInParam("@IsVersionComponent", isVersionComponent, SqlDbType.Bit);
                ds = qb.ExecuteDataset("spGetComponentsByType");
                return ds;
        }

        public static DataSet GetVersionData(Guid? componentId)
        {
                DataSet ds;
                BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
                qb.SetInParam("@ComponentId", componentId, SqlDbType.UniqueIdentifier);
                ds = qb.ExecuteDataset("spGetVersionData");
                return ds;
        }

        public static long LockVersion(Guid? versionId, Guid? userId)
        {
            long result;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@VersionId", versionId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@IsLocked", true, SqlDbType.Bit);
            qb.SetInParam("@ModifiedBy", userId, SqlDbType.UniqueIdentifier);
            result = qb.ExecuteNonQuery("spUpdateVersionLock");
            return result;
        }

        public static long DeleteVersion(Guid? versionId)
        {
            long result;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@VersionId", versionId, SqlDbType.UniqueIdentifier);
            result = qb.ExecuteNonQuery("spDeleteVersionData");
            return result;
        }

        public static long UpdateVersion(Guid? versionId, Guid? componentId, string version, string buildBy, DateTime? buildOn, string dBBuilds, bool? isLocked, Guid? modifiedBy)
        {
            long result;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@versionId", versionId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@ComponentId", componentId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@Version", version, SqlDbType.NVarChar);
            qb.SetInParam("@BuildBy", buildBy, SqlDbType.NVarChar);
            qb.SetInParam("@BuildOn", buildOn, SqlDbType.DateTime);
            qb.SetInParam("@DBBuilds", dBBuilds, SqlDbType.NVarChar);
            qb.SetInParam("@IsLocked", isLocked, SqlDbType.Bit);
            qb.SetInParam("@ModifiedBy", modifiedBy, SqlDbType.UniqueIdentifier);
            result = qb.ExecuteNonQuery("spUpdateVersionData");
            return result;
        }

        public static long AddVersion(Guid? componentId, string version, string buildBy, DateTime? buildOn, string dBBuilds, bool? isLocked, Guid? createdBy, Guid? modifiedBy)
        {
            long result;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@ComponentId", componentId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@Version", version, SqlDbType.NVarChar);
            qb.SetInParam("@BuildBy", buildBy, SqlDbType.NVarChar);
            qb.SetInParam("@BuildOn", buildOn, SqlDbType.DateTime);
            qb.SetInParam("@DBBuilds", dBBuilds, SqlDbType.NVarChar);
            qb.SetInParam("@IsLocked", isLocked, SqlDbType.Bit);
            qb.SetInParam("@CreatedBy", createdBy, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@ModifiedBy", modifiedBy, SqlDbType.UniqueIdentifier);
            result = qb.ExecuteNonQuery("spInsertVersionData");
            return result;
        }

        public static DataSet GetVersionDetails(Guid? versionId,Guid? taskId = null)
        {
                DataSet ds;
                BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
                qb.SetInParam("@VersionId", versionId, SqlDbType.UniqueIdentifier);
                qb.SetInParam("@TaskId", taskId, SqlDbType.UniqueIdentifier);
                ds = qb.ExecuteDataset("spGetDetailVersionData");
                return ds;
        }

        public static long DeleteVersionDetail(Guid? versionChangeId)
        {
            long result;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@VersionChangeId", versionChangeId, SqlDbType.UniqueIdentifier);
            result = qb.ExecuteNonQuery("spDeleteDetailVersionData");
            return result;
        }

        public static long MoveChanges(Guid? versionId, Guid? versionChangeId, int? status)
        {
            long result;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@VersionId", versionId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@VersionChangeId", versionChangeId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@Status", status, SqlDbType.Int);
            result = qb.ExecuteNonQuery("spMoveChanges");
            return result;
        }

        public static long InsertVersionDetail(Guid? versionId, string reference, string fileChanges, string dBChanges, string description, string changedBy, DateTime? changedOn, int qAStatus, Guid? createdBy)
        {
            long result;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@VersionId", versionId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@Reference", reference, SqlDbType.NVarChar);
            qb.SetInParam("@FileChanges", fileChanges, SqlDbType.NVarChar);
            qb.SetInParam("@DBChanges", dBChanges, SqlDbType.NVarChar);
            qb.SetInParam("@Description", description, SqlDbType.NVarChar);
            qb.SetInParam("@ChangedBy", changedBy, SqlDbType.NVarChar);
            qb.SetInParam("@ChangedOn", changedOn, SqlDbType.DateTime);
            qb.SetInParam("@QAStatus", qAStatus, SqlDbType.Int);
            qb.SetInParam("@CreatedBy", createdBy, SqlDbType.UniqueIdentifier);
            result = qb.ExecuteNonQuery("spInsertDetailVersionData");
            return result;
        }

        public static long UpdateVersionDetail(Guid? versionChangeId, string reference, string fileChanges, string dBChanges, string description, string changedBy, DateTime? changedOn, int qAStatus)
        {
            long result;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@VersionChangeId", versionChangeId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@Reference", reference, SqlDbType.NVarChar);
            qb.SetInParam("@FileChanges", fileChanges, SqlDbType.NVarChar);
            qb.SetInParam("@DBChanges", dBChanges, SqlDbType.NVarChar);
            qb.SetInParam("@Description", description, SqlDbType.NVarChar);
            qb.SetInParam("@ChangedBy", changedBy, SqlDbType.NVarChar);
            qb.SetInParam("@ChangedOn", changedOn, SqlDbType.DateTime);
            qb.SetInParam("@QAStatus", qAStatus, SqlDbType.Int);
            result = qb.ExecuteNonQuery("spUpdateDetailVersionData");
            return result;
        }

        public static long InsertVersionChangeCommit(VersionCommitDetails versionCommitDetails)
        {
            long result;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@VersionChangeId", versionCommitDetails.VersionChangeId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@GitCommitId", versionCommitDetails.GitCommitId, SqlDbType.NVarChar);
            qb.SetInParam("@CommittedBy", versionCommitDetails.CommittedBy, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@CommittedOn", versionCommitDetails.CommittedOn, SqlDbType.DateTime);
            qb.SetInParam("@CommittedFiles", versionCommitDetails.CommittedFiles, SqlDbType.NVarChar);
            qb.SetInParam("@CommitDescription", versionCommitDetails.CommittedDescription, SqlDbType.NVarChar);
            result = qb.ExecuteNonQuery("spInsertVersionChangeCommit");
            return result;
        }

        public static long UpdateVersionChangeCommit(VersionCommitDetails versionCommitDetails)
        {
            long result;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@VersionChangeCommitId", versionCommitDetails.VersionChangeCommitId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@GitCommitId", versionCommitDetails.GitCommitId, SqlDbType.NVarChar);
            qb.SetInParam("@CommittedBy", versionCommitDetails.CommittedBy, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@CommittedOn", versionCommitDetails.CommittedOn, SqlDbType.DateTime);
            qb.SetInParam("@CommittedFiles", versionCommitDetails.CommittedFiles, SqlDbType.NVarChar);
            qb.SetInParam("@CommitDescription", versionCommitDetails.CommittedDescription, SqlDbType.NVarChar);

            result = qb.ExecuteNonQuery("spUpdateVersionChangeCommit");
            return result;
        }

        public static long DeleteVersionChangeCommit(Guid? versionChangeCommitId)
        {
            long result;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@VersionChangeCommitId", versionChangeCommitId, SqlDbType.UniqueIdentifier);
            result = qb.ExecuteNonQuery("spDeleteVersionChangeCommit");
            return result;
        }

        public static DataSet GetVersionsForComponentByTaskId(Guid? taskId, string project)
        {
            DataSet ds;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@TaskId", taskId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@Project", project, SqlDbType.NVarChar);
            ds = qb.ExecuteDataset("spGetVersionsForTask");
            return ds;
        }

    }
}
