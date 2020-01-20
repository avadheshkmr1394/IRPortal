import React, { Component } from 'react';
import Employee from '../../containers/admin/employee/index'
import User from '../../containers/admin/users/index'
import AttendanceReport from '../../containers/admin/attendanceReport/index'
import LeaveReport from '../../containers/admin/leaveReport/index'
import Holidays from '../../containers/employees/holidays/index'
import TaxSavingType from '../../containers/admin/taxSavingTypes.js/index'
import EmailTemplet from '../../containers/admin/emailTemplet/index'
import Containers from '../../containers/admin/containers/index'
import MapEmployee from '../../containers/admin/mapEmployee/index'
import { Link, BrowserRouter, Route, Redirect } from 'react-router-dom'
import { getAdminUser } from '../../actions/adminAction'
import { bindActionCreators } from 'redux';
import AppConfig from '../../appConfig';
import { connect } from 'react-redux';


class Index extends Component {
    render() {
        const userRole = this.props.dashboardData.userRole
        return (
            <div>
                {/* <User /> */}
                {/* <Employee /> */}
                {/* <AttendanceReport /> */}
                {/* <LeaveReport /> */}
                {/* <Holidays action='displayAction' /> */}
                {/* <TaxSavingType /> */}
                {/* <EmailTemplet /> */}
                {/* <Containers /> */}
                {/* <MapEmployee /> */}
                <BrowserRouter>
                    {userRole == "Admin" && <div>
                        <div className="secondary-navbar">
                            <span><Link to={AppConfig.baseUrl + 'Admin'}>USERS</Link></span>
                            <span><Link to={AppConfig.baseUrl + 'Admin/Employee'}>EMPLOYEES</Link></span>
                            <span><Link to={AppConfig.baseUrl + 'Admin/AttendanceReport'}>ATTENDANCE REPORT</Link></span>
                            <span><Link to={AppConfig.baseUrl + 'Admin/LeaveReport'}>LEAVE REPORT</Link></span>
                            {/* <span><Link to={AppConfig.baseUrl + 'Admin/EmailTemplates'}>EMAIL TEMPLATES</Link></span> */}
                            {/* <span><Link to={AppConfig.baseUrl + 'Admin/Containers'}>CONTAINERS</Link></span> */}
                            <span><Link to={AppConfig.baseUrl + 'Admin/ManageHolidays'}>HOLIDAYS</Link></span>
                            <span><Link to={AppConfig.baseUrl + 'Admin/ManageTaxSavingTypes'}>TAX SAVINGS TYPES</Link></span>
                            <span><Link to={AppConfig.baseUrl + 'Admin/MapEmployee'}>MAP EMPLOYEE</Link></span>
                        </div>
                        <div>
                            <Route path={AppConfig.baseUrl + 'Admin'} exact strict render={() => { return (<User adminData={this.props.adminData} />) }} />
                            <Route path={AppConfig.baseUrl + 'Admin/Employee'} exact strict render={() => { return (<Employee adminData={this.props.adminData} employeeData={this.props.employeeData}/>) }} />
                            <Route path={AppConfig.baseUrl + 'Admin/AttendanceReport'} exact strict render={() => { return (<AttendanceReport adminData={this.props.adminData} />) }} />
                            <Route path={AppConfig.baseUrl + 'Admin/LeaveReport'} exact strict render={() => { return (<LeaveReport adminData={this.props.adminData} leaveUser={'Admin'} />) }} />
                            {/* <Route path={AppConfig.baseUrl + 'Admin/EmailTemplates'} exact strict render={() => { return (<EmailTemplet adminData={this.props.adminData} />) }} /> */}
                            {/* <Route path={AppConfig.baseUrl + 'Admin/Containers'} exact strict render={() => { return (<Containers />) }} adminData={this.props.adminData} /> */}
                            <Route path={AppConfig.baseUrl + 'Admin/ManageHolidays'} exact strict render={() => { return (<Holidays action='displayAction' dashboardData={this.props.dashboardData} employeeData={this.props.employeeData} />) }} />
                            <Route path={AppConfig.baseUrl + 'Admin/ManageTaxSavingTypes'} exact strict render={() => { return (<TaxSavingType adminData={this.props.adminData} />) }} />
                            <Route path={AppConfig.baseUrl + 'Admin/MapEmployee'} exact strict render={() => { return (<MapEmployee adminData={this.props.adminData} />) }} />
                        </div>
                    </div>}
                </BrowserRouter>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        dashboardData: state.dashboardData,
        adminData: state.adminData,
        employeeData: state.employeeData,
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getAdminUser }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Index)
