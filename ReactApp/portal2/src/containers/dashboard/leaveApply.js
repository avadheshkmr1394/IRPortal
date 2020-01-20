import React, { PureComponent } from 'react';
import { insertLeave, getUpdateEmpId } from '../../actions/leaveAction'
import { getDashboardData } from '../../actions/dashboardActions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Redirect } from 'react-router-dom'
import AppConfig from '../../appConfig';
import Switch from "react-switch";




class LeaveApply extends PureComponent {
    constructor(props) {
        super(props);
        if (this.props.status === 1) {
            this.state = {
                EmployeeId: '',
                leaveFromDate: new Date(this.props.currentDate),
                leaveToDate: new Date(this.props.currentDate),
                leaveType: 'CL',
                leaveCount: '1.0',
                remarks: '',
                IsApproved: false,
                refresh: false,
                type: '',
                edittype: 'add',
                IsSecondHalf: false
            }
        }
        else if (this.props.employeeData.editEmp.EmployeeId !== '') {
            this.state = {
                LeaveId: this.props.employeeData.editEmp.LeaveId,
                EmployeeId: this.props.employeeData.editEmp.EmployeeId,
                leaveFromDate: new Date(this.props.employeeData.editEmp.LeaveDate),
                leaveType: this.props.employeeData.editEmp.LeaveType,
                leaveCount: this.props.employeeData.editEmp.LeaveCount,
                remarks: this.props.employeeData.editEmp.Remarks == null ? '' : this.props.employeeData.editEmp.Remarks,
                IsApproved: this.props.employeeData.editEmp.IsApproved,
                IsSecondHalf: this.props.employeeData.editEmp.IsSecondHalf,
                refresh: false,
                type: '',
                edittype: 'edit',
            }
        }
        this.fromDateChange = this.fromDateChange.bind(this);
        this.toDateChange = this.toDateChange.bind(this);
    }
    popupCancel = (e) => {
        if (this.state.LeaveId) {
            this.setState({ type: 'clear' })
        }
        else {
            this.props.cancelModal()
        }
    }
    fromDateChange(dt) {
        this.setState({
            leaveFromDate: dt
        });
    }
    toDateChange(datevalue) {
        this.setState({
            leaveToDate: datevalue
        });
    }
    handlesubmit = async (event) => {
        event.preventDefault();
        await insertLeave(this.state)
        await this.props.getUpdateEmpId(this.props.employeeData.editEmp.EmployeeId);
        await this.setState({ type: 'clear' })
    }
    changesubmit = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSwitch = (checked) => {
        this.setState({ IsSecondHalf: checked });
    }

