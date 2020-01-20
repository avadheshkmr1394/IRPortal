using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;

namespace Insight.Portal.App.Repositories
{
    public class ReleaseNotesRepository
    {
        public static DataSet GetReleaseSummary(Guid? componentId)
        {
            DataSet ds;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@ComponentId", componentId, SqlDbType.UniqueIdentifier);
            ds = qb.ExecuteDataset("spGetReleaseNoteSummary");
            return ds;
        }

        public static long LockReleaseSummary(Guid? releaseNoteSummaryId)
        {
            long result;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@ReleaseNoteSummaryId", releaseNoteSummaryId, SqlDbType.UniqueIdentifier);
            result = qb.ExecuteNonQuery("spLockReleaseNoteSummary");
            return result;
        }

        public static long DeleteReleaseSummary(Guid? releaseNoteSummaryId)
        {
            long result;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@ReleaseNoteSummaryId", releaseNoteSummaryId, SqlDbType.UniqueIdentifier);
            result = qb.ExecuteNonQuery("spDeleteReleaseNoteSummary");
            return result;
        }

        public static long UpdateReleaseSummary(string releaseTitle, bool? isLocked, Guid? modifiedBy, Guid? releaseNoteSummaryId, DateTime? releaseDate)
        {
            long result;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@ReleaseTitle", releaseTitle, SqlDbType.NVarChar);
            qb.SetInParam("@IsLocked", isLocked, SqlDbType.Bit);
            qb.SetInParam("@ModifiedBy", modifiedBy, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@ReleaseNoteSummaryId", releaseNoteSummaryId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@ReleaseDate", releaseDate, SqlDbType.DateTime);
            result = qb.ExecuteNonQuery("spUpdateReleaseNoteSummary");
            return result;
        }

        public static long AddReleaseSummary(Guid? componentId, string releaseTitle, bool? isLocked, Guid? createdBy, DateTime? releaseDate)
        {
            long result;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@ComponentId", componentId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@ReleaseTitle", releaseTitle, SqlDbType.NVarChar);
            qb.SetInParam("@IsLocked", isLocked, SqlDbType.Bit);
            qb.SetInParam("@CreatedBy", createdBy, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@ReleaseDate", releaseDate, SqlDbType.DateTime);
            result = qb.ExecuteNonQuery("spInsertReleaseNoteSummary");
            return result;
        }

        public static DataSet GetReleaseNotes(string releaseNoteSummaryIds)
        {
            DataSet ds;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@ReleaseNoteSummaryIds", releaseNoteSummaryIds, SqlDbType.NVarChar);
            ds = qb.ExecuteDataset("spGetReleaseNoteBySummaryId");
            return ds;
        }

        public static long DeleteReleaseNote(Guid? releaseNoteId)
        {
            long result;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@ReleaseNoteId", releaseNoteId, SqlDbType.UniqueIdentifier);
            result = qb.ExecuteNonQuery("spDeleteReleaseNote");
            return result;
        }

        public static long ImportBulkReleaseNotes(Guid? releaseNoteSummaryId, string selectedVersions)
        {
            long result;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@ReleaseNoteSummaryId", releaseNoteSummaryId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@SelectedVersions", selectedVersions, SqlDbType.NVarChar);
            result = qb.ExecuteNonQuery("spGetReference");
            return result;
        }

        public static long InsertReleaseNote(Guid? versionId, string reference, int? type, string title, string remarks, bool? isPublic, Guid? releaseNoteSummaryId)
        {
            long result;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@VersionId", versionId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@Reference", reference, SqlDbType.NVarChar);
            qb.SetInParam("@Type", type, SqlDbType.Int);
            qb.SetInParam("@Title", title, SqlDbType.NVarChar);
            qb.SetInParam("@Remarks", remarks, SqlDbType.NVarChar);
            qb.SetInParam("@IsPublic", isPublic, SqlDbType.Bit);
            qb.SetInParam("@ReleaseNoteSummaryId", releaseNoteSummaryId, SqlDbType.UniqueIdentifier);
            result = qb.ExecuteNonQuery("spInsertReleaseNote");
            return result;
        }

        public static long UpdateReleaseNote(Guid? releaseNoteId, Guid? versionId, string reference, int? type, string title, string remarks, bool? isPublic, int? sequence, bool? updateTaskFields)
        {
            long result;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@ReleaseNoteId", releaseNoteId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@VersionId", versionId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@Reference", reference, SqlDbType.NVarChar);
            qb.SetInParam("@Type", type, SqlDbType.Int);
            qb.SetInParam("@Title", title, SqlDbType.NVarChar);
            qb.SetInParam("@Remarks", remarks, SqlDbType.NVarChar);
            qb.SetInParam("@IsPublic", isPublic, SqlDbType.Bit);
            qb.SetInParam("@Sequence", sequence, SqlDbType.Int);
            qb.SetInParam("@UpdateTaskFields", updateTaskFields, SqlDbType.Bit);
            result = qb.ExecuteNonQuery("spUpdateReleaseNote");
            return result;
        }

        public static long UpdateDraggedReleaseNotesSquence(string selectedReleaseNotesId)
        {
            long result;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@SelectedReleaseNotesId", selectedReleaseNotesId, SqlDbType.NVarChar);
            result = qb.ExecuteNonQuery("spUpdateReleaseNotesSequence");
            return result;
        }

        public static DataSet GetReleaseNotesSummaries(Guid? componentId)
        {
            try
            {
                DataSet ds;
                BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
                qb.SetInParam("@ComponentId", componentId, SqlDbType.UniqueIdentifier);
                ds = qb.ExecuteDataset("spGetReleaseNotesSummaries");
                return ds;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }
}