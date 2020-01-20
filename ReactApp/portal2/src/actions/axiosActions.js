import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';
import AppConfig from '../appConfig';
import * as loghelper from '../common/loghelper';



const cache = setupCache({
    maxAge: 15 * 60 * 60 * 1000,
    exclude: {
        paths: [
            // /Controler\/Action$/,
        ]
    }
});

const api = axios.create({
    adapter: cache.adapter
});

api.interceptors.request.use(request => {
    if (AppConfig.axiosLogger) {
        loghelper.consoleTime('ajax ' + request.method);
    }
    return request;
});

api.interceptors.response.use(response => {
    if (AppConfig.axiosLogger) {
        loghelper.consoleTimeEnd('ajax ' + response.config.method);
    }
    return response;
});

export const getAxios = (url, axiosRequestConfig) => {
    axiosRequestConfig.headers = {
        userId: localStorage.getItem('userId') ? localStorage.getItem('userId') : AppConfig.env('userId'),
        BrowserSessionId: getCookie('BrowserSessionId'),
    };
    url = AppConfig.env('url') + url;
    var resp = axios({
        method: 'get',
        url: url,
        headers: axiosRequestConfig.headers,
        callTime: axiosRequestConfig.params.callTime,
    })
        .then(function (response) {
            return response;
        })
        .catch(function (response) {
            console.log(response);
        });
    return resp;
};

export const postAxios = (url, axiosRequestConfig) => {
    axiosRequestConfig.headers = {
        userId: localStorage.getItem('userId') ? localStorage.getItem('userId') : AppConfig.env('userId'),
        connectionId: sessionStorage.getItem('tabId') ? sessionStorage.getItem('tabId') : AppConfig.env('connectionId'),
        BrowserSessionId: getCookie('BrowserSessionId'),
        'TimeStart': getUtcDate().getTime(),
        'Url': url,
        'Step': 'DataCall',
        'IsWebService': '0',
        'elapsedTime': 0
    };
    url = AppConfig.env('url') + url;
    if (!axiosRequestConfig.params.callTime) {
        axiosRequestConfig.params = { ...axiosRequestConfig.params, callTime: new Date() }
    }
    var resp = axios({
        method: 'post',
        url: url,
        data: axiosRequestConfig.params,
        headers: axiosRequestConfig.headers,
        callTime: axiosRequestConfig.params.callTime,
    })
        .then(function (response) {
            return response;
        })
        .catch(function (response) {
            console.log(response);
        });
    return resp;
};

var getUtcDate = function () {
    var dt = new Date();
    return new Date(dt.getUTCFullYear(), dt.getUTCMonth(), dt.getUTCDate(), dt.getUTCHours(), dt.getUTCMinutes(), dt.getUTCSeconds(), dt.getUTCMilliseconds());
};

export const getCookie = (c_name) => {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + "=");
        if (c_start !== -1) {
            c_start = c_start + c_name.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end === -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
};
