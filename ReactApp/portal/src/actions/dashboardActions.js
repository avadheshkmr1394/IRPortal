import { getAxios} from './axiosActions';
import { GET_DASHBOARD_DATA } from './actionTypes';

export const getDashboardData = () => {
    let params = { callTime: new Date() };
    const url = 'Dashboard/GetDashboardData';
    const request = getAxios(url, { params: params });
    return {
        type: GET_DASHBOARD_DATA,
        payload: request
    }
};