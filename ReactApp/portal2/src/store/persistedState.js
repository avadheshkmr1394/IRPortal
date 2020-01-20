export const attendance = {
    inTime: null,
    outTime: null,
    isLoading: true
}

export const dashboardData = {
    isLoading: true,
    calendar: [],
    incompleteAttendance: [],
    employeeAttedanceSummary: [],
    userRole: '',
    employeeId: ''
};

export const adminData = {
    adminUsers: [],
    attendanceReport: [],
    employeeLeaveReport: [],
    taxSavingType: [],
    mapEmployeeRecords: [],
    userContainerPermission:[],
    containers: [],
    isLoading: true
};
export const employeeData = {

    users: [],
    role: [],
    employeesAttendance: [],
    totalHours: [],
    todayAttendanceDate: [],
    employeeLeaves: [],
    leaveRecord: [],
    holidays: [],
    workLogs: [],
    allProjects: [],
    allTasks: [],
    taxSaving: [],
    taxSavingTypes: [],
    getEmployeeData: [],
    employeeLeaveCount: [],
    data: [],
    editEmp: [],
    employeeId: '',
    year: '',
    isLoading: true
}


const PersistedState = {
    attendance: attendance,
    dashboardData: dashboardData,
    adminData: adminData,
    employeeData: employeeData
}

export default PersistedState;