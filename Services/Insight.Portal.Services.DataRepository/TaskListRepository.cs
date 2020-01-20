using Insight.Portal.Services.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using Vici.Common.SqlHelper;


namespace Insight.Portal.Services.DataRepository
{
    public class TaskListRepository
    {
        public static DataSet GetTasks(string projectId, string status, string taskType = "", string component = "", string assignees = "", int isBoard = 0)
        {
            DataSet ds = null;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@ProjectId", Guid.Parse(projectId), SqlDbType.UniqueIdentifier);
            if (!string.IsNullOrEmpty(status)) qb.SetInParam("@Status", status, SqlDbType.VarChar);
            if (!string.IsNullOrEmpty(taskType)) qb.SetInParam("@TaskType", taskType, SqlDbType.VarChar);
            if (!string.IsNullOrEmpty(component)) qb.SetInParam("@Component", component, SqlDbType.VarChar);
            if (!string.IsNullOrEmpty(assignees)) qb.SetInParam("@Assignees", assignees, SqlDbType.VarChar);
            qb.SetInParam("@IsBoard", isBoard, SqlDbType.Bit);
            ds = qb.ExecuteDataset("spGetTasks");
            return ds;
        }

        //public static DataSet GetTasks(string projectId, string taskId)
        //{
        //    DataSet ds = null;
        //    BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
        //    qb.SetInParam("@ProjectId", Guid.Parse(projectId), SqlDbType.UniqueIdentifier);
        //    if (!string.IsNullOrEmpty(taskId)) qb.SetInParam("@TaskId", Guid.Parse(taskId), SqlDbType.UniqueIdentifier);
        //    ds = qb.ExecuteDataset("spGetTasks");
        //    return ds;
        //}
        //public static DataSet GetTaskTypes(int categoryId)
        //{
        //    DataSet ds = null;
        //    BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
        //    qb.SetInParam("@CategoryId", categoryId, SqlDbType.Int);
        //    ds = qb.ExecuteDataset("GetTypes");
        //    return ds;
        //}

        //public static DataSet GetStatus(int entityType)
        //{
        //    DataSet ds = null;
        //    BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
        //    qb.SetInParam("@EntityType", entityType, SqlDbType.Int);
        //    ds = qb.ExecuteDataset("spGetStatus");
        //    return ds;
        //}

        //public static DataSet GetComponents(string projectId)
        //{
        //    DataSet ds = null;
        //    BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
        //    if (!string.IsNullOrEmpty(projectId))
        //        qb.SetInParam("@ProjectId", Guid.Parse(projectId), SqlDbType.UniqueIdentifier);
        //    ds = qb.ExecuteDataset("GetComponents");
        //    return ds;
        //}

        public static DataSet GetAreas(string projectId)
        {
            DataSet ds = null;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            if (!string.IsNullOrEmpty(projectId))
                qb.SetInParam("@ProjectId", Guid.Parse(projectId), SqlDbType.UniqueIdentifier);
            ds = qb.ExecuteDataset("spGetDistinctTaskAreaByProject");
            return ds;
        }

        //public static DataSet GetUsers()
        //{
        //    DataSet ds = null;
        //    BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
        //    ds = qb.ExecuteDataset("spGetDistinctUserName");
        //    return ds;
        //}

        public static int Delete(string taskId)
        {
            int retStatus = 0;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@TaskId", Guid.Parse(taskId), SqlDbType.UniqueIdentifier);
            retStatus = Convert.ToInt32(qb.ExecuteNonQuery("spDeleteTask"));
            return retStatus;
        }

