using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using Insight.Portal.Services.Models;
using Vici.Common.SqlHelper;


namespace Insight.Portal.Services.DataRepository
{
    public class HolidayRepository
    {
        //public static DataSet GetHolidays()
        //{
        //        BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
        //        DataSet ds = qb.ExecuteDataset("spGetHoliday", CommandType.StoredProcedure);
        //        return ds;
        //}

        public static DataSet GetHoliday()
        {
            try
            {
                BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
                var ds = qb.ExecuteDataset("spGetHoliday");
                return ds;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static long InsertHoliday(HolidayModel holiday)
        {
            try
            {
                BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
                qb.ClearParameters();
                qb.SetInParam("@HolidayDate", holiday.HolidayDate, SqlDbType.DateTime);
                qb.SetInParam("@Name", holiday.Name, SqlDbType.NVarChar);
                qb.SetInParam("@Remarks", holiday.Remark, SqlDbType.NVarChar);
                var result = qb.ExecuteNonQuery("spInsertHoliday", CommandType.StoredProcedure);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static long UpdateHoliday(HolidayModel holiday)
        {
            try
            {
                long result;
                BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
                qb.ClearParameters();
                qb.SetInParam("@HolidayDate", holiday.HolidayDate, SqlDbType.DateTime);
                qb.SetInParam("@Name", holiday.Name, SqlDbType.NVarChar);
                qb.SetInParam("@Remarks", holiday.Remark, SqlDbType.NVarChar);
                result = qb.ExecuteNonQuery("spUpdateHoliday", CommandType.StoredProcedure);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
         }


        public static long DeleteHoliday(DateTime holidaydate)
        {
            try
            {
                long result;
                BuildQuery bq = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
                bq.ClearParameters();
                bq.SetInParam("@HolidayDate",holidaydate, SqlDbType.DateTime);
                result = bq.ExecuteNonQuery("spDeleteHoliday");
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
