using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using Insight.Portal.App.Models;

namespace Insight.Portal.App.Repositories
{
    public class EmployeeRepository
    {
        public static IEnumerable<DataRow> GetEmployees()
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@EmployeeId", DBNull.Value, SqlDbType.UniqueIdentifier);
            DataSet ds = qb.ExecuteDataset("spGetEmployee", CommandType.StoredProcedure);
            if (ds.Tables.Count > 0)
            {
                return ds.Tables[0].AsEnumerable();
            }
            else
            {
                return null;
            }
        }

        public static DataSet GetAllUsers(string userId = "")
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            if (!string.IsNullOrEmpty(userId)) qb.SetInParam("@UserId", Guid.Parse(userId), SqlDbType.UniqueIdentifier);
            DataSet ds = qb.ExecuteDataset("spGetAllUsers", CommandType.StoredProcedure);
            return ds;
        }

        public static void UpdateEmployee(Employee employeeDetails)
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.ClearParameters();
            qb.SetInParam("@EmployeeId", employeeDetails.EmployeeId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@FirstName ", employeeDetails.FirstName, SqlDbType.NVarChar);
            qb.SetInParam("@MiddleName", employeeDetails.MiddleName, SqlDbType.NVarChar);
            qb.SetInParam("@LastName", employeeDetails.LastName, SqlDbType.NVarChar);
            qb.SetInParam("@Designation", employeeDetails.Designation, SqlDbType.NVarChar);
            qb.SetInParam("@Gender", employeeDetails.Gender, SqlDbType.NVarChar);
            qb.SetInParam("@DateOfBirth", employeeDetails.DateOfBirth, SqlDbType.DateTime);
            qb.SetInParam("@Anniversary", "1901-01-01", SqlDbType.DateTime);
            qb.SetInParam("@Remarks", employeeDetails.Remarks, SqlDbType.NVarChar);
            qb.SetInParam("@DateOfJoining", employeeDetails.DateOfJoining, SqlDbType.DateTime);
            qb.SetInParam("@DateOfRelieving", employeeDetails.DateOfRelieving, SqlDbType.DateTime);
            qb.SetInParam("@PanNo", employeeDetails.PanNo, SqlDbType.NVarChar);
            qb.SetInParam("@FatherName", employeeDetails.FatherName, SqlDbType.NVarChar);
            qb.SetInParam("@EmployeeType", employeeDetails.EmployeeType, SqlDbType.NVarChar);
            qb.SetInParam("@BankDetail", employeeDetails.BankDetail, SqlDbType.NVarChar);
            qb.SetInParam("@OrignalDateOfBirth", employeeDetails.OrignalDateOfBirth, SqlDbType.DateTime);
            qb.ExecuteScalar("spUpdateEmployee", CommandType.StoredProcedure);

        }
        public static void CreateEmployee(Employee employeeDetails)
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.ClearParameters();
            qb.SetInParam("@FirstName ", employeeDetails.FirstName, SqlDbType.NVarChar);
            qb.SetInParam("@MiddleName", employeeDetails.MiddleName, SqlDbType.NVarChar);
            qb.SetInParam("@LastName", employeeDetails.LastName, SqlDbType.NVarChar);
            qb.SetInParam("@Designation", employeeDetails.Designation, SqlDbType.NVarChar);
            qb.SetInParam("@Gender", employeeDetails.Gender, SqlDbType.NVarChar);
            qb.SetInParam("@DateOfBirth", employeeDetails.DateOfBirth, SqlDbType.DateTime);
            qb.SetInParam("@Anniversary", "1901-01-01", SqlDbType.DateTime);
            qb.SetInParam("@Remarks", employeeDetails.Remarks, SqlDbType.NVarChar);
            qb.SetInParam("@DateOfJoining", employeeDetails.DateOfJoining, SqlDbType.DateTime);
            qb.SetInParam("@DateOfRelieving", employeeDetails.DateOfRelieving, SqlDbType.DateTime);
            qb.SetInParam("@PanNo", employeeDetails.PanNo, SqlDbType.NVarChar);
            qb.SetInParam("@FatherName", employeeDetails.FatherName, SqlDbType.NVarChar);
            qb.SetInParam("@EmployeeType", employeeDetails.EmployeeType, SqlDbType.NVarChar);
            qb.SetInParam("@BankDetail", employeeDetails.BankDetail, SqlDbType.NVarChar);
            qb.SetInParam("@OrignalDateOfBirth", employeeDetails.OrignalDateOfBirth, SqlDbType.DateTime);
            qb.ExecuteScalar("spInsertEmployee", CommandType.StoredProcedure);
        }
        public static DataSet GetUpcomingEvent()
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            DataSet ds = qb.ExecuteDataset("spGetUpcomingEvents", CommandType.StoredProcedure);
            if (ds.Tables.Count > 0)
            {
                return ds;
            }
            else
            {
                return null;
            }
        }

        public static DataSet GetTaxSavingType()
        {
            DataSet ds;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            ds = qb.ExecuteDataset("spGetTaxSavingTypes");
            return ds;
        }

        public static long InsertTaxSavingType(TaxSavingTypeModel taxSavingType)
        {
            long result;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.ClearParameters();
            qb.SetInParam("@TaxSavingTypeName", taxSavingType.TaxSavingTypeName, SqlDbType.NVarChar);
            qb.SetInParam("@TaxCategoryCode", taxSavingType.TaxCategoryCode, SqlDbType.NVarChar);
            result = qb.ExecuteNonQuery("spInsertTaxSavingType", CommandType.StoredProcedure);
            return result;
        }


        public static long UpdateTaxSavingType(TaxSavingTypeModel taxSavingType)
        {
            long result;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.ClearParameters();
            qb.SetInParam("@TaxSavingType", taxSavingType.TaxSavingType, SqlDbType.Int);
            qb.SetInParam("@TaxSavingTypeName", taxSavingType.TaxSavingTypeName, SqlDbType.NVarChar);
            qb.SetInParam("@TaxCategoryCode", taxSavingType.TaxCategoryCode, SqlDbType.NVarChar);
            result = qb.ExecuteNonQuery("spUpdateTaxSavingType", CommandType.StoredProcedure);
            return result;
        }

        public static long DeleteTaxSavingType(int taxSavingType)
        {
            long result;
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@TaxSavingType", taxSavingType, SqlDbType.Int);
            result = qb.ExecuteNonQuery("spDeleteTaxSavingType", CommandType.StoredProcedure);
            return result;
        }
        public static IEnumerable<DataRow> GetEmployeeForMap()
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            //qb.SetInParam("@EmployeeId", DBNull.Value, SqlDbType.UniqueIdentifier);
            DataSet ds = qb.ExecuteDataset("spGetEmployeeForMap", CommandType.StoredProcedure);
            if (ds.Tables.Count > 0)
            {
                return ds.Tables[0].AsEnumerable();
            }
            else
            {
                return null;
            }
        }
        public static IEnumerable<DataRow> UpdateEmployeeForMap(string UserId, string EmployeeId)
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());

            qb.SetInParam("@UserId", UserId, SqlDbType.NVarChar);
            qb.SetInParam("@EmployeeId", EmployeeId, SqlDbType.NVarChar);

            DataSet ds = qb.ExecuteDataset("spMapEmployee", CommandType.StoredProcedure);
            if (ds.Tables.Count > 0)
            {
                return ds.Tables[0].AsEnumerable();
            }
            else
            {
                return null;
            }
        }

        public static DataSet CopyTaxSavingData(Guid EmployeeId, int FinancialPriviousYear)
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@EmployeeId", EmployeeId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@FinancialPriviousYear", FinancialPriviousYear, SqlDbType.Int);
            DataSet ds = qb.ExecuteDataset("spCopyTaxSavingData", CommandType.StoredProcedure);
            return ds;
        }
    }
}

