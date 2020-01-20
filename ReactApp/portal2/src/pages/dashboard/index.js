import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Loader from '../../components/common/loader';
import Dashboard from '../../containers/dashboard/index';


class Index extends Component {
    render() {
        // const isLoading = (this.props.dashboardData.isLoading && this.props.attendance.isLoading && this.props.dashboardData.employeeAttedanceSummary) ? true : false;
        return (
            <>
                {/* <h4>Dashboard</h4> */}
                {/* <Loader isLoading={this.props.dashboardData.isLoading} /> */}
                <Dashboard dashboardData={this.props.dashboardData} attendance={this.props.attendance} employeeAttedanceSummary={this.props.employeeAttedanceSummary} />
            </>
        );
    }
}
const mapStateToProps = (state) => {
    return { dashboardData: state.dashboardData, attendance: state.attendance, employeeAttedanceSummary: state.employeeAttedanceSummary }
}
export default connect(mapStateToProps)(Index);
