import { getAxios, postAxios } from './axiosActions'
import { GET_USER, GET_EMPLOYEE_ATTENDANCE, INSERT_IN_OUT_TIME, GET_TODAY_ATTENDANCE_TIME, INSERT_EMPLOYEE_ATTENDANCE, DELETE_EMPLOYEE_ATTENDANCE, GET_ATTENDANCE_REPORT } from './actionTypes'
import { getFormattedTiming } from '../common/utils';


export const getUsers = () => {
    let params = { callTime: new Date() };
    const url = 'Attendance/GetUsers';
    const request = getAxios(url, { params: params });
    return {
        type: GET_USER,
        payload: request
    }
}
const dateFormat = (date) => {
    var date = new Date(date),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
    return [mnth, day, date.getFullYear()].join("-");
}
const currentDay = (date) => {
    var date = new Date(date),
        day = ("0" + date.getDate()).slice(-2);
    return day;
}
function startOfMonth(date) {
    var startdate = new Date(date.getFullYear(), date.getMonth(), 1);
    return dateFormat(startdate)
}
export const getEmployeesAttendance = (value) => {
    var dt;
    if (value == null || (new Date(value.date)).getMonth() == (new Date()).getMonth()) {
        dt = new Date();
    }
    else {
        dt = new Date(value.date);
    }
    let empid = '';
    if (value != null) {
        empid = value.employeeId
    }
    var monthfirstDate = startOfMonth(dt)
    var curday = currentDay(dt)
    const params = { employeeId: empid, monthStartDate: monthfirstDate, todayDay: curday }
    const url = 'Attendance/GetAttendance';
    const request = postAxios(url, { params: params });
    return {
        type: GET_EMPLOYEE_ATTENDANCE,
        payload: request
    }
}
export const getTodayAttendanceTime = (finalDate) => {

    let params = { callTime: new Date() };
    const url = 'Employee/GetTodayAttendanceTime?finalDate=' + finalDate;
    const request = getAxios(url, { params: params });
    return {
        type: GET_TODAY_ATTENDANCE_TIME,
        payload: request
    }
};
export const insertInOutTime = (isInTime, dateTime) => {
    let params = { dateTime: dateTime };
    let url = '';
    if (isInTime) {
        url = 'Employee/InsertInTime';
    } else {
        url = 'Employee/InsertOutTime';
    }
    const request = postAxios(url, { params: params });
    return [{
        type: INSERT_IN_OUT_TIME,
        payload: request
    }, (dispatch) => {
        dispatch(getTodayAttendanceTime(getFormattedTiming(new Date())));
    }]
}

export const editAttendanceById = (params) => {
    //  params = { callTime: new Date() };
    let url = 'Attendance/EditAttendance';
    const request = postAxios(url, { params: params })
    return request;
}


export const updateAttendance = (params) => {
    let url = 'Attendance/UpdateAttendance';
    const request = postAxios(url, { params: params })
    return {
        type: INSERT_EMPLOYEE_ATTENDANCE,
        payload: request
    }
}
export const deleteAttendance = (params) => {
    let url = 'Attendance/DeleteAttendance';
    const request = postAxios(url, { params: params })
    return {
        type: DELETE_EMPLOYEE_ATTENDANCE,
        payload: request
    }
}

export const GetAttendanceReport = (params) => {
    if (params == null) {
        params = { callTime: new Date() };
    }
    const url = 'Attendance/GetAttendanceReport'
    const request = postAxios(url, { params: params })
    return {
        type: GET_ATTENDANCE_REPORT,
        payload: request
    }
}


