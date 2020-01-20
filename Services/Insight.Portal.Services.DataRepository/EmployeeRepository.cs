using System.Data;
using Vici.Common.SqlHelper;
using Vici.Common.LogHelper;
using System.Configuration;
using System;
using System.Collections.Generic;
using Insight.Portal.Services.Models;

namespace Insight.Portal.Services.DataRepository
{
    public class EmployeeRepository
    {
        public static DataSet GetCalendar(LogModel logModel = null)
        {
            BuildQuery qb = new BuildQuery();
            var ds = qb.ExecuteDataset("spGetCalendar", logModel: logModel);

            return ds;
        }

        public static DataSet GetDataBaseSnapshot(string tables, LogModel logModel = null)
        {
            BuildQuery qb = new BuildQuery();
            var ds = qb.ExecuteDataset("spGetDBSnapshots", logModel: logModel);

            return ds;
        }

        public static DataSet TodayAttendanceTime(Guid? employeeId, DateTime? date)
        {
            BuildQuery qb = new BuildQuery();
            qb.SetInParam("@EmployeeId", employeeId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@Date", date, SqlDbType.DateTime);
            var ds = qb.ExecuteDataset("spCheckAttendanceTime");
            return ds;
        }

        public static long InsertAttendance(Guid? employeeId, DateTime? attendanceDate, DateTime? inTime, DateTime? outTime, decimal? attendance, bool? isWorkFromHome, int? totalMinute, string remarks)
        {
            BuildQuery qb = new BuildQuery();
            qb.SetInParam("@EmployeeId", employeeId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@AttendanceDate", attendanceDate, SqlDbType.DateTime);
            qb.SetInParam("@InTime", inTime, SqlDbType.DateTime);
            qb.SetInParam("@OutTime", outTime, SqlDbType.DateTime);
            qb.SetInParam("@Attendance", attendance, SqlDbType.Decimal);
            qb.SetInParam("@IsWorkFromHome", isWorkFromHome, SqlDbType.Bit);
            qb.SetInParam("@TotalMinute", totalMinute, SqlDbType.Int);
            qb.SetInParam("@Remarks", remarks, SqlDbType.NVarChar);
            var result = qb.ExecuteNonQuery("spInsertAttendance");
            return result;
        }

        public static long InsertOutTime(Guid? employeeId, DateTime? attendanceDate, DateTime? outTime)
        {
            BuildQuery qb = new BuildQuery();
            qb.SetInParam("@EmployeeId", employeeId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@AttendanceDate", attendanceDate, SqlDbType.DateTime);
            qb.SetInParam("@OutTime", outTime, SqlDbType.DateTime);
            var result = qb.ExecuteNonQuery("spOutTimeAttendance");
            return result;
        }
        public static DataSet GetAttendanceSummary(LogModel logModel = null)
        {
            BuildQuery qb = new BuildQuery();
            var ds = qb.ExecuteDataset("spEmployeeAttendanceSummary", logModel: logModel);
            return ds;
        }
        public static DataSet CheckRole(Guid? userId, LogModel logModel = null)
        {
            BuildQuery qb = new BuildQuery();
            qb.SetInParam("@EmployeeId", userId, SqlDbType.UniqueIdentifier);
            var ds = qb.ExecuteDataset("spCheckRole", logModel: logModel);
            return ds;
        }
        public static long InsertLeave(Guid? employeeId, DateTime? leaveFromDate, DateTime? leaveToDate, string leaveType, decimal? leaveCount, string remarks, bool? IsApproved,bool ? IsSecondHalf)
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@EmployeeId", employeeId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@LeaveFromDate", leaveFromDate, SqlDbType.DateTime);
            qb.SetInParam("@LeaveToDate", leaveToDate, SqlDbType.DateTime);
            qb.SetInParam("@LeaveType", leaveType, SqlDbType.NVarChar);
            qb.SetInParam("@LeaveCount", leaveCount, SqlDbType.Decimal);
            qb.SetInParam("@Remarks", remarks, SqlDbType.NVarChar);
            qb.SetInParam("@IsApproved", IsApproved, SqlDbType.Bit);
            qb.SetInParam("@IsSecondHalf", IsSecondHalf, SqlDbType.Bit);
            var result = qb.ExecuteNonQuery("spInsertLeave");
            return result;
        }

        public static long UpdateLeave(Guid? leaveId, DateTime? leaveDate, string leaveType, decimal? leaveCount, string remarks, bool? isApproved,bool ? IsSecondHalf)
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@LeaveId", leaveId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@LeaveDate", leaveDate, SqlDbType.DateTime);
            qb.SetInParam("@LeaveType", leaveType, SqlDbType.NVarChar);
            qb.SetInParam("@LeaveCount", leaveCount, SqlDbType.Decimal);
            qb.SetInParam("@Remarks", remarks, SqlDbType.NVarChar);
            qb.SetInParam("@IsApproved", isApproved, SqlDbType.Bit);
            qb.SetInParam("@IsSecondHalf", IsSecondHalf, SqlDbType.Bit);
            var result = qb.ExecuteNonQuery("spUpdateLeave");
            return result;
        }
        public static long DeleteLeave(Guid? leaveId)
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@LeaveId", leaveId, SqlDbType.UniqueIdentifier);
            var result = qb.ExecuteNonQuery("spDeleteLeave");
            return result;
        }
        public static DataSet GetEmployeeLeaves(Guid? employeeId, DateTime? leaveDate, bool? isAdmin, int? year)
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@EmployeeId", employeeId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@LeaveDate", leaveDate, SqlDbType.DateTime);
            qb.SetInParam("@IsAdmin", isAdmin, SqlDbType.Bit);
            qb.SetInParam("@Year", year, SqlDbType.Int);
            var ds = qb.ExecuteDataset("spGetLeave");
            return ds;
        }
        public static DataSet GetEmployees(Guid? employeeId)
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@EmployeeId", employeeId, SqlDbType.UniqueIdentifier);
            DataSet ds = qb.ExecuteDataset("spGetEmployee", CommandType.StoredProcedure);
            return ds;
        }
        public static DataTable EmployeeLeaveCount(Guid? employeeId)
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@EmployeeId", employeeId, SqlDbType.UniqueIdentifier);
            var ds = qb.ExecuteDataset("spGetEmployeeLeaveCount");
            return ds.Tables[0];
        }
        //public static IEnumerable<DataRow> GetEmployees()
        //{
        //    BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
        //    qb.SetInParam("@EmployeeId", DBNull.Value, SqlDbType.UniqueIdentifier);
        //    DataSet ds = qb.ExecuteDataset("spGetEmployee", CommandType.StoredProcedure);
        //    if (ds.Tables.Count > 0)
        //    {
        //        return ds.Tables[0].AsEnumerable();
        //    }
        //    else
        //    {
        //        return null;
        //    }
        //}
        public static long UpdateEmployee(Employees employeeDetails)
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
            var result = qb.ExecuteNonQuery("spUpdateEmployee");
            return result;

        }
        public static long CreateEmployee(Employees employeeDetails)
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
            var result = qb.ExecuteNonQuery("spInsertEmployee");
            return result;
        }
        public static DataSet CopyTaxSavingData(Guid EmployeeId, int FinancialPriviousYear)
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@EmployeeId", EmployeeId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@FinancialPriviousYear", FinancialPriviousYear, SqlDbType.Int);
            DataSet ds = qb.ExecuteDataset("spCopyTaxSavingData", CommandType.StoredProcedure);
            return ds;
        }
        public static DataSet GetTaxSavingType()
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            var ds = qb.ExecuteDataset("spGetTaxSavingTypes");
            return ds;
        }

        public static long InsertTaxSavingType(TaxSavingTypeModel taxSavingType)
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.ClearParameters();
            qb.SetInParam("@TaxSavingTypeName", taxSavingType.TaxSavingTypeName, SqlDbType.NVarChar);
            qb.SetInParam("@TaxCategoryCode", taxSavingType.TaxCategoryCode, SqlDbType.NVarChar);
            var result = qb.ExecuteNonQuery("spInsertTaxSavingType", CommandType.StoredProcedure);
            return result;
        }


        public static long UpdateTaxSavingType(TaxSavingTypeModel taxSavingType)
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.ClearParameters();
            qb.SetInParam("@TaxSavingType", taxSavingType.TaxSavingType, SqlDbType.Int);
            qb.SetInParam("@TaxSavingTypeName", taxSavingType.TaxSavingTypeName, SqlDbType.NVarChar);
            qb.SetInParam("@TaxCategoryCode", taxSavingType.TaxCategoryCode, SqlDbType.NVarChar);
            var result = qb.ExecuteNonQuery("spUpdateTaxSavingType", CommandType.StoredProcedure);
            return result;
        }

        public static long DeleteTaxSavingType(int taxSavingType)
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@TaxSavingType", taxSavingType, SqlDbType.Int);
            var result = qb.ExecuteNonQuery("spDeleteTaxSavingType", CommandType.StoredProcedure);
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

        public static DataSet GetAllUsers(string userId = "")
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            if (!string.IsNullOrEmpty(userId)) qb.SetInParam("@UserId", Guid.Parse(userId), SqlDbType.UniqueIdentifier);
            DataSet ds = qb.ExecuteDataset("spGetAllUsers", CommandType.StoredProcedure);
            return ds;
        }
        public static long UpdateEmployeeForMap(string userId, string employeeId)
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());

            qb.SetInParam("@UserId", userId, SqlDbType.NVarChar);
            qb.SetInParam("@EmployeeId", employeeId, SqlDbType.NVarChar);
            var result = qb.ExecuteNonQuery("spMapEmployee", CommandType.StoredProcedure);
            return result;
        }
    }
}
