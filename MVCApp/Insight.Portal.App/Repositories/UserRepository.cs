using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using Insight.Portal.App.Repositories;


namespace Insight.Portal.App.Repositories
{
    public class UserRepository
    {
        public static DataSet GetEmployees()
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@EmployeeId", DBNull.Value, SqlDbType.UniqueIdentifier);
            DataSet ds = qb.ExecuteDataset("spGetEmployee", CommandType.StoredProcedure);
            return ds;
        }
        public static string GetEmployeeId(string userId)
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@UserId", Guid.Parse(userId), SqlDbType.UniqueIdentifier);
            string id = qb.ExecuteScalar("spGetUserEmployeeId", CommandType.StoredProcedure).ToString();
            return id;
        }

        public static DataSet GetUsers(string userId = "")
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            if (!string.IsNullOrEmpty(userId)) qb.SetInParam("@UserId", Guid.Parse(userId), SqlDbType.UniqueIdentifier);
            DataSet ds = qb.ExecuteDataset("spGetUsers", CommandType.StoredProcedure);
            return ds;
        }

        public static string GetUserId(string employeeId)
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@EmployeeId", Guid.Parse(employeeId), SqlDbType.UniqueIdentifier);
            string id = qb.ExecuteScalar("spGetUserId", CommandType.StoredProcedure).ToString();
            return id;
        }

        public static DataSet GetConfigValue()
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            DataSet ds = qb.ExecuteDataset("spGetConfigValue", CommandType.StoredProcedure);
            return ds;
        }
    }
}