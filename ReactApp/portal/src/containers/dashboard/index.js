import React, { Component } from 'react';
import Calendar from './calendar';
import Attendance from './attendance';
import IncompleteWorkingDays from './incompleteAttendance';
import AttedanceSummary from './attendaceSummary'
import '../../css/bootstrap.css';
import { getDashboardData } from '../../actions/dashboardActions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';



class Index extends Component {
    refreshData = () => {
        this.props.getDashboardData();
    }
    render() {
        const incompleteAttendance = this.props.dashboardData.incompleteAttendance;
        const employeeAttedanceSummary = this.props.dashboardData.employeeAttedanceSummary;
        const isAdmin = this.props.dashboardData.userRole === "Admin";
        return (
            <div>
                <div className="row" style={{ display: 'flex', margin: '50px 2px 2px 2px' }} >
                    <div className="col-lg-4 col-md-12 col-sm-12">
                        <h3>Attendance</h3>
                        <Attendance attendance={this.props.attendance} />
                        {isAdmin &&
                            <div className='pt-4'>
                                <div className='row'><div className='col-md-10'><h3>Attendance Summary</h3></div>
                                    <div className='col-md-2'><input type="button" className="attendacesummary" onClick={this.refreshData} value="Refresh" /></div>
                                </div>
                                <AttedanceSummary employeeAttedanceSummary={employeeAttedanceSummary} />
                            </div>
                        }
                        {!isAdmin && (incompleteAttendance && incompleteAttendance.length > 0) &&
                            <div className='pt-4' style={{ width: '100%' }}>
                                <h3>Incomplete Attendance</h3>
                                <IncompleteWorkingDays incompleteAttendance={incompleteAttendance} />
                            </div>
                        }
                    </div>
                    <div className="col-lg-8 col-md-12 col-sm-12">
                        <h3>Calendar</h3>
                        <Calendar events={this.props.dashboardData.calendar} />
                    </div>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getDashboardData }, dispatch);
}

export default connect(null, mapDispatchToProps)(Index);


