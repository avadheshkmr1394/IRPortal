using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using Vici.Common.SqlHelper;

namespace Insight.Portal.Services.DataRepository
{
    public class TaxSavingsRepository
    {
        public static DataSet GetSavingTypes()
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            DataSet ds = qb.ExecuteDataset("spGetSavingTypes", CommandType.StoredProcedure);
            return ds;
        }

        public static DataSet GetTaxSavingReceipt(Guid? employeeId, int finacialYear)
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@EmployeeId", employeeId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@FinancialYear", finacialYear, SqlDbType.Int);
            var ds = qb.ExecuteDataset("spGetTaxSavingReceipt");
            return ds;
        }

        public static DataSet GetTaxSavingReceiptForExcel(Guid? employeeId, int finacialYear)
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@EmployeeId", employeeId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@FinancialYear", finacialYear, SqlDbType.Int);
            var ds = qb.ExecuteDataset("spGetTaxSavingReceiptExcel");
            return ds;
        }

        public static long InsertTaxSavingReceipt(Guid? employeeId, int? financialYear, int? taxSavingType, int? recurringFrequency, DateTime? savingDate, string accountNumber, float? amount, string remarks, int eligibleCount)
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@EmployeeId", employeeId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@FinancialYear", financialYear, SqlDbType.Int);
            qb.SetInParam("@TaxSavingType", taxSavingType, SqlDbType.Int);
            qb.SetInParam("@RecurringFrequency", recurringFrequency, SqlDbType.Int);
            qb.SetInParam("@SavingDate", savingDate, SqlDbType.DateTime);
            qb.SetInParam("@AccountNumber", accountNumber, SqlDbType.NVarChar);
            qb.SetInParam("@Amount", amount, SqlDbType.Decimal);
            qb.SetInParam("@Remarks", remarks, SqlDbType.NVarChar);
            qb.SetInParam("@EligibleCount", eligibleCount, SqlDbType.Int);
            var result = qb.ExecuteNonQuery("spInsertTaxSavingReceipt");
            return result;
        }

        public static long UpdateTaxSavingReceipt(Guid? taxSavingId, Guid? employeeId, int? financialYear, int? taxSavingType, int? recurringFrequency, DateTime? savingDate, string accountNumber, float? amount, string remarks, int eligibleCount)
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@TaxSavingId", taxSavingId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@EmployeeId", employeeId, SqlDbType.UniqueIdentifier);
            qb.SetInParam("@FinancialYear", financialYear, SqlDbType.Int);
            qb.SetInParam("@TaxSavingType", taxSavingType, SqlDbType.Int);
            qb.SetInParam("@RecurringFrequency", recurringFrequency, SqlDbType.Int);
            qb.SetInParam("@SavingDate", savingDate, SqlDbType.DateTime);
            qb.SetInParam("@AccountNumber", accountNumber, SqlDbType.NVarChar);
            qb.SetInParam("@Amount", amount, SqlDbType.Decimal);
            qb.SetInParam("@Remarks", remarks, SqlDbType.NVarChar);
            qb.SetInParam("@EligibleCount", eligibleCount, SqlDbType.Int);
            var result = qb.ExecuteNonQuery("spUpdateTaxSavingReceipt");
            return result;
        }

        public static long DeleteTaxSavingReceipt(Guid? taxSavingId)
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@TaxSavingId", taxSavingId, SqlDbType.UniqueIdentifier);
            var result = qb.ExecuteNonQuery("spDeleteTaxSavingReceipt");
            return result;
        }

        public static long ApproveTaxSavingReceipt(string receiptsForApprovalString)
        {
            BuildQuery qb = new BuildQuery(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            qb.SetInParam("@TaxSavingIds", receiptsForApprovalString, SqlDbType.NVarChar);
            var result = qb.ExecuteNonQuery("spApproveTaxSavingReceipts");
            return result;
        }
    }
}