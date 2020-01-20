import combineSectionReducers from 'combine-section-reducers';
import dashboardReducer from '../store/dashboard/dashboardReducer'
import { employeeReducer } from '../store/employees/employeesReducer'
import { adminReducer } from '../store/admin/adminReducer'
import  attendanceReducer  from '../store/attendance'

const allReducer =
    combineSectionReducers({
        attendance: attendanceReducer,
        dashboardData: dashboardReducer,
        employeeData: employeeReducer,
        adminData: adminReducer
    })


export default allReducer;
