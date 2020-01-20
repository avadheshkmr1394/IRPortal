import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import _ from 'lodash';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../scss/calendar.scss';
import CalendarEvents from '../../components/dashboard/calendarEvents';
import DailyEvent from '../../components/dashboard/dailyDropdown';

const localizer = BigCalendar.momentLocalizer(moment);

class Calendar extends React.PureComponent {
    constructor(){
        super();
        this.state={
            selectedDate:''
        }
    }
    // eventStyleGetter(event, start, end, isSelected) {
    //     console.log(event);
    //     var style = {};
    //     if (event.EventType === "Holiday") {
    //         var backgroundColor = '#008000';
    //         style = {
    //             backgroundColor: backgroundColor,
    //         };
    //     }
    //     return {
    //         style: style
    //     };
    // }
    dayPropGetterClass = (Date) => {
       const day = moment(Date).format('dddd');
        switch (day) {
            case 'Saturday':
            case 'Sunday': return { className: 'rbc-off-day-bg' }
            default: return;
        }
    }
    render() {
        return (
            <div>
                <BigCalendar
                 
                 selectable={true}
                   allDayAccessor=""
                   localizer={localizer}
                    events={this.props.events}  
                    views={['month']}
                    startAccessor="EventDate"
                    endAccessor="EventDate"
                    showMultiDayTimes={false}
                    components={{
                        event: CalendarEvents,
                         dateCellWrapper: DailyEvent,
                    }}
                    popup={true}
                    dayPropGetter={this.dayPropGetterClass}
                //eventPropGetter={(this.eventStyleGetter)}
                />
            </div>
        )
    }
}
export default Calendar;
