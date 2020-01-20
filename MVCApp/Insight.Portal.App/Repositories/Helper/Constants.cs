using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Insight.Portal.App.Repositories.Helper
{
    public static class Constants
    {
        //Portal
        public static string APPLICATION_NAME = "IR Portal";
        public static string ANALYTICS_PORTAL = "Analytics Portal";
        public static string ADMINISTRATION_PORTAL = "Administration";
        public static string DATA_PORTAL = "Data Portal";
        public static string PROJECT_PORTAL = "Project Portal";
        public static string EMPLOYEE_PORTAL = "Employee Portal";

        //Role
        public static string CLIENT_ADMINISTRATOR_ROLE = "Client Administrator";
        public static string CLIENT_DATA_USER_ROLE = "Client Data User";
        public static string CLIENT_USER_ROLE = "Client User";
        public static string IR_USER_ROLE = "IR User";
        public static string SYSTEM_ADMINISTRATOR_ROLE = "System Administrator";

        //General
        public static string USER = "User";
        public static string CLIENT = "Client";
        public static string EMAILTEMPLATE = "Email Template";
        public static string ACTIVATE = "Activate ";
        public static string DEACTIVATE = "Deactivate ";
        public static string MARK_AS_ACTIVE = "Mark as Active ";
        public static string MARK_AS_INACTIVE = "Mark as Inactive ";
        public static string PROJECT = "Project";

        // Entity type
        public static int ENTITY_TYPE_USER = 1;
        public static int ENTITY_TYPE_CLIENT = 2;
        public static int ENTITY_TYPE_DATA_REQUEST = 3;
        public static int ENTITY_TYPE_DATA_FILE = 4;
        public static int ENTITY_TYPE_DATA_TABLE = 5;
        public static int ENTITY_TYPE_DATA_COLUMN = 6;
        public static int ENTITY_TYPE_PROJECT = 7;
        public static int ENTITY_TYPE_DBSCRIPT = 8;
        public static int ENTITY_TYPE_QASTATUS = 109;
        public static int ENTITY_TYPE_JIRRAISSUE = 110;
        public static int ENTITY_TYPE_TASK = 11;

        //Tbl type
        public static int CATEGORY_TYPE_TASKTYPE = 102;
        public static int CATEGORY_TYPE_PRIORITYTYPE = 103;
        public static int CATEGORY_TYPE_RESOLUTIONTYPE = 104;
    }
}