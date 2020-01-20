import React, { Component } from 'react';
import Holidays from '../../containers/employees/holidays/index'
import Attendance from '../../containers/employees/attendance/index'
import Leave from '../../containers/employees/leave/index'
import TaxSaving from '../../containers/employees/taxSavings/index'
import LeaveReport from '../../containers/admin/leaveReport/index'
import AppConfig from '../../appConfig';
import { Link, BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux';



class Index extends Component {
    render() {
        return (
            <div>
                {/* <h1>Employees</h1> */}
                {/* <Holidays /> */}
                {/* <Attendance /> */}
                {/* <Leave /> */}
                {/* <TaxSaving /> */}
                <div className="secondary-navbar">
                    <span><Link to={AppConfig.baseUrl + 'Employees'}>ATTENDANCE</Link></span>
                    <span><Link to={AppConfig.baseUrl + 'Employees/Leaves'} >LEAVES</Link></span>
                    <span><Link to={AppConfig.baseUrl + 'Employees/LeaveReport'} >LEAVE REPORT</Link></span>
                    <span><Link to={AppConfig.baseUrl + 'Employees/Holidays'}>HOLIDAYS</Link></span>
                    <span><Link to={AppConfig.baseUrl + 'Employees/TaxSavings'}>TAX SAVINGS</Link></span>
                </div>
                <div>
                    <Route path={AppConfig.baseUrl + 'Employees'} exact strict render={() => { return (<Attendance employeeData={this.props.employeeData} dashboardData={this.props.dashboardData} />) }} />
                    <Route path={AppConfig.baseUrl + 'Employees/Leaves'} exact strict render={() => { return (<Leave employeeData={this.props.employeeData} dashboardData={this.props.dashboardData} />) }} />
                    <Route path={AppConfig.baseUrl + 'Employees/LeaveReport'} exact strict render={() => { return (<LeaveReport employeeData={this.props.employeeData} dashboardData={this.props.dashboardData} leaveUser={'employee'} />) }} />
                    <Route path={AppConfig.baseUrl + 'Employees/Holidays'} exact strict render={() => { return (<Holidays employeeData={this.props.employeeData} dashboardData={this.props.dashboardData} />) }} />
                    <Route path={AppConfig.baseUrl + 'Employees/TaxSavings'} exact strict render={() => { return (<TaxSaving employeeData={this.props.employeeData} dashboardData={this.props.dashboardData} />) }} />

                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        employeeData: state.employeeData,
        dashboardData: state.dashboardData,
    }
}
export default connect(mapStateToProps)(Index)