        //public static int Update(TaskListModel task)
        //{
        //    int retStatus = 0;
        //    BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
        //    qb.SetInParam("@TaskId", task.TaskId, SqlDbType.UniqueIdentifier);
        //    qb.SetInParam("@Summary", task.Summary, SqlDbType.NVarChar);
        //    qb.SetInParam("@TaskType", task.TaskType, SqlDbType.Int);
        //    qb.SetInParam("@Status", task.StatusId, SqlDbType.Int);
        //    qb.SetInParam("@PriorityType", task.PriorityType, SqlDbType.Int);
        //    qb.SetInParam("@ResolutionType", task.ResolutionType, SqlDbType.Int);
        //    qb.SetInParam("@Assignee", task.Assignee, SqlDbType.NVarChar);
        //    qb.SetInParam("@Reporter", task.Reporter, SqlDbType.NVarChar);
        //    qb.SetInParam("@ComponentId", task.ComponentId, SqlDbType.UniqueIdentifier);
        //    qb.SetInParam("@DueDate", task.DueDate, SqlDbType.DateTime);
        //    qb.SetInParam("@OriginalEstimate", task.OriginalEstimate, SqlDbType.Int);
        //    qb.SetInParam("@TimeSpent", task.TimeSpent, SqlDbType.Int);
        //    qb.SetInParam("@RemainingEstimate", task.RemainingEstimate, SqlDbType.Int);
        //    qb.SetInParam("@Description", task.Description, SqlDbType.NVarChar);
        //    qb.SetInParam("@Area", task.Area, SqlDbType.NVarChar);
        //    qb.SetInParam("@ModifiedBy", task.ModifiedBy, SqlDbType.UniqueIdentifier);
        //    retStatus = Convert.ToInt32(qb.ExecuteNonQuery("spUpdateTask"));
        //    return retStatus;
        //}

        public static int Insert(TaskListModel task)
        {
            int retStatus = 0;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@ProjectId", task.ProjectId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@Summary", task.Summary, SqlDbType.NVarChar);
            qb.SetInParam("@TaskType", task.TaskType, SqlDbType.Int);
            qb.SetInParam("@Status", task.StatusId, SqlDbType.Int);
            qb.SetInParam("@PriorityType", task.PriorityType, SqlDbType.Int);
            qb.SetInParam("@ResolutionType", task.ResolutionType, SqlDbType.Int);
            qb.SetInParam("@Assignee", task.Assignee, SqlDbType.NVarChar);
            qb.SetInParam("@Reporter", task.Reporter, SqlDbType.NVarChar);
            qb.SetInParam("@ComponentId", task.ComponentId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@DueDate", task.DueDate, SqlDbType.DateTime);
            qb.SetInParam("@OriginalEstimate", task.OriginalEstimate, SqlDbType.Int);
            qb.SetInParam("@TimeSpent", task.TimeSpent, SqlDbType.Int);
            qb.SetInParam("@RemainingEstimate", task.RemainingEstimate, SqlDbType.Int);
            qb.SetInParam("@Description", task.Description, SqlDbType.NVarChar);
            qb.SetInParam("@Area", task.Area, SqlDbType.NVarChar);
            qb.SetInParam("@CreatedBy", task.CreatedBy, SqlDbType.UniqueIdentifier);
            retStatus = Convert.ToInt32(qb.ExecuteNonQuery("spInsertTask"));
            return retStatus;
        }

        //public static string InsertTaskFromEmail(string from, string to, string cc, string subject, string body)
        //{
        //    string retTaskId = string.Empty;
        //    BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
        //    qb.SetInParam("@From", from, SqlDbType.NVarChar);
        //    qb.SetInParam("@To", to, SqlDbType.NVarChar);
        //    qb.SetInParam("@Cc", cc, SqlDbType.NVarChar);
        //    qb.SetInParam("@Subject", subject, SqlDbType.NVarChar);
        //    qb.SetInParam("@Body", body, SqlDbType.NVarChar);
        //    retTaskId = Convert.ToString(qb.ExecuteScalar("spInsertTaskFromEmail"));
        //    return retTaskId;
        //}

        //public static int InsertTaskAttachment(string taskId, string fileName, string contentType, int contentLength, byte[] fileContent)
        //{
        //    int retStatus = 0;
        //    BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
        //    qb.SetInParam("@TaskId", Guid.Parse(taskId), SqlDbType.UniqueIdentifier);
        //    qb.SetInParam("@FileName", fileName, SqlDbType.NVarChar);
        //    qb.SetInParam("@ContentType", contentType, SqlDbType.NVarChar);
        //    qb.SetInParam("@ContentLength", contentLength, SqlDbType.Int);
        //    qb.SetInParam("@FileContent", fileContent, SqlDbType.VarBinary);

