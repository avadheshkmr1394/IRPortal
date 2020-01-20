import { GET_DASHBOARD_DATA } from '../../actions/actionTypes';
import update from 'immutability-helper';

const dashboardReducer = (state = [], action) => {
    switch (action.type) {

        case GET_DASHBOARD_DATA:
            if (action.payload && action.payload.data) {
                return update(state, {
                    calendar: {
                        $set: (
                            action.payload.data.CalendarList ? action.payload.data.CalendarList : []
                        )
                    },
                    incompleteAttendance: {
                        $set: (
                            action.payload.data.IncomplteAttendanceList ? action.payload.data.IncomplteAttendanceList : []
                        )
                    },
                    employeeAttedanceSummary: {
                        $set: (
                            action.payload.data.EmployeeAttedanceSummary ? action.payload.data.EmployeeAttedanceSummary : []
                        )
                    },
                    userRole: {
                        $set: (
                            action.payload.data.UserRole ? action.payload.data.UserRole : []
                        )
                    },
                    employeeId: {
                        $set: (
                            action.payload.data.EmployeeId ? action.payload.data.EmployeeId : []
                        )
                    },

                    isLoading: { $set: false },
                });
            } else {
               
                return update(state, {
                    isLoading: { $set: false },
                });
            }
        default:
            return state;
    }
}

export default dashboardReducer;
