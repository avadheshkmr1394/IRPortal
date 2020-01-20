const getBaseUrl = () => {
    var _baseUrl = '/';
    var _isProdution = document.location.host.indexOf('insightresults.com') !== -1;
    if (_isProdution) {
        _baseUrl = '/' + window.location.href.split('/')[3] + '/';
    }
    return _baseUrl;
};

const getAppBaseUrl = () => {
    var _baseUrl = '/';
    var _isProdution = document.location.host.indexOf('insightresults.com') !== -1;
    if (_isProdution) {
        _baseUrl = '/' + window.location.href.split('/')[3] + '/';
    } else {
        _baseUrl = window.location.protocol + '//' + window.location.host
    }
    return _baseUrl;
};
const getApiUrl=()=>{
    return `${window.location.protocol}//${window.location.host}/api/`;
}

const AppConfig = {
    appMode: ['portal', 'portal2', 'portalqa'].includes(window.location.host.replace('.insightresults.com', '')) ? 'prod' : 'dev',
    env: function (config) {
        if (this.appMode === 'prod') {
            return this.prod[config];
        }
        else {
            return this.dev[config];
        }
    },
    textAutoSaveDelay: 4000, //in miliseconds
    modifiedOnDateFormat: 'LLL',
    baseUrl: getBaseUrl(),
    appBaseUrl: getAppBaseUrl(),
    reduxLogger: false,
    axiosLogger: false,

    dev: {
        deviceType: 'desktop', // 'desktop', 'mobile'
        url: 'http://localhost:56612/',
        userId: '67A179E0-714F-4BBD-94F7-54128DF86893', //localStorage.getItem('userId'), //'67A179E0-714F-4BBD-94F7-54128DF86893',//Ankit '4DE36305-AD07-4BAE-A846-88D6BA36D7D6',//akhilesh '007ac369-51d2-4155-9c8c-c51db774ab59',
        connectionId: '',
    },
    prod: {
        deviceType: 'desktop',
        url: getApiUrl(),
        userId: '',
        connectionId: '',
    }
}

export default AppConfig;
