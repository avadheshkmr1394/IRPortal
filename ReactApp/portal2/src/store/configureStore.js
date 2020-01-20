import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import sequenceAction from 'redux-sequence-action';
import AppConfig from '../appConfig';
import allReducers from './reducers';
import persistedState from './persistedState';
import { getDashboardData } from '../actions/dashboardActions';
import { getLeaveData, getEmployeeData, employeeLeaveCount } from '../actions/leaveAction';
import { getTodayAttendanceTime, getEmployeeLeaves, getHolidays } from '../actions/employeeActions';
import { getUsers, getEmployeesAttendance } from '../actions/attendanceAction'
import { getFormattedTiming } from '../common/utils';
import { getContainers } from '../actions/adminAction'
import { getUserContainerPermission } from '../actions/adminAction'


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
    store.dispatch(getDashboardData())
    store.dispatch(getLeaveData());
    store.dispatch(getEmployeeData())
    store.dispatch(employeeLeaveCount())
    store.dispatch(getUsers())
    store.dispatch(getEmployeesAttendance());
    store.dispatch(getTodayAttendanceTime(getFormattedTiming(new Date())))
    store.dispatch(getUserContainerPermission())
    store.dispatch(getEmployeeLeaves({ year: (new Date()).getFullYear() }))
    store.dispatch(getHolidays())
    store.dispatch(getContainers())
    return store;
};

export default configureStore;
