import React from 'react'
import Header from './header'
import EmployeeAttendance from './attendance'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import moment from 'moment';
import { getTodayAttendanceTime, getEmployeesAttendance, insertInOutTime } from '../../../actions/attendanceAction'
import { getFormattedTiming } from '../../../common/utils';


class Index extends React.Component {

    componentDidMount() {
        this.props.getEmployeesAttendance();
    }

    _onPress = async (userId, date) => {
        if (userId == null && date == null) {
            userId = document.getElementById('inputUserId').value
            date = new Date(document.getElementById('btnTitledate').value)
            this.props.getTodayAttendanceTime(getFormattedTiming(new Date()))
            await this.props.getEmployeesAttendance({ employeeId: userId, date: date })
        }
        this.props.getTodayAttendanceTime(getFormattedTiming(new Date()))
        await this.props.getEmployeesAttendance({ employeeId: userId, date: date })
    }

    insertInOutTime = async (inTime) => {
        await this.props.insertInOutTime(inTime, moment(new Date()).format('LLL'));
    }

    render() {
        return (
            <>
                <main id="content" className="app__content">
                    <Header employeeData={this.props.employeeData} onPress={this._onPress} dashboardData={this.props.dashboardData} insertInOutTime={this.insertInOutTime} />
                    <EmployeeAttendance employeeData={this.props.employeeData} onPress={this._onPress} dashboardData={this.props.dashboardData} />
                </main>
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getEmployeesAttendance, insertInOutTime, getTodayAttendanceTime }, dispatch)
}
export default connect(null, mapDispatchToProps)(Index)
