import { postAxios } from './axiosActions';
import { GET_LEAVE_DATA,EMPLOYEE_LEAVE_COUNT,GET_EMPLOYEE_DATA,EDIT_LEAVE_DATA,GET_EMPLOYEE_ID } from './actionTypes';



export const getLeaveData = (params) => {

    if (params == null) {
        params = { callTime: new Date() };
    }
    const url = 'Employee/GetEmployeeLeaves';
    const request = postAxios(url, { params: params });
    return {
        type: GET_LEAVE_DATA,
        payload: request
    }
};
export const getLeaveDataById = (params) => {
    if (params == null) {
        params = { callTime: new Date() };
    }
    const url = 'Employee/GetEmployeeLeavesById';
    const request = postAxios(url, { params: params });
    return {
        type: GET_LEAVE_DATA,
        payload: request
    }
};
const dateFormat = (date) => {

       var date = new Date(date),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
}
export const insertLeave = async (params) => {
    params.leaveFromDate = dateFormat(params.leaveFromDate)
    params.leaveToDate = dateFormat(params.leaveToDate)
    const url = 'Employee/InsertEmployeeLeave';
    const request = await postAxios(url, { params: params }).then(function (response) {
        // if (response.data = "ok") {
        //     alert("Leave Applied Successfully")
        // }
    })
        .catch(function (response) {
            console.log(response);
        });
    return request
};
export const editLeave = async (params) => {
    if (params == null) {
        params = { callTime: new Date() };
    }
    params.leavedate = dateFormat(params.leavedate)
    const url = 'Employee/editEmployeeLeaves';
    const request = await postAxios(url, { params: params }).then((response) => {

        return response.data;
    })
    return request;
}
export const deleteLeave = async (params) => {

    if (params == null) {
        params = { callTime: new Date() };
    }
    const url = 'Employee/deleteEmployeeLeave';
    const request = await postAxios(url, { params: params });
    return {
        type: GET_LEAVE_DATA,
        payload: request
    }
}
export const getEmployeeData = async (params) => {
    if (params == null) {
        params = { callTime: new Date() };
    }
    const url = 'Employee/GetEmployeeData';
    const request = await postAxios(url, { params: params });
    return {
        type: GET_EMPLOYEE_DATA,
        payload: request
    }
}
export const employeeLeaveCount = async (params) => {

    if (params == null) {
        params = { callTime: new Date() };
    }
    const url = 'Employee/EmployeeLeaveCount';
    const request = await postAxios(url, { params: params });
    return {
        type: EMPLOYEE_LEAVE_COUNT,
        payload: request
    }
}
export const approveEmployeeLeave = async (params) => {

    if (params == null) {
        params = { callTime: new Date() };
    }
    const url = 'Employee/ApproveEmployeeLeave';
    const request = await postAxios(url, { params: params });
    return request;
}
export const editLeaveDataMap = (request) => {
    return {
        type: EDIT_LEAVE_DATA,
        payload: request
    }
}
export const getUpdateEmpId = (request) => {

    return {
        type: GET_EMPLOYEE_ID,
        payload: request
    }
}
export const getUpdateEmpYear = (request) => {
    return {
        type: 'GET_EMPLOYEE_YEAR',
        payload: request
    }
}

