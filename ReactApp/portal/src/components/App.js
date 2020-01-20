import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import AppConfig from '../appConfig';
import DashboardPage from '../pages/dashboard/PortalLayout';
import EmployeePage from '../pages/employees/index';
import AdminPage from '../pages/admin/index'
import Navbar from './navbar';
import '../css/react-spinner.css';
import '../css/table.css';
import '../css/common.css';
import '../css/Leave.css'
import '../css/admin.css'

import EmployeeAttendance from '../containers/employees/attendance'
import { connect } from 'react-redux';

const NavbarWithRouter = withRouter(props => <Navbar {...props} />);

class App extends Component {

  render() {
    return (
      <React.Fragment>
        <NavbarWithRouter {...this.props} />
        <Switch>
          <Route exact path={AppConfig.baseUrl} component={DashboardPage} />
          <Route path={AppConfig.baseUrl + 'Home'} component={DashboardPage} />
          <Route path={AppConfig.baseUrl + 'Attendance'} component={EmployeePage} />
          <Route path={AppConfig.baseUrl + 'Employees/Leaves'} component={EmployeePage} />
          <Route path={AppConfig.baseUrl + 'Employees/Holidays'} component={EmployeePage} />
          <Route path={AppConfig.baseUrl + 'Employees/TaxSavings'} component={EmployeePage} />
          <Route path={AppConfig.baseUrl + 'Account'} component={AdminPage} />
          <Route path={AppConfig.baseUrl + 'Employee'} component={AdminPage} />
          <Route path={AppConfig.baseUrl + 'Admin/Projects'} component={AdminPage} />
          <Route path={AppConfig.baseUrl + 'Attendance/AttendanceReport'} component={AdminPage} />
          <Route path={AppConfig.baseUrl + 'Employee/LeaveReport'} component={AdminPage} />
          <Route path={AppConfig.baseUrl + 'Admin/EmailTemplates'} component={AdminPage} />
          <Route path={AppConfig.baseUrl + 'Files/Containers'} component={AdminPage} />
          <Route path={AppConfig.baseUrl + 'Employee/ManageHolidays'} component={AdminPage} />
          <Route path={AppConfig.baseUrl + 'Employee/ManageTaxSavingTypes'} component={AdminPage} />
          <Route path={AppConfig.baseUrl + 'Employee/MapEmployee'} component={AdminPage} />
        </Switch>
      </React.Fragment>
    );
  }
}
export default App;


