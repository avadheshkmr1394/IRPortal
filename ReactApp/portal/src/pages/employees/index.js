import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loader from '../../components/common/loader';
import { Link, BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import '../../css/pageTitleBar.css'
import EmployeeAttendance from '../../containers/employees/attendance'
import Leaves from '../../containers/employees/leave'
import Holiday from "../../containers/employees/holidays";
import Worklog from "../../containers/employees/worklog";
import TaxSaving from "../../containers/employees/taxSavings";
import AppConfig from '../../appConfig';


class Index extends Component {
    render() {
        return (
            <>        
            <div className="page-title-bar dropdown-content" style={{ backgroundColor: "#888888"}} >
                <span><Link className="text-color" to={AppConfig.baseUrl + 'Attendance'}>ATTENDANCE</Link>|</span>
                <span><Link className="text-color" to={AppConfig.baseUrl + 'Employees/Leaves'} >LEAVES</Link>|</span>
                <span><Link className="text-color" to={AppConfig.baseUrl + 'Employees/Holidays'}>HOLIDAYS</Link>|</span>
                <span><Link className="text-color" to={AppConfig.baseUrl + 'Employees/TaxSavings'}>TAX SAVINGS</Link>|</span>
            </div>
            <div>
            <Route path={AppConfig.baseUrl + 'Attendance'} exact strict render={() => { return (<EmployeeAttendance employeeData={this.props.employeeData} />) }} />
            <Route path={AppConfig.baseUrl + 'Employees/Leaves'} exact strict render={() => { return (<Leaves leaveData={this.props.employeeData} leaveCount={this.props.leaveinfo} />) }} />
            <Route path={AppConfig.baseUrl + 'Employees/Holidays'} exact strict render={() => { return (<Holiday employeeData={this.props.employeeData} />) }} />
            <Route path={AppConfig.baseUrl + 'Employees/TaxSavings'} exact strict render={() => { return (<TaxSaving  employeeData={this.props.employeeData}  />) }} />
        </div>
        </>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        employeeData: state.employeeData,
        leaveinfo: state.leaveinfo,
    }
}
export default connect(mapStateToProps)(Index);
