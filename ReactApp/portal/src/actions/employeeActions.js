import { getAxios, postAxios } from './axiosActions';
import { GET_TODAY_ATTENDANCE_TIME, GET_HOLIDAY,GET_EMP_LEAVES,GET_BINDING_LEAVE_RECORDS,GET_BIND_WORKLOG,GET_ALL_PROJECTS,GET_ALL_TASKS,GET_INSERT_WORKLOG,GET_TAXSAVING_RECEIPT,GET_TAXSAVING_TYPES } from './actionTypes';
import moment from 'moment';
import { getFormattedTiming } from '../common/utils';


export const getTodayeAttendanceTime = (finalDate) => {
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
        type: 'INSERT_IN_OUT_TIME',
        payload: request
    },
    (dispatch) => {
        dispatch(getTodayeAttendanceTime(getFormattedTiming(new Date())));
    }]
};
export const getEmpLeaves = (params) => {

    let url = 'Employee/GetEmpLeaves'
    const request = postAxios(url, { params: params });
    return {
        type: GET_EMP_LEAVES,
        payload: request
    }
}
export const bindingLeaveRecord = (params) => {
    params = { callTime: new Date() };
    let url = 'Employee/BindingLeaveRecordGrid'
    const request = postAxios(url, { params: params });
    return {
        type: GET_BINDING_LEAVE_RECORDS,
        payload: request
    }
}

export const getholidays = (params) => {
    params = { callTime: new Date() };
    let url = 'Employee/GetHoliday'
    const request = getAxios(url, { params: params })
    return {
        type: GET_HOLIDAY,
        payload: request
    }
}
export const bindWorklogs = (params) => {

    // params = { callTime: new Date() };
    const url = 'WorkLog/BindWorklogs'
    const request = postAxios(url, { params: params })
    return {
        type: GET_BIND_WORKLOG,
        payload: request
    }
}
export const getAllProjects = (params) => {
    //  params = { callTime: new Date() };
    const url = 'WorkLog/GetAllProjects';
    const request = postAxios(url, { params: params });
    return {
        type: GET_ALL_PROJECTS,
        payload: request
    }
}
export const getAllTasksForCombo = (params) => {
    // params = { callTime: new Date() };
    const url = "WorkLog/GetAllTasksForCombo";
    const request = postAxios(url, { params: params });
    return {
        type: GET_ALL_TASKS,
        payload: request
    }
}
export const insertWorkLog = (params) => {
    const url = 'WorkLog/InsertWorkLog';
    params.WorkDateFrom = moment(new Date(params.WorkDateFrom)).format('YYYY-MM-DD')
    params.WorkDateTo = moment(new Date(params.WorkDateTo)).format('YYYY-MM-DD')
    const request = postAxios(url, { params: params });
    return {
        type: GET_INSERT_WORKLOG,
        payload: request
    }
}
export const getTaxSavingReceipt = (params) => {
    const url = 'TaxSavings/GetTaxSavingReceipt'
    const request = postAxios(url, { params: params });
    return {
        type: GET_TAXSAVING_RECEIPT,
        payload: request
    }
}
export const getSavingTypes = (params) => {
    params = { callTime: new Date() };
    const url = 'TaxSavings/GetSavingTypes'
    const request = getAxios(url, { params: params });
    return {
        type: GET_TAXSAVING_TYPES,
        payload: request
    }
}
export const insertTaxSavingReceipt = (params) => {
    let url = '';
    if (params.taxSavingId == "") {
        url = 'TaxSavings/InsertTaxSavingReceipt'
    }
    else {
        url = 'TaxSavings/UpdateTaxSavingReceipt'
    }
    const request = postAxios(url, { params: params });
    return request;
}
export const editTaxSaving = (params) => {
    const url = 'TaxSavings/EditTaxSaving'
    const request = postAxios(url, { params: params });
    return request;
}
export const deleteTaxSaving = (params) => {
    
    const url = 'TaxSavings/DeleteTaxSavingReceipt'
    const request = postAxios(url, { params: params });
    return request;
}
export const copyPriviousReciept = (params) => {
    const url = 'TaxSavings/CopyPriviousReciept'
    const request = postAxios(url, { params: params })
    return request;
}

export const taxSavingExcelExport = (params) => {
    const url = 'TaxSavings/ExcelExport'
    const request = postAxios(url, { params: params })
    return request;
}
export const approveTaxSavingReceipt = (params) => {
    const url = 'TaxSavings/ApproveTaxSavingReceipt'
    const request = postAxios(url, { params: params })
    return request;
}







