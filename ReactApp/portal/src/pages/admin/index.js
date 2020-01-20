import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loader from '../../components/common/loader';
import { Link, BrowserRouter, Route, Redirect } from 'react-router-dom'
import AttendanceReport from '../../containers/admin/attendanceReport'
import Container from '../../containers/admin/containers'
import EmailTemplets from '../../containers/admin/emailTemplets'
import Employee from '../../containers/admin/employee'
import LeaveReport from '../../containers/admin/leaveReport'
import MapEmployee from '../../containers/admin/mapEmployee'
import Project from '../../containers/admin/projects'
import User from '../../containers/admin/users'
import '../../css/pageTitleBar.css'
import AppConfig from '../../appConfig';
import '../../css/admin.css'
import { getAdminUser } from '../../actions/adminAction'



class Index extends React.Component {
    componentDidMount() {
        this.props.getAdminUser()
    }
    render() {
        const userRole = this.props.dashboardData.userRole
        return (
            <>
                <BrowserRouter>
                    {userRole == "Admin" && <div>
                        <div className="page-title-bar dropdown-content" style={{ backgroundColor: "#888888" }} >
                            <span><Link className="text-color" to={AppConfig.baseUrl + 'Account'}>USERS</Link>|</span>
                            <span><Link className="text-color" to={AppConfig.baseUrl + 'Employee'}>EMPLOYEES</Link>|</span>
                            <span><Link className="text-color" to={AppConfig.baseUrl + 'Admin/Projects'}>PROJECTS</Link>|</span>
                            <span><Link className="text-color" to={AppConfig.baseUrl + 'Attendance/AttendanceReport'}>ATTENDANCE REPORT</Link>|</span>
                            <span><Link className="text-color" to={AppConfig.baseUrl + 'Employee/LeaveReport'}>LEAVE REPORT</Link>|</span>
                            <span><Link className="text-color" to={AppConfig.baseUrl + 'Admin/EmailTemplates'}>EMAIL TEMPLATES</Link>|</span>
                            <span><Link className="text-color" to={AppConfig.baseUrl + 'Files/Containers'}>CONTAINERS</Link>|</span>
                            <span><Link className="text-color" to={AppConfig.baseUrl + 'Employee/ManageHolidays'}>HOLIDAYS</Link>|</span>
                            <span><Link className="text-color" to={AppConfig.baseUrl + 'Employee/ManageTaxSavingTypes'}>TAX SAVINGS TYPES</Link>|</span>
                            <span><Link className="text-color" to={AppConfig.baseUrl + 'Employee/MapEmployee'}>MAP EMPLOYEE</Link>|</span>
                        </div>
                        <div>
                            <Route path={AppConfig.baseUrl + 'Account'} exact strict render={() => { return (<User adminData={this.props.adminData} />) }} />
                            <Route path={AppConfig.baseUrl + 'Employee'} exact strict render={() => { return (<Employee leaveInfo={this.props.leaveInfo} adminData={this.props.adminData} />) }} />
                            <Route path={AppConfig.baseUrl + 'Admin/Projects'} exact strict render={() => { return (<Project />) }} />
                            <Route path={AppConfig.baseUrl + 'Attendance/AttendanceReport'} exact strict render={() => { return (<AttendanceReport />) }} />
                            <Route path={AppConfig.baseUrl + 'Employee/LeaveReport'} exact strict render={() => { return (<LeaveReport />) }} />
                            <Route path={AppConfig.baseUrl + 'Admin/EmailTemplates'} exact strict render={() => { return (<EmailTemplets />) }} />
                            <Route path={AppConfig.baseUrl + 'Files/Containers'} exact strict render={() => { return (<Container />) }} />
                            <Route path={AppConfig.baseUrl + 'Employee/ManageHolidays'} exact strict render={() => { return (<h4>Holidays</h4>) }} />
                            <Route path={AppConfig.baseUrl + 'Employee/ManageTaxSavingTypes'} exact strict render={() => { return (<h4>Tax Saving Type</h4>) }} />
                            <Route path={AppConfig.baseUrl + 'Employee/MapEmployee'} exact strict render={() => { return (<MapEmployee />) }} />
                        </div>
                    </div>}
                </BrowserRouter>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        dashboardData: state.dashboardData,
        adminData: state.adminData,
        leaveInfo: state.leaveinfo
    }
}
const dispactchstatetoprops = (dispatch) => {
    return bindActionCreators({ getAdminUser }, dispatch)
}
export default connect(mapStateToProps, dispactchstatetoprops)(Index)

