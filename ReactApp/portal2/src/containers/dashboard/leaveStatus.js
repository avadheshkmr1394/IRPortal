import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import moment from 'moment';
import { getLeaveData, employeeLeaveCount, getLeaveDataById, approveEmployeeLeave, deleteLeave, editLeave, editLeaveDataMap, getUpdateEmpYear } from '../../actions/leaveAction'
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom'
import AppConfig from '../../appConfig';
import { Link } from 'react-router-dom'



class LeaveStatus extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            employeeId: '',
            editresponse: '',
            years: '',
            cryear: []
        }
    }
    async componentDidMount() {
        await this.changeId();
        this.leaveYear();
    }
    leaveYear = () => {
        var date = new Date();
        var reverseYear = [];
        for (var i = 2014; i <= date.getFullYear(); i++) {
            reverseYear.push(i);
        }
        this.setState({
            cryear: reverseYear.reverse()
        })
    }
    deleteEmployeeLeave = async (leaveId, employeeId) => {
        if (window.confirm("Are you sure you want to delete Leave")) {
            var year = document.getElementById('getyear').value
            await deleteLeave({ LeaveId: leaveId });
            await this.props.getLeaveData({ employeeid: employeeId, year: year });
        }
    }
    editEmpLeave = async (employeeId, leaveDate) => {
        var year = document.getElementById('getyear').value
        const res = await editLeave({ employeeId: employeeId, leavedate: leaveDate, year: year })
        await this.props.getUpdateEmpYear(year)
        this.props.editLeaveDataMap(res)
        await this.setState({ editresponse: res });
    }
    approveLeave = async (leaveId, employeeId) => {
        var year = document.getElementById('getyear').value
        await approveEmployeeLeave({ LeaveId: leaveId, employeeId: employeeId, IsApproved: true, year: year });
        this.setState({
            years: year
        })
        this.props.getLeaveData({ employeeId: employeeId, year: year });
        document.getElementById(leaveId).checked = false;
    }
    changeEmployee = (event) => {
        var year = document.getElementById('getyear').value
        var employeeId = document.getElementById('getempid').value
        this.setState({
            employeeId: employeeId,
            years: year
        })
        this.props.employeeLeaveCount({ employeeId: employeeId });
        this.props.getLeaveDataById({ employeeId: employeeId, year: year });
        this.changeId()
    }
    changeId = async () => {
        if (this.state.employeeId === '') {
            if (this.props.employeeData.employeeId === '') {
                await this.setState({
                    employeeId: this.props.dashboardData.employeeId
                })
                this.props.employeeLeaveCount({ employeeId: this.props.dashboardData.employeeId });
                this.props.getLeaveData(this.state.employeeId);
            }
            else {
                await this.setState({
                    employeeId: this.props.employeeData.employeeId,
                    years: this.props.employeeData.year
                })
                this.props.employeeLeaveCount({ employeeId: this.props.employeeData.employeeId });
                this.props.getLeaveData({ employeeId: this.props.employeeData.employeeId, year: this.props.employeeData.year });
            }
        }
    }
    render() {
        const leaveData = this.props.employeeData;
        const userRole = this.props.userRole;
        const leaveInfo = this.props.employeeData;
        let _this = this;
        if (this.state.editresponse !== '') {
            return <Redirect to={AppConfig.baseUrl + 'editleave'} />
        }
        return (
            <div>
                <hr></hr>
                <div className='leaves-header'><h4 className="modal-title">Leaves</h4></div>
                <hr></hr>
                <div className="modal-body">
                    <div className="form-horizontal">
                        <div>
                            <div className='row' >
                                <div className="col-md-4" style={{ marginBottom: '7px' }} >
                                    {leaveInfo.employeeLeaveCount.map(function (item, index) {
                                        return <div key={index} className='leave-beleance' ><b style={{ marginTop: '5px' }} ><b style={{ color: '#008000' }} key={index} id="balLeaves">CL : <b>{item.TotalCL - item.CL}</b> EL : <b>{item.TotalEL - item.EL}</b> SL : <b>{item.TotalSL - item.SL}</b></b></b></div>
                                    })
                                    }
                                    {leaveInfo.employeeLeaveCount == '' && <div className='leave-beleance' ><b style={{ marginTop: '5px' }} >   <b style={{ color: '#008000' }} >CL : <b>0</b> EL : <b>0</b> SL : <b>0</b></b></b></div>}
                                </div>
                                <div className="col-md-4" style={{ marginBottom: '7px' }} ><select id='getempid' value={this.state.employeeId} onChange={this.changeEmployee} className="form-control" >
                                    {leaveInfo.getEmployeeData.map(function (item, index) {
                                        return <option key={index} value={item.EmployeeId}>{item.FirstName + ' ' + (item.MiddleName || '') + ' ' + item.LastName}</option>
                                    })
                                    }
                                </select></div>
                                <div className="col-md-4" style={{ marginBottom: '7px' }}><select id='getyear' onChange={this.changeEmployee} value={this.state.years} className="form-control">
                                    {
                                        this.state.cryear.map(function (item, index) {
                                            return <option key={index} value={`${item}`}>{item}</option>
                                        })
                                    }
                                </select>
                                </div>
                            </div>
                        </div>
                        <table className='table table-bordered table-striped table-sm' id="scrollbar" style={{ marginTop: '11px' }} >
                            <thead className='green-color' style={{ display: 'block' }} >
                                <tr>
                                    <th style={{ width: '151px' }} >Date </th>
                                    <th style={{ width: '164px' }} >Type</th>
                                    <th style={{ width: '151px' }} >Status</th>
                                    <th style={{ width: '165px' }} >Action</th>
                                </tr>
                            </thead >
                            <tbody id='tbodyid' style={{ overflowY: 'auto', display: 'block' }} >
                                {
                                    leaveData.data.map(function (item, index) {
                                        return <tr key={index}>
                                            <td style={{ width: '157px' }}>{moment(item.LeaveDate).format('DD/MM/YYYY')}</td>
                                            {(item.LeaveType === "CL") && <td style={{ width: '174px' }}>  Casual Leave </td>}
                                            {(item.LeaveType === "EL") && <td style={{ width: '174px' }}>  Earned Leave </td>}
                                            {(item.LeaveType === "EW") && <td style={{ width: '174px' }}>  Extra Wor </td>}
                                            {(item.LeaveType === "SL") && <td style={{ width: '174px' }}>  Sick Leave </td>}
                                            {(item.LeaveType === "LWP") && <td style={{ width: '174px' }}>Leave Without Pay</td>}
                                            {(item.IsApproved === true) && <td style={{ width: '157px', color: '#008000' }}>Approved</td>}
                                            {(item.IsApproved === false) && <td style={{ width: '157px', color: '#ff0000' }}>Pending</td>}
                                            {userRole === 'Admin' &&
                                                <td style={{ width: '157px' }}>{
                                                    (item.IsApproved === true) && <i title='Approved Leave' style={{ color: '#008000' }} className="fa fa-check"></i>
                                                }
                                                    {
                                                        (item.IsApproved === false) && <input type='checkbox' id={`${item.LeaveId}`} className='ui checkbox' title='Approve Leave' onClick={() => _this.approveLeave(item.LeaveId, item.EmployeeId)} />
                                                    }
                                                    {<i className="check-space" >{" "}</i>}
                                                    {
                                                        <Link onClick={() => _this.deleteEmployeeLeave(item.LeaveId, item.EmployeeId)} title='Delete Leave' ><i className="fa fa-trash"></i></Link>
                                                    }
                                                    {<i className="check-space" >{" "}</i>}
                                                    {
                                                        <Link onClick={() => { _this.editEmpLeave(item.EmployeeId, item.LeaveDate) }}><i title='edit Leave' className='far fa-edit'></i></Link>
                                                    }
                                                </td>
                                            }
                                            {userRole !== 'Admin' &&
                                                <td style={{ width: '157px' }}>
                                                    {
                                                        (item.IsApproved === true) && <i title='Don`t delete Leave' style={{ color: '#008000' }} className="fa fa-check"></i>
                                                    }
                                                    {
                                                        (item.IsApproved === false) && <Link onClick={() => _this.deleteEmployeeLeave(item.LeaveId, item.EmployeeId)} title='Delete Leave' ><i className="fa fa-trash"></i></Link >
                                                    }
                                                    {<i className="check-space" >{" "}</i>}
                                                    {
                                                        (item.IsApproved === true) && <i title='Don`t edit Leave' style={{ color: '#008000' }} className="fa fa-check"></i>
                                                    }
                                                    {
                                                        (item.IsApproved === false) && <Link onClick={() => { _this.editEmpLeave(item.EmployeeId, item.LeaveDate) }} ><i title='edit Leave' className='far fa-edit'></i></Link >
                                                    }
                                                </td>
                                            }
                                        </tr>
                                    })
                                }
                                {leaveData.data == '' && <tr colSpan='4'><td   >No Records Found ?</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="modal-footer"></div>
            </div>
        )
    }
}
const mapstatetoprops = (state) => {
    return {
        employeeData: state.employeeData,
        userRole: state.dashboardData.userRole,
        dashboardData: state.dashboardData,
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getLeaveData, employeeLeaveCount, getLeaveDataById, editLeaveDataMap, getUpdateEmpYear }, dispatch);
}
export default connect(mapstatetoprops, mapDispatchToProps)(LeaveStatus)
