import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import sequenceAction from 'redux-sequence-action';
import AppConfig from '../appConfig';
import allReducers from './reducers';
import { getDashboardData } from '../actions/dashboardActions';
import { getLeaveData,getEmployeeData,employeeLeaveCount } from '../actions/leaveAction';
import { getTodayeAttendanceTime,getEmpLeaves,getholidays } from '../actions/employeeActions';
import { getUsers,getEmployeesAttendance } from '../actions/attendanceAction'
import { getFormattedTiming } from '../common/utils';






const persistedState = {
    attendance: {
        inTime: null,
        outTime: null,
        isLoading: true
    },
    dashboardData: {
        calendar: [],
        incompleteAttendance: [],
        employeeAttedanceSummary: [],
        userRole: '',
        EmployeeId: '',
        isLoading: true
    },
    leaveinfo: {
        getEmployeeData: [],
        employeeLeaveCount: [],
        isLoading: true
    },
    leavedata: {
        data: [],
        isLoading: true
    },
    editLeave: {
        editEmp: [],
        isLoading: true
    },
    empId: {
        employeeId: '',
        year: ''
    },
    employeeData: {
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
        isLoading: true
    },
    adminData:{
        adminUsers:[],
        isLoading: true
    }
}


const logger = createLogger({
    // ...options
});


const configureStore = () => {
    //const logger = createLogger();
    var applyMiddlewareObj;
    if (AppConfig.reduxLogger) {
        applyMiddlewareObj = applyMiddleware(thunk, promise, logger, sequenceAction);
    } else {
        applyMiddlewareObj = applyMiddleware(thunk, promise, sequenceAction);
    }
    const store =
        createStore(
            allReducers,
            persistedState,
            applyMiddlewareObj
        );

    //Load timeStamps first then idea related entities
    store.dispatch(getDashboardData())
    store.dispatch(getLeaveData());
    store.dispatch(getEmployeeData())
    store.dispatch(employeeLeaveCount())
    store.dispatch(getUsers())
    store.dispatch(getEmployeesAttendance());
    store.dispatch(getTodayeAttendanceTime(getFormattedTiming(new Date())))
    store.dispatch(getEmpLeaves({ year: (new Date()).getFullYear() }))
    store.dispatch(getholidays())
    return store;
};

export default configureStore;
