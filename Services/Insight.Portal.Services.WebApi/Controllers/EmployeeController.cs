using Insight.Portal.Services.Business;
using Insight.Portal.Services.DataRepository;
using Insight.Portal.Services.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Results;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using Vici.Common.LogHelper;

namespace Insight.Portal.Services.WebApi.Controllers
{
    public class EmployeeController : ApiController
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [System.Web.Http.Route("Employee/GetEmployees")]
        [System.Web.Http.HttpGet]
        public List<EmployeeModel> GetEmployees()
        {
            return Services.Business.Employee.GetEmployees(); ;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [System.Web.Http.Route("Employee/GetLeaves")]
        [System.Web.Http.HttpGet]
        public List<LeaveModel> GetLeaves()
        {
            return Services.Business.Employee.GetLeaves(); ;
        }


        [System.Web.Http.Route("Employee/InsertEmployeeLeave")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult InsertEmployeeLeave(LeaveInsertModel lem)
        {
            try
            {
            if(lem.LeaveId == Guid.Empty)
            {
                    if (lem.employeeId == Guid.Empty)
                    {
                        string _userId = GetUserId();
                        lem.employeeId = Guid.Parse(_userId);
                    }
                    else
                    {
                        lem.IsApproved = true;
                    }
                 var result = Services.Business.Employee.InsertLeave(lem.employeeId, lem.leaveFromDate, lem.leaveToDate, lem.leaveType, lem.leaveCount, lem.remarks,lem.IsApproved,lem.IsSecondHalf);
                if (result != 0)
                {
                    return Ok(true);
                }
                else
                {
                    return Ok(false);
                }
            }
            else
            {            
                var result = Services.Business.Employee.UpdateLeave(lem.LeaveId, lem.leaveFromDate, lem.leaveType, lem.leaveCount, lem.remarks, lem.IsApproved, lem.IsSecondHalf);
                if (result != 0)
                {
                    return Ok(true);
                }
                else
                {
                    return Ok(false);
                }

            }
            }
            catch(Exception ex)
            {
                throw ex;
            }

        }
        [System.Web.Http.Route("Employee/ApproveEmployeeLeave")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult ApproveEmployeeLeave(LeaveInsertModel lem)
        {
            try
            {
                var ds = Services.Business.Employee.GetEmployeeLeaves(Convert.ToString(lem.employeeId), lem.year);
                var leave = Models.Utils.Table.ToClassList<Models.LeaveModel>(ds.Tables[0]);
                var Result = leave.FirstOrDefault(d => d.LeaveId == lem.LeaveId);
                Result.IsApproved = lem.IsApproved;
                var result = Services.Business.Employee.UpdateLeave(Result.LeaveId, Result.LeaveDate, Result.LeaveType, Result.LeaveCount, Result.Remarks, Result.IsApproved,lem.IsSecondHalf);
                if (result != 0)
                {
                    return Ok(true);
                }
                else
                {
                    return Ok(false);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [System.Web.Http.Route("Employee/GetEmployeeLeaves")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult GetEmployeeLeaves(LeaveInsertModel lem)
        {
            if(lem.employeeId==Guid.Empty)
            {
            string _userId = GetUserId();
            Guid userId;
            if (!Guid.TryParse(_userId, out userId))
            {
                return null;
            }
            string employeeId= _userId;
            string leaveYear=DateTime.Now.Year.ToString();
            var ds = Services.Business.Employee.GetEmployeeLeaves(employeeId, leaveYear);
            var leave = Models.Utils.Table.ToClassList<Models.LeaveModel>(ds.Tables[0]).OrderBy(m=>m.IsApproved);
            return Ok(leave);
            }
            else
            {
                var ds = Services.Business.Employee.GetEmployeeLeaves(Convert.ToString(lem.employeeId), lem.year);
                var leave = Models.Utils.Table.ToClassList<Models.LeaveModel>(ds.Tables[0]).OrderBy(m => m.IsApproved); ;
                return Ok(leave);
            }
        }

        [System.Web.Http.Route("Employee/GetEmployeeLeavesById")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult GetEmployeeLeavesById(LeaveInsertModel lem)
        {
            string employeeId = string.Empty;
            if (lem.employeeId == Guid.Empty)
            {
                string _userId = GetUserId();
                Guid userId;
                if (!Guid.TryParse(_userId, out userId))
                {
                    return null;
                }
                employeeId = _userId;
                lem.year = DateTime.Now.Year.ToString();
            }
            else
            {
                employeeId = Convert.ToString(lem.employeeId);
            }
            var ds = Services.Business.Employee.GetEmployeeLeaves(employeeId, lem.year);
            var leave = Models.Utils.Table.ToClassList<Models.LeaveModel>(ds.Tables[0]).OrderBy(m => m.IsApproved); ;
            return Ok(leave);
        }
        [System.Web.Http.Route("Employee/editEmployeeLeaves")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult editEmployeeLeaves(LeaveInsertModel lem )
        {
            try
            {
                //string _userId = GetUserId();
                //Guid userId;
                //if (!Guid.TryParse(_userId, out userId))
                //{
                //    return null;
                //}
               string employeeId =Convert.ToString(lem.employeeId);
                //string leaveYear = DateTime.Now.Year.ToString();
                var ds = Services.Business.Employee.GetEmployeeLeaves(employeeId, lem.year);
                var leave = Models.Utils.Table.ToClassList<Models.LeaveModel>(ds.Tables[0]);
                var Result = leave.FirstOrDefault(d => d.EmployeeId == lem.employeeId && d.LeaveDate.ToString("yyyy-MM-dd") == lem.leavedate);
                LeaveModelGet obj = new LeaveModelGet();
                if (Result != null)
                {
                    obj.LeaveId = Result.LeaveId;
                    obj.EmployeeId = Result.EmployeeId;
                    obj.LeaveDate = Result.LeaveDate;
                    obj.LeaveType = Result.LeaveType;
                    obj.LeaveCount = Result.LeaveCount.ToString();
                    obj.Remarks = Result.Remarks;
                    obj.IsApproved = Result.IsApproved;
                    obj.IsSecondHalf = Result.IsSecondHalf;
                }
                return Ok(obj);
            }
            catch (Exception ex)
            {
                throw ex;
            }
          
        }
        [System.Web.Http.Route("Employee/deleteEmployeeLeave")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult deleteEmployeeLeave(LeaveInsertModel lem)
        {

            return Ok(Services.Business.Employee.DeleteLeave(lem.LeaveId));
        }
        [System.Web.Http.Route("Employee/GetEmployeeData")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult GetEmployeeData(LeaveInsertModel lem)
        {
            string employeeId = string.Empty;
            if (lem.employeeId == Guid.Empty)
            {
                string _userId = GetUserId();
                Guid userId;
                if (!Guid.TryParse(_userId, out userId))
                {
                    return null;
                }
                 employeeId = _userId;
            }
            else
            {
                 employeeId = Convert.ToString(lem.employeeId);
            }
            DataSet user = Services.Business.Employee.GetUserRole(Guid.Parse(employeeId));
            string userrole = string.Empty;
            if (user.Tables[0].Rows.Count > 0)
            {
                userrole = user.Tables[0].Rows[0]["Name"].ToString();
            }
            if (userrole == "Admin")
            {         
                return Ok(Services.Business.Employee.GetEmployees(Guid.Empty).Tables[0]);
            }
            else
            {
                return Ok(Services.Business.Employee.GetEmployees(Guid.Parse(employeeId)).Tables[0]);
            }
           
        }
        [System.Web.Http.Route("Employee/EmployeeLeaveCount")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult EmployeeLeaveCount(LeaveInsertModel lem)
        {
            string employeeId = string.Empty;
            if (lem.employeeId == Guid.Empty)
            {
                string _userId = GetUserId();
                Guid userId;
                if (!Guid.TryParse(_userId, out userId))
                {
                    return null;
                }
                employeeId = _userId;
            }
            else
            {
                employeeId = Convert.ToString(lem.employeeId);
            }
            return Ok(Services.Business.Employee.EmployeeLeaveCount(Guid.Parse(employeeId)));
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="finalDate"></param>
        /// <returns></returns>
        [System.Web.Http.Route("Employee/GetTodayAttendanceTime")]
        [System.Web.Http.HttpGet]
        public object GetTodayAttendanceTime(DateTime finalDate)
        {
            string _userId = GetUserId();
            Guid userId;
            if (!Guid.TryParse(_userId, out userId))
            {
                return null;
            }

            return Employee.GetTodayAttendanceTime(finalDate, userId);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="dateTime"></param>
        /// <returns></returns>
        [System.Web.Http.Route("Employee/InsertInTime")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult InsertInTime(JObject data)
        {
            try
            {
                string _userId = GetUserId();
                Guid userId;
                if (!Guid.TryParse(_userId, out userId))
                {
                    return null;
                }
                DateTime dateTime = Convert.ToDateTime(data["dateTime"]);
                Employee.InsertInTime(userId, dateTime);
                return Ok();
            }
            catch (Exception ex)
            {
                return new ExceptionResult(ex, this);
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="dateTime"></param>
        /// <returns></returns>
        [System.Web.Http.Route("Employee/InsertOutTime")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult InsertOutTime(JObject data)
        {
            try
            {
                string _userId = GetUserId();
                Guid userId;
                if (!Guid.TryParse(_userId, out userId))
                {
                    return null;
                }
                DateTime dateTime = Convert.ToDateTime(data["dateTime"]);
                Employee.InsertOutTime(userId, dateTime);
                return Ok();
            }
            catch (Exception ex)
            {
                return new ExceptionResult(ex, this);
            }
        }
        [System.Web.Http.Route("Employee/GetEmpLeaves")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult GetEmpLeaves(LeaveInsertModel lm)
        {
            if (lm.employeeId == Guid.Empty)
            {
                lm.employeeId = Guid.Parse(GetUserId());
            }
            DataSet ds = LeaveRepository.GetLeaves(lm.employeeId, null, false, int.Parse(lm.year));
            ds.Tables[0].TableName = "Leaves";
            DataTable dt = LeaveRepository.GetEmployeeTotalLeave(lm.employeeId, null, int.Parse(lm.year));
            if (dt.Rows.Count > 0)
            {
                dt.TableName = "TotalLeaves";
                ds.Tables.Add(dt.Copy());
            }
            return Ok(ds);
        }
        [System.Web.Http.Route("Employee/BindingLeaveRecordGrid")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult BindingLeaveRecordGrid()
        {
            string employeeId = GetUserId();
            DataTable dt = LeaveRepository.EmployeeLeaveRecord(userRole(), Guid.Parse(employeeId));
            return Ok(dt);
        }
        [System.Web.Http.Route("Employee/GetHoliday")]
        [System.Web.Http.HttpGet]
        public IHttpActionResult GetHoliday()
        {
            try
            {
                DataSet ds = HolidayRepository.GetHoliday();
                return Ok(ds.Tables[0]);
            }
            catch
            {
                return null;
            }
        }
        [System.Web.Http.Route("Employee/EditEmployee")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult EditEmployee(LeaveInsertModel model)
        {
            return Ok(Services.Business.Employee.GetEmployees(model.employeeId).Tables[0]);
        }
        [System.Web.Http.Route("Employee/CreateEmployee")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult CreateEmployee(Employees employeeDetails)
        {
            if (employeeDetails.EmployeeId == Guid.Empty)
            {
                return Ok(Employee.CreateEmployee(employeeDetails));
            }
            else
            {
                return Ok(Employee.UpdateEmployee(employeeDetails));
            }
        }

        [System.Web.Http.Route("Employee/InsertHoliday")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult InsertHoliday(HolidayModel holidayModel)
        {
            long result;
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            HolidayModel holiday = serializer.Deserialize<HolidayModel>(holidayModel.jsonData);
            result = HolidayRepository.InsertHoliday(holiday);
            return Ok(result);

        }

        [System.Web.Http.Route("Employee/EditHoliday")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult EditHoliday(HolidayModel holidayModel)
        {
            try
            {
                DataSet ds = HolidayRepository.GetHoliday();
                var result = ds.Tables[0];
                var query = result.AsEnumerable().Select(m => new
                {
                    HolidayDate = m.Field<DateTime>("HolidayDate"),
                    Name = m.Field<string>("Name"),
                    Remark = m.Field<string>("Remarks")
                });
                var singleResult = query.Where(m => m.HolidayDate == holidayModel.HolidayDate);
                return Ok(singleResult);
            }
            catch
            {
                return null;
            }
        }

        [System.Web.Http.Route("Employee/UpdateHoliday")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult UpdateHoliday(HolidayModel holidayModel )
        {
            long result;
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            HolidayModel holiday = serializer.Deserialize<HolidayModel>(holidayModel.jsonData);
            result = HolidayRepository.UpdateHoliday(holiday);
            return Ok(result);
        }

        [System.Web.Http.Route("Employee/DeleteHoliday")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult DeleteHoliday(HolidayModel holiday)
        {
            long result;
            result = HolidayRepository.DeleteHoliday(holiday.HolidayDate);
            return Ok(result);
        }

        [System.Web.Http.Route("Employee/GetLeaveReport")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult GetLeaveReport(JObject objData )
        {
            DataSet ds;
            if (!string.IsNullOrWhiteSpace(Convert.ToString(objData["employeeId"])))
            {
                ds = LeaveRepository.LeaveReport(Convert.ToString(objData["employeeStatus"]), Guid.Parse(Convert.ToString(objData["employeeId"])));
            }
            else
            {
                ds = LeaveRepository.LeaveReport(Convert.ToString(objData["employeeStatus"]));
            }
            ds.Tables[0].TableName = "LeaveReport";
            DataTable dt = new DataTable();
            dt.Clear();
            dt.Columns.Add("ReportHeaders");
            foreach (DataColumn col in ds.Tables[0].Columns)
            {
                DataRow newRow = dt.NewRow();
                newRow["ReportHeaders"] = col.ColumnName;
                dt.Rows.Add(newRow);
            }
            ds.Tables.Add(dt);
            ds.Tables[1].TableName = "ReportHeaders";
            return Ok(ds);
        }
        [System.Web.Http.Route("Employee/GetMapEmployee")]
        [System.Web.Http.HttpGet]
        public IHttpActionResult GetMapEmployee()
        {
            IEnumerable<DataRow> employees = EmployeeRepository.GetEmployeeForMap();
            List<Employees> EmployeedetailList = new List<Employees>();
            DataTable boundTable = employees.CopyToDataTable();
            for (var i = 0; i < boundTable.Rows.Count; i++)
            {
                Employees Employeedetail = new Employees();
                Employeedetail.EmployeeId = Guid.Parse(boundTable.Rows[i][0].ToString());
                Employeedetail.Name = boundTable.Rows[i][1].ToString();
                Employeedetail.FirstName = boundTable.Rows[i][2].ToString();
                Employeedetail.MiddleName = boundTable.Rows[i][3].ToString();
                Employeedetail.LastName = boundTable.Rows[i][4].ToString();
                Employeedetail.Designation = boundTable.Rows[i][5].ToString();
                Employeedetail.Gender = boundTable.Rows[i][6].ToString();
                Employeedetail.DateOfBirth = boundTable.Rows[i][7].ToString() == "" ? "" : DateTime.Parse(boundTable.Rows[i][7].ToString()).ToString("yyyy-MM-dd");
                Employeedetail.MapStatus = Convert.ToBoolean(boundTable.Rows[i][8].ToString());
                EmployeedetailList.Add(Employeedetail);
            }

            return Ok(EmployeedetailList);

        }
        [System.Web.Http.Route("Employee/GetMapEmpUser")]
        [System.Web.Http.HttpGet]
        public IHttpActionResult GetMapEmpUser()
        {
            DataSet ds = EmployeeRepository.GetAllUsers();
            IEnumerable<SelectListItem> users =ds.Tables[0].AsEnumerable().Select(dr => new SelectListItem() { Text = Convert.ToString(dr["UserName"].ToString()), Value = dr["UserId"].ToString() });
            return Ok(users.ToList());          
        }
        [System.Web.Http.Route("Employee/UpdateEmployeeMapWithUser")]
        [System.Web.Http.HttpGet]
        public IHttpActionResult UpdateEmployeeMapWithUser(string UserId, string EmployeeId)
        {
            long result;
            if (UserId != "")
            {
                result = EmployeeRepository.UpdateEmployeeForMap(UserId, EmployeeId);
                return Ok(result);
            }
            else
            {
                return Ok("");
            }

        }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
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