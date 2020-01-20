import _ from 'lodash';
import moment from 'moment';

export const getRelativePath = (locationPath) => {
    if (window.location.hostname !== 'localhost') {
        locationPath = locationPath.replace(locationPath.split('/').splice(0, 2).join('/'), '');
    } else {
        locationPath = locationPath;
    }

    locationPath = _.trimEnd(_.trimStart(locationPath, '/'), '#').toLowerCase();

    return locationPath;
};

export const getMajorMenuName = (pathname) => {
    const path = pathname.split('/');
    if (path.length > 0) {
        return path[0].toLowerCase()
    }
    return '';
};

export const getFormattedTiming = (dateTime) => {
    if (!dateTime) return '';
    return moment(dateTime).format('MM/DD/YYYY');
};

export const getMonthName = (date) => {
    if (!date) return '';
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[date.getMonth()]
};