import combineSectionReducers from 'combine-section-reducers';
import dashboardData from './dashboard/dashboardReducer';
import attendanceReducer from '../reducers/attendance';
import dashboardReducer  from '../store/dashboard/dashboardReducer'
import {LeaveReducers,empLeaveReducers,empeditReducers,empeIdReducers} from '../reducers/leaveReducers'
import {employeeDataReducres} from '../reducers/employees/attendance'
import {adminDataReducers} from '../reducers/admin/adminReducers'




const allReducer =
    combineSectionReducers({
        dashboardData: dashboardData,
        attendance: attendanceReducer,
        employeeAttedanceSummary:dashboardReducer,
        leaveData:LeaveReducers,
        leaveinfo:empLeaveReducers,
        editLeave:empeditReducers,
        empId:empeIdReducers,
        employeeData:employeeDataReducres ,
        adminData:adminDataReducers
    })


export default allReducer;