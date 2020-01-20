using Insight.Portal.Services.DataRepository;
using Insight.Portal.Services.Models;
using System;
using System.Collections.Generic;
using System.Data;

namespace Insight.Portal.Services.Snapshots
{
    public class DatabaseSnapshots<T>
    {
        private static Dictionary<string, CachedData<T>> _databaseCachedData = new Dictionary<string, CachedData<T>>();

        private static void Set(string tableName, CachedData<T> cachedData)
        {

            if (_databaseCachedData.ContainsKey(tableName))
            {
                _databaseCachedData[tableName] = cachedData;
            }
            else
            {
                _databaseCachedData.Add(tableName, cachedData);
            }
        }

        public static CachedData<T> Get(string tableName)
        {

            if (_databaseCachedData.ContainsKey(tableName))
            {
                return _databaseCachedData[tableName];
            }

            return new CachedData<T> { List = new List<T>(), TimeStamp = DateTime.UtcNow };
        }

        public static void Refresh(string tables = "")
        {
            DataSet ds = EmployeeRepository.GetDataBaseSnapshot(tables);

            var tableCount = ds.Tables.Count;
            if (tableCount > 0)
            {
                DataTable metaTable = ds.Tables[tableCount - 1];
                for (int i = 0; i < metaTable.Rows.Count; i++)
                {
                    switch (metaTable.Rows[i][0].ToString())
                    {
                        case "Employee":
                            List<Models.EmployeeModel> employees = Services.Models.Utils.Table.ToClassList<Models.EmployeeModel>(ds.Tables[i]);
                            DatabaseSnapshots<Models.EmployeeModel>.Set("Employee", new CachedData<Models.EmployeeModel> { List = employees, TimeStamp = DateTime.UtcNow });
                            break;
                        case "Holiday":
                            List<Models.HolidayModel> holidays = Services.Models.Utils.Table.ToClassList<Models.HolidayModel>(ds.Tables[i]);
                            DatabaseSnapshots<Models.HolidayModel>.Set("Holiday", new CachedData<Models.HolidayModel> { List = holidays, TimeStamp = DateTime.UtcNow });
                            break;
                        case "Leave":
                            List<Models.LeaveModel> leaves = Services.Models.Utils.Table.ToClassList<Models.LeaveModel>(ds.Tables[i]);
                            DatabaseSnapshots<Models.LeaveModel>.Set("Leave", new CachedData<Models.LeaveModel> { List = leaves, TimeStamp = DateTime.UtcNow });
                            break;
                        case "Attendance":
                            List<Models.AttendanceModel> attendance = Services.Models.Utils.Table.ToClassList<Models.AttendanceModel>(ds.Tables[i]);
                            DatabaseSnapshots<Models.AttendanceModel>.Set("Attendance", new CachedData<Models.AttendanceModel> { List = attendance, TimeStamp = DateTime.UtcNow });
                            break;
                        case "User":
                            List<Models.EditUserViewModel> user = Services.Models.Utils.Table.ToClassList<Models.EditUserViewModel>(ds.Tables[i]);
                            DatabaseSnapshots<Models.EditUserViewModel>.Set("User", new CachedData<Models.EditUserViewModel> { List = user, TimeStamp = DateTime.UtcNow });
                            break;
                        default: break;
                    }
                }
            }
        }
    }
}
