import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dashboard from '../../containers/dashboard/index';
import Loader from '../../components/common/loader';
import { Link, BrowserRouter, Route, Redirect } from 'react-router-dom'
import Employees from '../../pages/employees/index'



class Index extends Component {
    render() {
        const isLoading = (this.props.dashboardData.isLoading && this.props.attendance.isLoading && this.props.dashboardData.employeeAttedanceSummary) ? true : false;
        return (
            <>
                <Loader isLoading={this.props.dashboardData.isLoading} />
                <Dashboard dashboardData={this.props.dashboardData} attendance={this.props.attendance} employeeAttedanceSummary={this.props.employeeAttedanceSummary} />
            </>
        );
    }
}
const mapStateToProps = (state) => {
   
    return { dashboardData: state.dashboardData, attendance: state.attendance, employeeAttedanceSummary: state.employeeAttedanceSummary }
}
export default connect(mapStateToProps)(Index);
