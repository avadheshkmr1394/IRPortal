
import { GET_ADMIN_USERS, GET_ATTENDANCE_REPORT, GET_LEAVE_REPORT, GET_ALLTAXSAVING_TYPES, GET_MAP_EMPLOYEE, GET_CONTAINERS, GET_USER_CONTAINER_PERMISSION } from '../../actions/actionTypes'
import update from 'immutability-helper';

export const adminReducer = (state = [], action) => {
    switch (action.type) {
        case GET_ADMIN_USERS: {
            if (action.payload && action.payload.data) {
                return update(state, {
                    adminUsers: {
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
        case GET_ATTENDANCE_REPORT: {
            if (action.payload && action.payload.data) {
                return update(state, {
                    attendanceReport: {
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
        case GET_LEAVE_REPORT: {
            if (action.payload && action.payload.data) {
                return update(state, {
                    employeeLeaveReport: {
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
        case GET_ALLTAXSAVING_TYPES: {
            if (action.payload && action.payload.data) {
                return update(state, {
                    taxSavingType: {
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
        case GET_MAP_EMPLOYEE: {
            if (action.payload && action.payload.data) {
                return update(state, {
                    mapEmployeeRecords: {
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
        case GET_CONTAINERS: {
            if (action.payload && action.payload.data) {
                return update(state, {
                    containers: {
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
        case GET_USER_CONTAINER_PERMISSION: {
            if (action.payload && action.payload.data) {
                return update(state, {
                    userContainerPermission: {
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
        default:
            return state;
    }


}