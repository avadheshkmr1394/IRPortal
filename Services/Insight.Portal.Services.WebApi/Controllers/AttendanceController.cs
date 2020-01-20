using Insight.Portal.Services.DataRepository;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using Insight.Portal.Services.Models;
using Vici.Common.LogHelper;
using System.Web.Script.Serialization;

namespace Insight.Portal.Services.WebApi.Controllers
{
    public class AttendanceController : ApiController
    {

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("Attendance/GetUsers")]
        public IHttpActionResult GetUsers()
        {
            LogModel logModel = new LogModel { };
            DataSet user = EmployeeRepository.CheckRole(Guid.Parse(GetUserId()), logModel);

            string EmployeeId = string.Empty;
            if (user.Tables[0].Rows.Count > 0)
            {
                EmployeeId = null;
            }
            else
            {
                EmployeeId = GetUserId();
            }
            DataSet employeeResult = UserRepository.GetEmployees(EmployeeId);
            List<SelectListItem> listEmployees = employeeResult.Tables[0].AsEnumerable()
                                           .Select(r => new SelectListItem { Text = r.Field<string>(5), Value = r.Field<Guid>(1).ToString() })
                                           .ToList();
            return Ok(listEmployees);
        }
        [System.Web.Http.Route("Attendance/GetAttendance")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult GetAttendance(DateModal dtm)
        {
            if (dtm.employeeId == Guid.Empty)
            {
                dtm.employeeId = Guid.Parse(GetUserId());
            }
            DateTime startDate = DateTime.Parse(dtm.monthStartDate);
            //DateTime.Parse(dtm.monthStartDate);
            int? day = null;
            int year = Convert.ToDateTime(dtm.monthStartDate).Year;
            int month = Convert.ToDateTime(dtm.monthStartDate).Month;
            DataSet ds = AttendanceRepository.GetAttendance(dtm.employeeId, Convert.ToInt32(dtm.todayDay) == 0 ? day : Convert.ToInt32(dtm.todayDay), startDate.Month, startDate.Year);
            ds.Tables[0].TableName = "Attendance";
            DataTable dt = BindTotalTime(GetUserId(), dtm.monthStartDate);
            if (dt.Rows.Count > 0)
            {
                dt.TableName = "TotalHours";
                ds.Tables.Add(dt.Copy());
            }
            return Ok(ds);
            //return Ok(JsonConvert.SerializeObject(ds, Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore }));
        }

        public DataTable BindTotalTime(string employeeId, string selectedDate)
        {
            DateTime startDate = DateTime.Parse(selectedDate);
            DataTable totalWorkingHours = AttendanceRepository.GetTotalWorkingHours(Guid.Parse(employeeId), startDate.Day, startDate.Month, startDate.Year);
            return totalWorkingHours;
        }
        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("Attendance/EditAttendance")]
        public IHttpActionResult EditAttendance(DateModal dtm)
        {
            if (dtm.employeeId == Guid.Empty)
            {
                dtm.employeeId = Guid.Parse(GetUserId());
            }
            DateTime Date = DateTime.Parse(dtm.attendanceDate);
            //DateTime.Parse(dtm.monthStartDate);
            int? day = null;
            int year = Convert.ToDateTime(dtm.attendanceDate).Year;
            int month = Convert.ToDateTime(dtm.attendanceDate).Month;
            DataSet ds = AttendanceRepository.GetAttendance(dtm.employeeId, Convert.ToInt32(dtm.todayDay) == 0 ? day : Convert.ToInt32(dtm.todayDay), Date.Month, Date.Year);
            ds.Tables[0].TableName = "Attendance";
            DataTable dt = BindTotalTime(GetUserId(), dtm.attendanceDate);
            if (dt.Rows.Count > 0)
            {
                dt.TableName = "TotalHours";
                ds.Tables.Add(dt.Copy());
            }
            DataTable Results = ds.Tables[0];
            var query = Results.AsEnumerable().Select(Result => new
            {
                Attendance = Result.Field<decimal>("Attendance"),
                AttendanceId = Result.Field<Guid?>("AttendanceId"),
                Date = Result.Field<DateTime>("Date").ToString("MM-dd-yyyy"),
                DayDescription = Result.Field<string>("DayDescription"),
                EmployeeId = Result.Field<Guid>("EmployeeId"),
                InTime = Result.Field<DateTime?>("InTime"),
                IsWorkFromHome = Result.Field<Boolean>("IsWorkFromHome"),
                OutTime = Result.Field<DateTime?>("OutTime"),
                Remarks = Result.Field<string>("Remarks"),
                TotalTime = Result.Field<string>("TotalTime"),
                Type = Result.Field<string>("Type"),
                //id = Result.Field<string>("id"),
                //internalId=Result.Field<string>("internalId")
            });

            var singleresult= query.Where(m => m.EmployeeId == dtm.employeeId && m.Date == dtm.attendanceDate);

            return Ok(singleresult);
        }

        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("Attendance/UpdateAttendance")]
        public IHttpActionResult  UpdateAttendance(DateModal  dtm)
        {
            try
            {
                long result;
                bool isWorkfromHome = false;
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                dynamic attendanceObj = serializer.Deserialize<object>(dtm.attendanceJsonObj);
                string attendanceId = attendanceObj["attendanceId"];
                string employeeId = attendanceObj["employeeId"];
                string type = attendanceObj["type"];
                if (attendanceObj["outTime"] == "0")
                {
                    attendanceObj["outTime"] = "";
                }
                if (attendanceObj["inTime"] == "0")
                {
                    attendanceObj["inTime"] = "";
                }
                double? attendanceMark = null;
                string inTime = null, outTime = null;
                DateTime? inTimeDate, outTimeDate;
                int? WorkFromHomeTotalTime = null;
                inTimeDate = new DateTime();
                outTimeDate = new DateTime();
                DateTime attendanceDate = DateTime.Parse(attendanceObj["attendanceDate"]);
                int attendanceType = Convert.ToInt32(attendanceObj["attendanceType"]);
                if (type == "H" || type == "O")
                {
                    return null;
                }
                //make In Time
                if (!string.IsNullOrWhiteSpace(attendanceObj["inTime"]))
                {
                 
                    inTime = attendanceObj["attendanceDate"] + " " + attendanceObj["inTime"];
                    inTimeDate = DateTime.ParseExact(inTime, "yyyy-MM-dd HH:mm", null);
                }
                else
                {
                    inTimeDate = null;
                }
                //make Out Time
                if (!string.IsNullOrWhiteSpace(attendanceObj["outTime"]))
                {
                    
                    outTime = attendanceObj["attendanceDate"] + " " + attendanceObj["outTime"];
                    outTimeDate = DateTime.ParseExact(outTime, "yyyy-MM-dd HH:mm", null);
                }
                else
                {
                    outTimeDate = null;
                }

                if (attendanceType == 0)
                {
                    attendanceMark = 0;
                }
                else if (attendanceType == 1)
                {
                    attendanceMark = 0.5;
                }
                else
                {
                    attendanceMark = 1.0;
                }

                if (attendanceObj["isWorkFromHome"] == true)
                {
                    isWorkfromHome = true;
                    if (attendanceObj["duration"] != "")
                    {
                        string durationTimeMinute = attendanceObj["inTime"].ToString();
                        var duration = durationTimeMinute.Split(':');
                        WorkFromHomeTotalTime = Convert.ToInt32(duration[0]) * 60 + Convert.ToInt32(duration[1]);
                    }
                }
                else
                {
                    isWorkfromHome = false;
                }

                if (attendanceId == "")
                {
                    string empId = attendanceObj["employeeId"];
                    result = AttendanceRepository.InsertAttendance(Guid.Parse(empId ?? GetUserId().ToString()), attendanceDate, inTimeDate, outTimeDate, (decimal?)attendanceMark,
                    isWorkfromHome ? true : false, WorkFromHomeTotalTime, !string.IsNullOrWhiteSpace(attendanceObj["remarks"]) ? attendanceObj["remarks"] : null);
                }
                else
                {
                    result = AttendanceRepository.UpdateAttendance(Guid.Parse(attendanceId), attendanceDate, inTimeDate, outTimeDate, (decimal?)attendanceMark,
                    isWorkfromHome ? true : false, WorkFromHomeTotalTime, !string.IsNullOrWhiteSpace(attendanceObj["remarks"]) ? attendanceObj["remarks"] : null);
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("Attendance/DeleteAttendance")]
        public long DeleteAttendance(DateModal dmt)
        {
            long result;
            if (dmt.attendanceId.ToString() == "")
            {
                result = 0;
            }
            else
            {
                string AttedanceId =dmt.attendanceId.ToString();
                result = AttendanceRepository.DeleteAttendance(Guid.Parse(AttedanceId));
            }
            return result;
        }
        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("Attendance/GetAttendanceReport")]
        public IHttpActionResult GetAttendanceReport(DateModal modal)
        {
            DateTime startDate = Convert.ToDateTime(modal.monthStartDate);
            DataSet ds = AttendanceRepository.GetAttendanceReport(startDate);
             ds.Tables[0].TableName = "Attendance";
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
    }   
}
