import React from 'react'
import Header from './header'
import Leave from './leave'
import { connect } from 'react-redux';
import { getEmployeeLeaves, bindingLeaveRecord } from '../../../actions/employeeActions'
import { employeeLeaveCount } from '../../../actions/leaveAction'
import { bindActionCreators } from 'redux';



class Index extends React.Component {
    constructor() {
        super();
        this.state = {
            rowBackgroundColor: '',
            leaveId: '',
            years: '',
            employeeId: '',
            status: ''
        }
    }

    componentDidMount() {
        this.props.getEmployeeLeaves({ year: (new Date()).getFullYear() });
        this.props.employeeLeaveCount()
    }

    _onPress = async () => {
        const userId = document.getElementById('inputUserId').value
        const Year = document.getElementById('inputYear').value;
        this.props.getEmployeeLeaves({ employeeId: userId, year: Year });
        this.props.employeeLeaveCount({ employeeId: userId })
        this.setState({
            rowBackgroundColor: '',
            leaveId: '',
            years: '',
            employeeId: '',
            status: ''
        })
    }

    selectLeaveRowData = (leaveId, employeeId, date, getyear, isApprovedStatus) => {
        if (leaveId != null) {
            this.setState({
                rowBackgroundColor: '#ffefbb',
                leaveId: leaveId,
                years: getyear,
                employeeId: employeeId,
                status: isApprovedStatus
            })
        }
    }

    leaveRecords = async () => {
        await this.props.bindingLeaveRecord()
    }

    render() {

        return (
            <>
                <main id="content" className="app__content">
                    <Header employeeData={this.props.employeeData} onPress={this._onPress} dashboardData={this.props.dashboardData} leaveId={this.state.leaveId} years={this.state.years} employeeId={this.state.employeeId} status={this.state.status} leaveRecords={this.leaveRecords} />
                    <Leave employeeData={this.props.employeeData} dashboardData={this.props.dashboardData} rowBackgroundColor={this.state.rowBackgroundColor} selectLeaveRowData={this.selectLeaveRowData} leaveId={this.state.leaveId} years={this.state.years} employeeId={this.state.employeeId} status={this.state.status} />
                </main>
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getEmployeeLeaves, employeeLeaveCount, bindingLeaveRecord }, dispatch)
}
export default connect(null, mapDispatchToProps)(Index)