    render() {
        const leaveInfo = this.props.employeeData;
        if (this.state.type === 'clear') {
            return <Redirect to={AppConfig.baseUrl + 'leavestatus'} />
        }
        return (
            <form onSubmit={this.handlesubmit} >
                <hr  ></hr>
                <div className='leaves-header'>
                    <div className='row'>
                        <div className="col-sm-7">
                            {(this.state.EmployeeId === '' || this.state.edittype == 'add') && <h4 className="modal-title">Add Leaves</h4>}
                            {(this.state.EmployeeId !== '' && this.state.edittype == 'edit') && <h4 className="modal-title">Edit Leaves</h4>}
                        </div>
                        {this.props.status == 1 && <div className="col-sm-5">
                            {this.props.userRole === 'Admin' &&
                                <select style={{ marginTop: '6px' }} id='selectempid' name='EmployeeId' onChange={this.changesubmit} className="form-control">
                                    <option value='' >Select Employee</option>
                                    {leaveInfo.getEmployeeData.map(function (item, index) {
                                        return <option key={index} value={item.EmployeeId}>{item.FirstName + ' ' + (item.MiddleName || '') + ' ' + item.LastName}</option>
                                    })}
                                </select>}
                        </div>}
                    </div>
                </div>
                <hr  ></hr>
                <div className="modal-body">
                    <div className="form-horizontal">
                        <div className="row">
                            {(this.state.EmployeeId === '' || this.state.edittype == 'add') && <label className="col-sm-3">From Date</label>}
                            {(this.state.EmployeeId !== '' && this.state.edittype == 'edit') && <label className="col-sm-3">Leave Date</label>}
                            <div className="col-sm-8">
                                {(this.state.IsApproved === false || this.state.IsApproved === true) && <DatePicker name='leaveFromDate' onChange={this.fromDateChange} required selected={this.state.leaveFromDate} className="form-control date-picker" />}

                            </div>
                        </div>
                        {(this.state.EmployeeId === '' || this.state.edittype == 'add') && <br></br>}
                        {(this.state.EmployeeId === '' || this.state.edittype == 'add') && <div className="row">
                            <label className="col-sm-3">To Date</label>
                            <div className="col-sm-8">
                                {(this.state.IsApproved === false || this.state.IsApproved === true) && <DatePicker name='leaveToDate' onChange={this.toDateChange} required selected={this.state.leaveToDate} className="form-control date-picker" />}
                            </div>
                        </div>}
                        <br></br>
                        <div className="row">
                            <label className="col-sm-3">Leave Type</label>
                            <div className="col-sm-8">
                                {(this.state.IsApproved === false || this.state.IsApproved === true) && <select name='leaveType' onChange={this.changesubmit} required value={this.state.leaveType} className="form-control">
                                    <option value="CL">Casual Leave</option>
                                    <option value="SL">Sick Leave</option>
                                    <option value="EL">Earned Leave</option>
                                    <option value="EW">Extra Work</option>
                                    <option value="LWP">Leave Without Pay</option>
                                </select>}
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <label className="col-sm-3">Period</label>
                            <div className="col-sm-8">
                                {(this.state.IsApproved === false || this.state.IsApproved === true) && <select name='leaveCount' onChange={this.changesubmit} required value={this.state.leaveCount} className="form-control">
                                    <option value="1.0">Full Day</option>
                                    <option value="0.5">Half Day</option>
                                </select>}
                            </div>
                        </div>
                        <br></br>
                        {this.state.leaveCount == '0.5' && <div className="row">
                            <label className="col-sm-4 control-label">Second Half</label>
                            <div className="col-sm-8">
                                {(this.state.IsApproved === false || this.state.IsApproved === true) && <Switch onChange={this.handleSwitch} checked={this.state.IsSecondHalf}
                                    onColor="#b2ec5c"
                                    checkedIcon={<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", fontSize: 15, color: "orange", paddingRight: 2 }}>On</div>}
                                    uncheckedIcon={<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", fontSize: 15, color: "orange", paddingRight: 2, }}>off</div>} />}
                            </div>
                        </div>}
                        {this.state.leaveCount == '0.5' && <br />}
                        <div className="row">
                            <label className="col-sm-3 ">Remark</label>
                            <div className="col-sm-8">
                                {(this.state.IsApproved === false || this.state.IsApproved === true) && <input type="text" name='remarks' onChange={this.changesubmit} value={this.state.remarks} className="form-control" />}
                            </div>
                        </div>
                    </div>
                </div>
                <br></br>
                <div className="modal-footer">
                    {(this.state.IsApproved === false || this.state.IsApproved === true) && <input type='submit' className="btn btn-success" value='OK' />}
                    {(this.state.IsApproved === false || this.state.IsApproved === true) && <button className="btn btn-default" style={{ borderColor: '#ccc' }} onClick={this.popupCancel} type='button' title="Cancel">Cancel</button>}
                </div>
            </form>
        )
    }
}
const mapstatetoprops = (state) => {
    return {
        employeeData: state.employeeData,
        userRole: state.dashboardData.userRole,
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getDashboardData, getUpdateEmpId }, dispatch);
}
export default connect(mapstatetoprops, mapDispatchToProps)(LeaveApply);