        //    retStatus = Convert.ToInt32(qb.ExecuteNonQuery("InsertTaskAttachment"));
        //    return retStatus;
        //}

        //public static DataSet GetAttachments(string taskId)
        //{
        //    DataSet ds = null;
        //    BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
        //    qb.SetInParam("@TaskId", Guid.Parse(taskId), SqlDbType.UniqueIdentifier);
        //    ds = qb.ExecuteDataset("spGetAttachments");
        //    return ds;
        //}

        //public static DataTable DownloadAttachment(string attachmentId, string entityId)
        //{
        //    DataSet ds = null;
        //    BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
        //    qb.SetInParam("@AttachmentId", Guid.Parse(attachmentId), SqlDbType.UniqueIdentifier);
        //    qb.SetInParam("@EntityId", Guid.Parse(entityId), SqlDbType.UniqueIdentifier);
        //    ds = qb.ExecuteDataset("spDownloadAttachment2");
        //    return ds.Tables[0];
        //}

        //public static int InsertAttachment(Attachment attachment)
        //{
        //    int retStatus = 0;
        //    BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
        //    qb.SetInParam("@EntityType", attachment.EntityType, SqlDbType.Int);
        //    qb.SetInParam("@EntityId", attachment.EntityId, SqlDbType.UniqueIdentifier);
        //    qb.SetInParam("@FileName", attachment.FileName, SqlDbType.NVarChar);
        //    qb.SetInParam("@ContentType", attachment.ContentType, SqlDbType.NVarChar);
        //    qb.SetInParam("@ContentLength", attachment.ContentLength, SqlDbType.Int);
        //    qb.SetInParam("@FileContent", attachment.FileContent, SqlDbType.VarBinary);
        //    qb.SetInParam("@UploadedBy", attachment.UploadedBy, SqlDbType.UniqueIdentifier);
        //    retStatus = Convert.ToInt32(qb.ExecuteNonQuery("InsertAttachment"));
        //    return retStatus;
        //}

        //public static int DeleteAttachment(string attachmentId)
        //{
        //    int retStatus = 0;
        //    BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
        //    qb.SetInParam("@AttachmentId", Guid.Parse(attachmentId), SqlDbType.UniqueIdentifier);
        //    retStatus = Convert.ToInt32(qb.ExecuteNonQuery("DeleteAttachment"));
        //    return retStatus;
        //}

        //public static DataSet GetMyTasks(string assignee)
        //{
        //    DataSet ds = null;
        //    BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
        //    qb.SetInParam("@Assignee", Guid.Parse(assignee), SqlDbType.UniqueIdentifier);
        //    ds = qb.ExecuteDataset("spGetMyTasks");
        //    return ds;
        //}
        //public static void UpdateTaskRank(string data, int? status)
        //{
        //    BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
        //    qb.ClearParameters();
        //    qb.SetInParam("@data", data, SqlDbType.NVarChar);
        //    qb.SetInParam("@status", status, SqlDbType.Int);
        //    qb.ExecuteScalar("spUpdateTaskRank", CommandType.StoredProcedure);
        //}

        //public static void BulkUpdateTask(string taskIds, int operationType, string param1, string param2, string loginUserId)
        //{
        //    BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
        //    qb.SetInParam("@TaskIds", taskIds, SqlDbType.VarChar);
        //    qb.SetInParam("@OperationType", operationType, SqlDbType.Int);
        //    if (!string.IsNullOrEmpty(param1))
        //    {
        //        qb.SetInParam("@Param1", param1.Trim(), SqlDbType.NVarChar);
        //    }
        //    if (!string.IsNullOrEmpty(param2))
        //    {
        //        qb.SetInParam("@Param2", param2.Trim(), SqlDbType.NVarChar);
        //    }
        //    qb.SetInParam("@ModifiedBy", new Guid(loginUserId), SqlDbType.UniqueIdentifier);

        //    qb.ExecuteScalar("spUpdateTaskBulk", CommandType.StoredProcedure);
        //}
    }
}
