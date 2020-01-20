import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getMonthName } from '../../common/utils';
import moment from 'moment';
import { insertInOutTime } from '../../actions/employeeActions';
// import '../../css/attendance.css';

class Attendance extends React.PureComponent {

    getCurrentTime() {
        var date = new Date();
        var currentDate = this.getFinalDate();
        var current_Hours = date.getHours();
        var current_Minute = date.getMinutes();
        var current_Second = date.getSeconds();
        var time = currentDate + " " + current_Hours + ":" + current_Minute + ":" + current_Second;
        return time;
    }

    getFinalDate() {
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var finaldate = year + "-" + month + "-" + day;
        return finaldate;
    }

    InsertInOutTime = (inTime) => e => {
        this.props.insertInOutTime(inTime, moment(new Date()).format('LLL'));
    }

    render() {
        const today = new Date();
        const month = getMonthName(today);
        const day = today.getDate();

        const inTime = this.props.attendance.inTime ? moment(this.props.attendance.inTime).format('LT') : null;
        const outTime = this.props.attendance.outTime ? moment(this.props.attendance.outTime).format('LT') : null;

        return (
            <div id="divAttandence">
                <div className='row'>
                    <div className='d-inline pl-3'>
                        <time className="icon">
                            <strong id="monthName">{month}</strong>
                            <span id="monthDay">{day}</span>
                        </time>
                    </div>
                    <div className="d-inline pl-2" style={{ marginRight: 20 }}>
                        {inTime &&
                            <>
                                <button type="button" className="btn btn-light ir-disabled">
                                    <span className="d-none d-md-block d-lg-block"><i className="fas fa-sign-in-alt"></i>&nbsp;In Time</span>
                                    <span className="d-block d-md-none d-lg-none"><i className="fas fa-sign-in-alt"></i>&nbsp;In</span>
                                </button>
                                <span className='d-block'>{inTime}</span>
                            </>
                        }
                        {!inTime &&
                            <>
                                <button type="button" className="btn btn-light" onClick={this.InsertInOutTime(true)}>
                                    <span className="d-none d-md-block d-lg-block"><i className="fas fa-sign-in-alt"></i>&nbsp;In Time</span>
                                    <span className="d-block d-md-none d-lg-none"><i className="fas fa-sign-in-alt"></i>&nbsp;In</span>
                                </button>
                                <span className='d-block'>{inTime}</span>
                            </>
                        }
                    </div>
                    <div className="d-inline pl-2" style={{ marginRight: 20 }}>
                        {!inTime &&
                            <>
                                <button type="button" className="btn btn-light ir-disabled">
                                    <span className="d-none d-md-block d-lg-block"><i className="fas fa-sign-out-alt"></i>&nbsp;Out Time</span>
                                    <span className="d-block d-md-none d-lg-none"><i className="fas fa-sign-out-alt"></i>&nbsp;Out</span>
                                </button>
                                <span className='d-block'>{outTime}</span>
                            </>
                        }
                        {inTime &&
                            <>
                                <button type="button" className="btn btn-light" onClick={this.InsertInOutTime(false)}>
                                    <span className="d-none d-md-block d-lg-block"><i className="fas fa-sign-out-alt"></i>&nbsp;Out Time</span>
                                    <span className="d-block d-md-none d-lg-none"><i className="fas fa-sign-out-alt"></i>&nbsp;Out</span>
                                </button>
                                <span className='d-block'>{outTime}</span>
                            </>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ insertInOutTime }, dispatch);
}

export default connect(null, mapDispatchToProps)(Attendance);