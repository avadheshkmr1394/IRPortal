using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using Vici.Common.SqlHelper;

namespace Insight.Portal.App.Repositories
{
    public class DBScriptsRepository
    {
        public static DataSet GetBuilds(Guid? componentId)
        {
            DataSet ds;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@ComponentId", componentId, SqlDbType.UniqueIdentifier);
            ds = qb.ExecuteDataset("spGetDBBuilds");
            return ds;
        }

        public static DataSet GetDBScriptSummary(Guid? dBBuildId)
        {
            DataSet ds;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@DBBuildId", dBBuildId, SqlDbType.UniqueIdentifier);
            ds = qb.ExecuteDataset("spSelectDBScript");
            return ds;
        }

        public static DataSet GetAllDBScripts(string dBBuildId, string componentId = "", string dbscriptIds = "")
        {
            DataSet ds;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@DBBuildId", dBBuildId, SqlDbType.NVarChar);
            qb.SetInParam("@DBScriptIDs", dbscriptIds, SqlDbType.NVarChar);
            if (!string.IsNullOrWhiteSpace(componentId))
            {
                qb.SetInParam("@ComponentId", Guid.Parse(componentId), SqlDbType.UniqueIdentifier);
            }
            ds = qb.ExecuteDataset("spGetAllDBScriptsByBuild");
            return ds;
        }

        public static DataTable GetAllDBScriptsByComponent(string componentId)
        {
            DataSet ds;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@DBBuildId", componentId, SqlDbType.NVarChar);
            ds = qb.ExecuteDataset("spGetAllDBScriptsByComponent");
            return ds.Tables[0];
        }

        public static DataTable GetBuildsBetweenFromAndTo(Guid? componentId, string dBBuildFrom, string dBBuildTo)
        {
            DataSet ds;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@ComponentId", componentId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@DBBuildFrom", dBBuildFrom, SqlDbType.NVarChar);
            qb.SetInParam("@DBBuildTo", dBBuildTo, SqlDbType.NVarChar);
            ds = qb.ExecuteDataset("spGetTotalBuild");
            return ds.Tables[0];
        }

        public static long InsertDBScript(Guid? dBBuildId, string name, string description, int? dBScriptType, int? dBChangeType, string reference, string script, DateTime? changedOn, Guid? changedBy, Guid? createdBy)
        {
            long result;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@DBBuildId", dBBuildId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@Name", name, SqlDbType.NVarChar);
            qb.SetInParam("@Description", description, SqlDbType.NVarChar);
            qb.SetInParam("@DBScriptType", dBScriptType, SqlDbType.Int);
            qb.SetInParam("@DBChangeType", dBChangeType, SqlDbType.Int);
            qb.SetInParam("@Reference", reference, SqlDbType.NVarChar);
            qb.SetInParam("@Script", script, SqlDbType.NVarChar);
            qb.SetInParam("@ChangedOn", changedOn, SqlDbType.DateTime);
            qb.SetInParam("@ChangedBy", changedBy, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@CreatedBy", createdBy, SqlDbType.UniqueIdentifier);
            result = qb.ExecuteNonQuery("spInsertDBScript");
            return result;
        }

        public static long UpdateDBScript(Guid? dBScriptId, string name, string description, int? dBScriptType, int? dBChangeType, string reference, string script, int? sequence, DateTime? changedOn, Guid? changedBy, Guid? modifiedBy)
        {
            long result;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@DBScriptId", dBScriptId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@Name", name, SqlDbType.NVarChar);
            qb.SetInParam("@Description", description, SqlDbType.NVarChar);
            qb.SetInParam("@DBScriptType", dBScriptType, SqlDbType.Int);
            qb.SetInParam("@DBChangeType", dBChangeType, SqlDbType.Int);
            qb.SetInParam("@Reference", reference, SqlDbType.NVarChar);
            qb.SetInParam("@Script", script, SqlDbType.NVarChar);
            qb.SetInParam("@Sequence", sequence, SqlDbType.Int);
            qb.SetInParam("@ChangedOn", changedOn, SqlDbType.DateTime);
            qb.SetInParam("@ChangedBy", changedBy, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@ModifiedBy", modifiedBy, SqlDbType.UniqueIdentifier);
            result = qb.ExecuteNonQuery("spUpdateDBScript");
            return result;
        }

        public static long DeleteDBScript(Guid? dBScriptId)
        {
            long result;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@DBScriptId", dBScriptId, SqlDbType.UniqueIdentifier);
            result = qb.ExecuteNonQuery("spDeleteDBScript");
            return result;
        }

        public static long LockDBScript(Guid? dBBuildId, bool? isLocked, Guid? modifiedBy)
        {
            long result;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@DBBuildId", dBBuildId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@IsLocked", isLocked, SqlDbType.Bit);
            qb.SetInParam("@ModifiedBy", modifiedBy, SqlDbType.UniqueIdentifier);
            result = qb.ExecuteNonQuery("spUpdateDBBuild");
            return result;
        }

        public static string GetNextBuildNumber(Guid? componentId)
        {
            string result;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@ComponentId", componentId, SqlDbType.UniqueIdentifier);
            result = Convert.ToString(qb.ExecuteScalar("spGetNextBuildNumber"));
            return result;
        }

        public static long InsertNewBuild(Guid? componentId, string name, Guid? createdBy)
        {
            long result;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@ComponentId", componentId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@Name", name, SqlDbType.NVarChar);
            qb.SetInParam("@CreatedBy", createdBy, SqlDbType.UniqueIdentifier);
            result = qb.ExecuteNonQuery("spInsertDBBuild");
            return result;
        }

        public static long MoveCopyNewBuild(Guid? dBScriptId, Guid? dBBuildId, Guid? modifiedBy, int? status)
        {
            long result;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@DBScriptId", dBScriptId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@DBBuildId", dBBuildId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@ModifiedBy", modifiedBy, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@Status", status, SqlDbType.Int);
            result = qb.ExecuteNonQuery("spMoveDBScript");
            return result;
        }

        public static DataSet GetTypes(int? entityType, string optionSetName)
        {
            DataSet ds;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@EntityType", entityType, SqlDbType.Int);
            qb.SetInParam("@OptionSetName", optionSetName, SqlDbType.NVarChar);
            ds = qb.ExecuteDataset("spGetOptions");
            return ds;
        }

        public static DataSet GetUserByRole(string roleName)
        {
            DataSet ds;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@RoleName", roleName, SqlDbType.NVarChar);
            ds = qb.ExecuteDataset("spGetUsersByRoleName");
            return ds;
        }

        public static long UpdateDraggedDBScriptsquence(string selectedDbScriptsId)
        {
            long result;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@SelectedDbScriptsId", selectedDbScriptsId, SqlDbType.NVarChar);
            result = qb.ExecuteNonQuery("spUpdateDBScriptsSequence");
            return result;
        }

        public static DataSet GetDBScriptsBySearchText(Guid? componentId, string searchText)
        {
            DataSet ds;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@ComponentId", componentId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@SearchText", searchText, SqlDbType.NVarChar);
            ds = qb.ExecuteDataset("spGetScriptsByComponentAndName");
            return ds;
        }
    }
}
