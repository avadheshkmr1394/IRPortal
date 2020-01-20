using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;

namespace Insight.Portal.App.Repositories
{
    public class CommentRepository
    {
        public static DataSet GetComments(int entityType, string taskId)
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@EntityType", entityType, SqlDbType.Int);
            qb.SetInParam("@EntityId", Guid.Parse(taskId), SqlDbType.UniqueIdentifier);
            var ds = qb.ExecuteDataset("spGetComments");
            return ds;
        }

        public static void InsertComment(string entityId, int entityType, string commentId, string comment, string userId)
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@EntityId", Guid.Parse(entityId), SqlDbType.UniqueIdentifier);
            qb.SetInParam("@EntityType", entityType, SqlDbType.Int);
            qb.SetInParam("@Comment", comment, SqlDbType.VarChar);
            qb.SetInParam("@CreatedBy", Guid.Parse(userId), SqlDbType.UniqueIdentifier);
            qb.ExecuteNonQuery("spInsertComment");
        }

        public static void UpdateComment(string commentId, string comment, string userId)
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@CommentId", Guid.Parse(commentId), SqlDbType.UniqueIdentifier);
            qb.SetInParam("@Comment", comment, SqlDbType.NVarChar);
            qb.SetInParam("@ModifiedBy", Guid.Parse(userId), SqlDbType.UniqueIdentifier);
            qb.ExecuteNonQuery("spUpdateComment");
        }

        public static void DeleteComment(string commentId)
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@CommentId", Guid.Parse(commentId), SqlDbType.UniqueIdentifier);
            qb.ExecuteNonQuery("spDeleteComment");
        }
    }
}