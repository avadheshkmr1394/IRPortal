import { GET_LEAVE_DATA,EDIT_LEAVE_DATA,GET_EMPLOYEE_DATA,EMPLOYEE_LEAVE_COUNT,GET_EMPLOYEE_ID } from '../actions/actionTypes';
import update from 'immutability-helper';


export const LeaveReducers = (state = [], action) => {
    switch (action.type) {
        case GET_LEAVE_DATA:
            if (action.payload && action.payload.data) {
                return update(state, {
                    data: {
                        $set: (
                            action.payload.data
                        )
                    },
                    isLoading: { $set: false },
                });
            }
            else {
                return update(state, {
                    isLoading: { $set: false },
                });
            }
        default:
            return state;
    }
}
export const empLeaveReducers = (state = [], action) => {
    switch (action.type) {
        case GET_EMPLOYEE_DATA:
            if (action.payload && action.payload.data) {
                return update(state, {
                    getEmployeeData: {
                        $set: (
                            action.payload.data
                        )
                    },
                    isLoading: { $set: false },
                })
            }
            else {
                return update(state, {
                    isLoading: { $set: false },
                });
            }
        case EMPLOYEE_LEAVE_COUNT:
            if (action.payload && action.payload.data) {
                return update(state, {
                    employeeLeaveCount: {
                        $set: (
                            action.payload.data
                        )
                    },
                    isLoading: { $set: false },
                })
            }
            else {
                return update(state, {
                    isLoading: { $set: false },
                });
            }
        default:
            return state;
    }
}
export const empeditReducers = (state = [], action) => {
    switch (action.type) {
        case EDIT_LEAVE_DATA:
            if (action.payload) {
                return update(state, {
                    editEmp: {
                        $set: (
                            action.payload
                        )
                    },
                    isLoading: { $set: false },
                })
            }
            else {
                return update(state, {
                    isLoading: { $set: false },
                });
            }
        default:
            return state;
    }
}
export const empeIdReducers = (state = [], action) => {
    switch (action.type) {
        case GET_EMPLOYEE_ID:
            if (action.payload) {
                return update(state, {
                    employeeId: {
                        $set: (
                            action.payload
                        )
                    },
                    isLoading: { $set: false },
                })
            }
            else {
                return update(state, {
                    isLoading: { $set: false },
                });
            }
        case 'GET_EMPLOYEE_YEAR':
            if (action.payload) {
                return update(state, {
                    year: {
                        $set: (
                            action.payload
                        )
                    },
                    isLoading: { $set: false },
                })
            }
            else {
                return update(state, {
                    isLoading: { $set: false },
                });
            }
        default:
            return state;
    }
}






