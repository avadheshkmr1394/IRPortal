import React from 'react'
import Header from './header'
import LeaveReport from './leaveReport'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLeaveReport } from '../../../actions/leaveAction'



class Index extends React.Component {
    componentDidMount() {
        this.props.getLeaveReport({ employeeStatus: 'Active', employeeId: (this.props.leaveUser === 'Admin') ? null: localStorage.getItem('userId') })
    }

    _onPress = (employeeStatus) => {
        this.props.getLeaveReport({ employeeStatus: employeeStatus, employeeId: null });
    }

    render() {
        return (
            <>
                <main id="content" className="app__content">
                    <Header onPress={this._onPress} user={this.props.leaveUser} />
                    <LeaveReport adminData={this.props.adminData} onPress={this._onPress} />
                </main>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        adminData: state.adminData,
        dashboardData: state.dashboardData,
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getLeaveReport }, dispatch)

}
export default connect(mapStateToProps, mapDispatchToProps)(Index) 
