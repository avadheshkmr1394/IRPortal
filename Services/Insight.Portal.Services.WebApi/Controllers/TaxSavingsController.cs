using Insight.Portal.Services.DataRepository;
using Insight.Portal.Services.Models;
using Insight.Portal.Services.WebApi.Utils.Excel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using Vici.Common.LogHelper;


namespace Insight.Portal.Services.WebApi.Controllers
{
    public class TaxSavingsController : ApiController
    {

        [System.Web.Http.Route("TaxSavings/GetTaxSavingReceipt")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult GetTaxSavingReceipt(TaxSavingModel ts)
        {
            DataSet ds = TaxSavingsRepository.GetTaxSavingReceipt(ts.EmployeeId,ts.FinancialYear);         
            return Ok(ds.Tables[0]); 
        }
        [System.Web.Http.Route("TaxSavings/GetSavingTypes")]
        [System.Web.Http.HttpGet]
        public IHttpActionResult GetSavingTypes()
        {
            DataSet savingTypesResult = TaxSavingsRepository.GetSavingTypes();
            List<SelectListItem> listSavingTypes = savingTypesResult.Tables[0].AsEnumerable()
                                           .OrderBy(r => r.Field<string>("TaxSavingTypeName"))
                                           .Select(r => new SelectListItem { Text = r.Field<string>(1), Value = r.Field<int>(0).ToString() })
                                           .ToList();
            listSavingTypes.Insert(0, (new SelectListItem { Text = "", Value = "" }));
            return Ok(listSavingTypes);
        }

        [System.Web.Http.Route("TaxSavings/InsertTaxSavingReceipt")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult InsertTaxSavingReceipt(TaxSavingModel ts)
        {
            long result;
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            dynamic receiptObj = serializer.Deserialize<object>(ts.jsonData);
            result = TaxSavingsRepository.InsertTaxSavingReceipt(Guid.Parse(receiptObj["employeeId"]), int.Parse(receiptObj["financialYear"]),
            int.Parse(receiptObj["taxSavingType"]), int.Parse(receiptObj["recurringFrequency"]), (Convert.ToString(receiptObj["savingDate"]) != "") ? DateTime.Parse(receiptObj["savingDate"]) : null,
            System.Uri.UnescapeDataString(Convert.ToString(receiptObj["accountNumber"])), float.Parse(receiptObj["amount"]), System.Uri.UnescapeDataString(Convert.ToString(receiptObj["remarks"])), int.Parse(receiptObj["eligibleCount"]));
            return Json(result);
        }
        [System.Web.Http.Route("TaxSavings/EditTaxSaving")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult EditTaxSaving(TaxSavingModel ts)
        {
            DataSet ds = TaxSavingsRepository.GetTaxSavingReceipt(ts.EmployeeId, ts.FinancialYear);
            DataTable Results = ds.Tables[0];
            var query = Results.AsEnumerable().Select(result => new
            {
                TaxSavingId = result.Field<Guid>("TaxSavingId"),
                EmployeeId = result.Field<Guid>("EmployeeId"),
                FullName = result.Field<string>("FullName"),
                FinancialYear = result.Field<int>("FinancialYear"),
                TaxSavingType = result.Field<int>("TaxSavingType"),
                TaxSavingTypeName = result.Field<string>("TaxSavingTypeName"),
                RecurringFrequency = result.Field<int>("RecurringFrequency"),
                SavingDate = result.Field<DateTime ?>("SavingDate"),
                AccountNumber = result.Field<string>("AccountNumber"),
                Amount = result.Field<decimal?>("Amount"),
                TotalAmount = result.Field<decimal?>("TotalAmount"),
                Remarks = result.Field<string>("Remarks"),
                ReceiptSubmitted = result.Field<bool?>("ReceiptSubmitted"),
                EligibleCount = result.Field<int>("EligibleCount")
            });
            var filterdata= query.Where(m => m.TaxSavingId == ts.TaxSavingId);
            return Ok(filterdata);

        }
        [System.Web.Http.Route("TaxSavings/UpdateTaxSavingReceipt")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult UpdateTaxSavingReceipt(TaxSavingModel ts)
        {
            long result;
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            dynamic receiptObj = serializer.Deserialize<object>(ts.jsonData);
            result = TaxSavingsRepository.UpdateTaxSavingReceipt(Guid.Parse(receiptObj["taxSavingId"]), Guid.Parse(receiptObj["employeeId"]), int.Parse(receiptObj["financialYear"]),
            int.Parse(receiptObj["taxSavingType"]), int.Parse(receiptObj["recurringFrequency"]), (Convert.ToString(receiptObj["savingDate"]) != "") ? DateTime.Parse(receiptObj["savingDate"]) : null,
            System.Uri.UnescapeDataString(Convert.ToString(receiptObj["accountNumber"])), float.Parse(receiptObj["amount"]), Convert.ToString(receiptObj["remarks"]), int.Parse(receiptObj["eligibleCount"]));
            return Ok(result);
        }
        [System.Web.Http.Route("TaxSavings/DeleteTaxSavingReceipt")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult DeleteTaxSavingReceipt(TaxSavingModel ts)
        {
            long result;
            result = TaxSavingsRepository.DeleteTaxSavingReceipt(ts.TaxSavingId);
            return Ok(result);
        }
        [System.Web.Http.Route("TaxSavings/CopyPriviousReciept")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult CopyPriviousReciept(TaxSavingModel ts)
        {
            if (ts.EmployeeId != Guid.Empty)
            {
              var  Result = EmployeeRepository.CopyTaxSavingData(ts.EmployeeId, ts.currentYear - 1);
              return Ok(Result);
            }
            else
            {
                return Ok();
            }
        }
        [System.Web.Http.Route("TaxSavings/ExcelExport")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult ExcelExport(TaxSavingModel ts)
        {
            /*string employeeId, string financialYear, string fyText*/
            string fileName = Guid.NewGuid().ToString() + ".xlsx";
            string physicalFileName = HttpRuntime.AppDomainAppPath + "/Log/" + fileName;
            DataSet ds = TaxSavingsRepository.GetTaxSavingReceipt(ts.EmployeeId, ts.FinancialYear);
            DataSet dsList = new DataSet();
            List<string> strTableHeader = new List<string>();
            System.Data.DataView view = new System.Data.DataView(ds.Tables[0]);
            DataTable distinctValues = view.ToTable(true, "EmployeeId", "FullName");
            for (int i = 0; i < distinctValues.Rows.Count; i++)
            {
                DataSet objDsList = TaxSavingsRepository.GetTaxSavingReceiptForExcel((distinctValues.Rows[i]["EmployeeId"].ToString() != "") ? Guid.Parse(distinctValues.Rows[i]["EmployeeId"].ToString()) : Guid.Parse("00000000-0000-0000-0000-000000000000"), ts.FinancialYear);
                objDsList.Tables[0].TableName = distinctValues.Rows[i]["FullName"].ToString();
                dsList.Tables.Add(objDsList.Tables[0].Copy());
                strTableHeader.Add(distinctValues.Rows[i]["FullName"].ToString());
            }
            var excelHelper = new ExcelExport();
            Attachment objExcelFile = new Attachment();
            string excelSheetHeading = "Tax Savings (FY " + ts.fyText + ")";
            excelHelper.ExportToExcel(physicalFileName, dsList, excelSheetHeading);
            string downloadName = string.Format("Tax Savings -{0:yyyyMMdd-HHmmss}" + ".xlsx", DateTime.Now);
            objExcelFile.FileName = downloadName; ;
            objExcelFile.FileContent = System.IO.File.ReadAllBytes(physicalFileName);
            objExcelFile.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

            return Ok(objExcelFile);
        }
        [System.Web.Http.Route("TaxSavings/ApproveTaxSavingReceipt")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult ApproveTaxSavingReceipt(TaxSavingModel ts)
        {
            long result;
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            dynamic objReceiptsForApproval = serializer.Deserialize<object>(ts.jsonData);
            string receiptsForApprovalString = "";
            for (int i = 0; i < objReceiptsForApproval.Length; i++)
            {
                if (i == 0)
                {
                    receiptsForApprovalString = Convert.ToString(objReceiptsForApproval[i]["TaxSavingId"]);

                }
                else
                {
                    receiptsForApprovalString = receiptsForApprovalString + ',' + Convert.ToString(objReceiptsForApproval[i]["TaxSavingId"]);

                }
            }
            result = TaxSavingsRepository.ApproveTaxSavingReceipt(receiptsForApprovalString);
            return Ok(result);
        }

        [System.Web.Http.Route("TaxSavings/GetTaxSavingType")]
        [System.Web.Http.HttpGet]
        public IHttpActionResult GetTaxSavingType()
        {
            try
            {
                DataSet ds = EmployeeRepository.GetTaxSavingType();
                return Ok(ds.Tables[0]);
            }
            catch
            {
                return null;
            }
        }
        [System.Web.Http.Route("TaxSavings/EditTaxSavingType")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult EditTaxSavingType(TaxSavingTypeModel taxSavingTypeModel)
        {
            try
            {
                DataSet ds = EmployeeRepository.GetTaxSavingType();
                DataTable Results = ds.Tables[0];
                var query = Results.AsEnumerable().Select(result => new
                {
                    TaxSavingType = result.Field<int>("TaxSavingType"),
                    TaxSavingTypeName = result.Field<string>("TaxSavingTypeName"),
                    TaxCategoryCode = result.Field<string>("TaxCategoryCode")
                });
                var filterdata = query.Where(m => m.TaxSavingType == taxSavingTypeModel.TaxSavingType);
                return Ok(filterdata); ;
            }
            catch
            {
                return null;
            }
        }
        [System.Web.Http.Route("TaxSavings/InsertTaxSavingType")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult InsertTaxSavingType(TaxSavingTypeModel taxSavingTypeModel)
        {
            try

            {
                long result;
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                string jsonObject = taxSavingTypeModel.jsonData;
                TaxSavingTypeModel taxsaving = serializer.Deserialize<TaxSavingTypeModel>(jsonObject);
                result = EmployeeRepository.InsertTaxSavingType(taxsaving);
                return Json(result);
            }
            catch(Exception ex)
            {
                
                return Ok("");
            }
        }

        [System.Web.Http.Route("TaxSavings/UpdateTaxSavingType")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult UpdateTaxSavingType(TaxSavingTypeModel taxSavingTypeModel)
        {
            try
            {
                long result;
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                TaxSavingTypeModel taxsaving = serializer.Deserialize<TaxSavingTypeModel>(taxSavingTypeModel.jsonData);
                result = EmployeeRepository.UpdateTaxSavingType(taxsaving);
                return Json(result);
            }
            catch (Exception ex)
            {
                return Ok("");
            }
        }
        [System.Web.Http.Route("TaxSavings/DeleteTaxSavingType")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult DeleteTaxSavingType(TaxSavingTypeModel taxSavingTypeModel)
        {
            long result;
            result = EmployeeRepository.DeleteTaxSavingType(taxSavingTypeModel.TaxSavingType);
            return Json(result);
        }

        [System.Web.Mvc.NonAction]
        private string GetUserId()
        {
            string _userId = "";
            if (Request.Headers.Contains("userId"))
            {
                _userId = Convert.ToString(Request.Headers.GetValues("userId").First());
            }
            return _userId;
        }
        private string userRole()
        {
            LogModel logModel = new LogModel { };
            DataSet user = EmployeeRepository.CheckRole(Guid.Parse(GetUserId()), logModel);
            string isAdmin = "0";
            if (user.Tables[0].Rows.Count > 0)
            {
                isAdmin = "1";
            }
            else
            {
                isAdmin = "0";
            }
            return isAdmin;
        }
    }
}

