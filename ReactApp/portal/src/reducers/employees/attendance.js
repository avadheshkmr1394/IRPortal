import { GET_USER,GET_EMPLOYEE_ATTENDANCE,GET_TODAY_ATTENDANCE_TIME,GET_EMP_LEAVES,GET_BINDING_LEAVE_RECORDS,GET_HOLIDAY,GET_BIND_WORKLOG,GET_ALL_PROJECTS,GET_ALL_TASKS,GET_TAXSAVING_RECEIPT,GET_TAXSAVING_TYPES } from '../../actions/actionTypes'
import update from 'immutability-helper';



export const employeeDataReducres = (state = [], action) => {
    switch (action.type) {
        case GET_USER: {
            if (action.payload && action.payload.data) {
                return update(state, {
                    users: {
                        $set: (
                            action.payload.data ? action.payload.data : []
                        )
                    },
                    isLoading: { $set: false },
                })
            }
            else {
                return update(state, {
                    isLoading: { $set: false }
                })
            }
        }
        case GET_EMPLOYEE_ATTENDANCE: {
            if (action.payload && action.payload.data) {
                return update(state, {
                    employeesAttendance: {
                        $set: (
                            action.payload.data.Attendance ? action.payload.data.Attendance : []
                        )
                    },
                    totalHours: {
                        $set: (
                            action.payload.data.TotalHours ? action.payload.data.TotalHours : []
                        )
                    },
                    isLoading: { $set: false },
                })
            }
            else {
                return update(state, {
                    isLoading: { $set: false }
                })
            }
        }
        case GET_TODAY_ATTENDANCE_TIME: {
            if (action.payload && action.payload.data) {
                return update(state, {
                    todayAttendanceDate: {
                        $set: (
                            action.payload.data ? action.payload.data : ''
                        )
                    },
                    isLoading: { $set: false },
                })
            }
            else {
                return update(state, {
                    isLoading: { $set: false }
                })
            }
        }
        case GET_EMP_LEAVES: {

            if (action.payload && action.payload.data) {
                return update(state, {
                    employeeLeaves: {
                        $set: (
                            action.payload.data ? action.payload.data : []
                        )
                    },
                    isLoading: { $set: false },
                })
            }
            else {
                return update(state, {
                    isLoading: { $set: false }
                })
            }
        }
        case GET_BINDING_LEAVE_RECORDS: {

            if (action.payload && action.payload.data) {
                return update(state, {
                    leaveRecord: {
                        $set: (
                            action.payload.data ? action.payload.data : []
                        )
                    },
                    isLoading: { $set: false },
                })
            }
            else {
                return update(state, {
                    isLoading: { $set: false }
                })
            }
        }
        case GET_HOLIDAY: {

            if (action.payload && action.payload.data) {
                return update(state, {
                    holidays: {
                        $set: (
                            action.payload.data ? action.payload.data : []
                        )
                    },
                    isLoading: { $set: false },
                })
            }
            else {
                return update(state, {
                    isLoading: { $set: false }
                })
            }
        }
        case GET_BIND_WORKLOG: {
            if (action.payload && action.payload.data) {
                return update(state, {
                    workLogs: {
                        $set: (
                            action.payload.data ? action.payload.data : []
                        )
                    },
                    isLoading: { $set: false },
                })
            }
            else {
                return update(state, {
                    isLoading: { $set: false }
                })
            }
        }
        case GET_ALL_PROJECTS: {
            if (action.payload && action.payload.data) {
                return update(state, {
                    allProjects: {
                        $set: (
                            action.payload.data ? action.payload.data : []
                        )
                    },
                    isLoading: { $set: false },
                })
            }
            else {
                return update(state, {
                    isLoading: { $set: false }
                })
            }
        }
        case GET_ALL_TASKS: {
            if (action.payload && action.payload.data) {
                return update(state, {
                    allTasks: {
                        $set: (
                            action.payload.data ? action.payload.data : []
                        )
                    },
                    isLoading: { $set: false },
                })
            }
            else {
                return update(state, {
                    isLoading: { $set: false }
                })
            }
        }
        case GET_TAXSAVING_RECEIPT: {
            if (action.payload && action.payload.data) {
                return update(state, {
                    taxSaving: {
                        $set: (
                            action.payload.data ? action.payload.data : []
                        )
                    },
                    isLoading: { $set: false }
                })
            }
            else {
                return update(state, {
                    isLoading: { $set: false }
                })
            }
        }
        case GET_TAXSAVING_TYPES: {
            if (action.payload && action.payload.data) {
                return update(state, {
                    taxSavingTypes: {
                        $set: (
                            action.payload.data ? action.payload.data : []
                        )
                    },
                    isLoading: { $set: false }
                })
            }
            else {
                return update(state, {
                    isLoading: { $set: false }
                })
            }
        }
        default:
            return state;
    }


}


