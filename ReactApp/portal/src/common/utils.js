import moment from 'moment';

export const getMonthName = (date) => {
    if (!date) return '';
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[date.getMonth()]
};

export const getFormattedTiming = (dateTime) => {
    if (!dateTime) return '';
    return moment(dateTime).format('MM/DD/YYYY');
};