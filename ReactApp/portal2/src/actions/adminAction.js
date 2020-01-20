import { GET_ADMIN_USERS, UPDATE_USER, GET_CONTAINERS, GET_USER_CONTAINER_PERMISSION } from '../actions/actionTypes'
import { getAxios, postAxios } from '../actions/axiosActions'



export const getAdminUser = (params) => {
    params = { callTime: new Date() };
    const url = 'Account/getUser';
    const request = getAxios(url, { params: params })
    return {
        type: GET_ADMIN_USERS,
        payload: request
    }
}
export const registerUser = (params) => {
    if (params == null) {
        params = { callTime: new Date() };
    }
    const url = 'Account/Register';
    const request = postAxios(url, { params: params })
    return request;
}
export const editUser = (params) => {
    if (params == null) {
        params = { callTime: new Date() };
    }
    const url = 'Account/Edit';
    const request = postAxios(url, { params: params })
    return request;
}
export const updateUser = (params) => {
    if (params == null) {
        params = { callTime: new Date() };
    }
    const url = 'Account/Update';
    const request = postAxios(url, { params: params });
    return {
        type: UPDATE_USER,
        payload: request
    }
}
export const resetPassword = (params) => {
    if (params == null) {
        params = { callTime: new Date() };
    }
    const url = 'Account/ResetPassword';
    const request = postAxios(url, { params: params });
    return request;
}
export const passwordConfirmed = (params) => {
    if (params == null) {
        params = { callTime: new Date() };
    }
    const url = 'Account/ResetPasswordConfirmed';
    const request = postAxios(url, { params: params }).then(res => {
        console.log(res)
    });
    return request;
}
export const userRoles = (params) => {
    if (params == null) {
        params = { callTime: new Date() };
    }
    const url = 'Account/UserRoles';
    const request = postAxios(url, { params: params });
    return request;
}
export const userRolesConfirmed = (params) => {
    if (params == null) {
        params = { callTime: new Date() };
    }
    const url = 'Account/UserRolesConfirmed';
    const request = postAxios(url, { params: params }).then(res => {
        console.log(res);
    });
    return request;
}
export const deleteUser = (params) => {
    if (params == null) {
        params = { callTime: new Date() };
    }
    const url = 'Account/Delete';
    const request = postAxios(url, { params: params });
    return request;
}
export const deleteUserConfirmed = (params) => {
    if (params == null) {
        params = { callTime: new Date() };
    }
    const url = 'Account/DeleteConfirmed';
    const request = postAxios(url, { params: params }).then(res => {
        console.log(res);
    });
    return request;
}
export const editEmployee = (params) => {

    if (params == null) {
        params = { callTime: new Date() };
    }
    const url = 'Employee/EditEmployee'
    const request = postAxios(url, { params: params });
    return request;
}
export const createEmployee = (params) => {
    if (params == null) {
        params = { callTime: new Date() };
    }
    const url = 'Employee/CreateEmployee'
    const request = postAxios(url, { params: params })
    return request;
}

export const getForMapUser = (params) => {
    if (params == null) {
        params = { callTime: new Date() };
    }
    const url = 'Employee/GetMapEmpUser';
    const request = getAxios(url, { params: params });
    return request;
}

export const getContainers = (params) => {
    return dispatch => {
        if (params == null) {
            params = { callTime: new Date() };
        }
        const url = 'Files/GetContainers'
        const request = getAxios(url, { params: params });
        return [
            dispatch(
                { type: GET_CONTAINERS, payload: request })
        ]
    }
}

export const getUserContainerPermission = (params) => {

    return dispatch => {
        if (params == null) {
            params = { callTime: new Date() };
        }
        const url = 'Files/GetUserContainerPermission'
        const request = postAxios(url, { params: params });
        return [
            dispatch(
                {
                    type: GET_USER_CONTAINER_PERMISSION,
                    payload: request
                }
            )
        ]
    }
}

export const checkUncheckCheckbox = (params) => {
    if (params == null) {
        params = { callTime: new Date() };
    }
    const url = 'Files/CheckUncheckCheckbox';
    const request = postAxios(url, { params: params });
    return {
        type: GET_USER_CONTAINER_PERMISSION,
        payload: request
    }
}

export const saveContainer = (params) => {
    if (params == null) {
        params = { callTime: new Date() };
    }
    const url = 'Files/SaveContainer';
    const request = postAxios(url, { params: params });
    return request;
}

export const editContainer = (params) => {
    if (params == null) {
        params = { callTime: new Date() };
    }
    const url = 'Files/EditContainer';
    const request = postAxios(url, { params: params });
    return request;
}


export const deleteContainer = (params) => {
    if (params == null) {
        params = { callTime: new Date() };
    }
    const url = 'Files/DeleteContainer';
    const request = postAxios(url, { params: params });
    return request;
}

export const savePermission = (params) => {
    if (params == null) {
        params = { callTime: new Date() };
    }
    const url = 'Files/SavePermission';
    const request = postAxios(url, { params: params });
    return request;
}







