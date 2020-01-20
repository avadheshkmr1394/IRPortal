import React from 'react'
import Modal from 'react-modal';
import moment from 'moment';
import DateTimeField from "@1stquad/react-bootstrap-datetimepicker"
import { updateAttendance, deleteAttendance } from '../actions/attendanceAction'
import DatePicker from 'react-datepicker';
import { insertLeave, deleteLeave } from '../actions/leaveAction'
import { insertWorkLog, insertTaxSavingReceipt, deleteTaxSaving, approveTaxSavingReceipt } from '../actions/employeeActions'
import { updateUser, registerUser, deleteUserConfirmed, passwordConfirmed, userRolesConfirmed } from '../actions/adminAction'
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';



export class AttendanceModal extends React.Component {
    constructor(props) {
        
        super(props);
        this.state = {
            item: [],
            date: new Date(),
            attendanceId: props.item.length == 0 ? '' : props.item[0].AttendanceId == null ? "" : props.item[0].AttendanceId,
            employeeId: props.item.length == 0 ? '' : props.item[0].EmployeeId,
            type: props.item.length == 0 ? '' : props.item[0].Type,
            attendanceDate: props.item.length == 0 ? '' : props.item[0].Date,
            attendanceType: props.item.length == 0 ? '' : this.changeAttendanceType(props.item[0].Attendance),
            inTime: props.item.length == 0 ? '' : props.item[0].InTime == null ? '' : props.item[0].InTime,
            outTime: props.item.length == 0 ? '' : props.item[0].OutTime == null ? '' : props.item[0].OutTime,
            duration: props.item.length == 0 ? '' : props.item[0].TotalTime == null ? '' : props.item[0].TotalTime == null,
            isWorkFromHome: props.item.length == 0 ? false : props.item[0].IsWorkFromHome,
            remarks: props.item.length == 0 ? '' : props.item[0].Remarks == null ? '' : props.item[0].Remarks,
        }
        this.changeSubmit = this.changeSubmit.bind(this);
    }
    changeAttendanceType = (attendanceType) => {
        if (attendanceType == 0.5) {
            attendanceType = 1
        }
        else if (attendanceType == 1.0) {
            attendanceType = 2
        }
        else {
            attendanceType = 0
        }
        return attendanceType;
    }
    cancelModal = () => {
        this.props.toggle();
    }
    onChange = date => this.setState({ date })
    handleSubmit = async (event) => {
        event.preventDefault();
        var inTimevalue = document.getElementsByName("inTime")[0].value;
        var outTimevalue = document.getElementsByName("outTime")[0].value;
        this.state.inTime = inTimevalue.split(":")[0] < 10 ? '0' + (inTimevalue.substring(0, 5)).trim() : (inTimevalue.substring(0, 5)).trim();
        this.state.outTime = outTimevalue.split(":")[0] < 10 ? '0' + (outTimevalue.substring(0, 5)).trim() : (outTimevalue.substring(0, 5)).trim();
        this.state.attendanceDate = moment(new Date(this.state.attendanceDate)).format("YYYY-MM-DD")
        const jsonData = JSON.stringify(this.state)
        await updateAttendance({ attendanceJsonObj: jsonData })
        await this.props.refreshData()
        this.cancelModal()
    }
    changeSubmit = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    changeInTime = () => {
        this.setState({
            inTime: document.getElementsByName("inTime")[0].value == "" ? "12:00" : document.getElementsByName("inTime")[0].value,
        })
    }
    changeOutTime = (event) => {
        this.setState({
            outTime: document.getElementsByName("outTime")[0].value == "" ? "12:00" : document.getElementsByName("outTime")[0].value
        })
    }
    changeCheckBoxValue = (event) => {
        this.setState({
            [event.target.name]: event.target.checked
        })
    }
    deleteAttendance = async () => {
        const attendanceId = this.props.attendanceId
        await deleteAttendance({ attendanceId: attendanceId })
        await this.props.refreshData()
        this.cancelModal()
    }
    render() {
        const _this = this;
        return (
            <div>
                <Modal isOpen={this.props.isOpen} onRequestClose={this.props.toggle} ariaHideApp={false} className='modal-style'>
                    {this.props.type == 'edit' &&
                        <div id='addNewIdeaModal' className="v-modal">
                            <div className={'modal fade-in'} style={{ display: 'block' }}>
                                <form onSubmit={this.handleSubmit} >
                                    <div className={'modal-dialog modal-lg'}>
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <input type='hidden' name="employeeId" value={this.state.employeeId} />
                                                <input type='hidden' name="attendanceId" value={this.state.attendanceId} />
                                                <h4 style={{ marginRight: "auto" }} ><i className='far fa-edit'></i>  Edit Attendance</h4>
                                                <a href="javascript:void(0)" onClick={_this.cancelModal}>X</a>
                                            </div>

                                            <div className="modal-body" >
                                                <div className="form-horizontal">
                                                    <div className="row">
                                                        <label className="col-sm-4 control-label">Date</label>
                                                        <div className="col-sm-8 input-group">
                                                            <input type="text" name="attendanceDate"   value={moment(new Date(_this.state.attendanceDate)).format("DD/MM/YYYY")} className="form-control" disabled id="inputtxtDate" />
                                                            <span className="input-group-addon" id="date-icon">
                                                                <span className="glyphicon glyphicon-calendar"></span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <div className="row">
                                                        <label className="col-sm-4 control-label">Present/Absent</label>
                                                        <div className="col-sm-8">
                                                            <select id="cbAttendance" name="attendanceType" value={_this.state.attendanceType} onChange={_this.changeSubmit} className="form-control">
                                                                <option value="0">Absent</option>
                                                                <option value="1">Present (Half)</option>
                                                                <option value="2">Present (Full)</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <div className="row">
                                                        <label className="col-sm-4 control-label">In Time (24 Hrs)</label>
                                                        <div className="col-sm-8 input-group" id='txtInTime'>
                                                            <DateTimeField dateTime={this.state.inTime} name="inTime" onChange={this.changeintime} value={_this.state.inTime} className="form-control" mode="time" />
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <div className="row">
                                                        <label className="col-sm-4 control-label">Out Time (24 Hrs)</label>
                                                        <div className="col-sm-8 input-group" id='txtOutTime'>
                                                            <DateTimeField dateTime={this.state.outTime} onChange={this.changeOutTime} name="outTime" className="form-control" id="displayblock" value={_this.state.outTime} mode="time" />
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <div className="row">
                                                        <label className="col-sm-4 control-label"></label>
                                                        <div className="col-sm-8 input-group">
                                                            {_this.state.isWorkFromHome == false && <input type="checkbox" name="isWorkFromHome" value={_this.state.isWorkFromHome} onChange={_this.changeCheckBoxValue} id="checkboxWorkFromHome" />}
                                                            {_this.state.isWorkFromHome == true && <input type="checkbox" name="isWorkFromHome" value={_this.state.isWorkFromHome} onChange={_this.changeCheckBoxValue} checked id="checkboxWorkFromHome" />}Work from home
                                                  </div>
                                                    </div>
                                                    <br />
                                                    <div className="row">
                                                        <label className="col-sm-4 control-label">Duration</label>
                                                        <div className="col-sm-8">
                                                            <input type="time"  name="duration" disabled value={_this.state.duration} onChange={_this.changeSubmit} id="txtDuration" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <div className="row">
                                                        <label className="col-sm-4 control-label">Remark</label>
                                                        <div className="col-sm-8">
                                                            <input type="text" value={_this.state.remarks} id="txtremarks" name="remark" onChange={_this.changeSubmit} disabled className="form-control" />
                                                        </div>
                                                    </div>
                                                    <br />
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button id="ButtonOk" className="btn btn-success" data-placement="top" title="" data-original-title="Submit">OK</button>
                                                <button id="ButtonCancel" className="btn btn-default" data-placement="top" title="" data-original-title="Cancel" onClick={_this.cancelModal}>Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    }
                    {/* delete modal popup */}
                    {this.props.type == 'delete' &&
                        <div id='addNewIdeaModal' className="v-modal">
                            <div className={'modal fade-in'} style={{ display: 'block' }}>
                                <div className={'modal-dialog modal-lg'}>
                                    <div className="modal-content delete-modal">
                                        <div className="modal-header">
                                            <h4 style={{ marginRight: "auto" }} ><i className='fa fa-trash'></i> Delete</h4>
                                            <a href="javascript:void(0)" onClick={this.cancelModal}>X</a>
                                        </div>
                                        <div className="modal-body delete-modal" >
                                            <span>Are you sure you want to permanently delete this record?</span>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-success" onClick={this.deleteAttendance} id="deleteConfirm">Delete</button><button type="button" id="btnCancelDialog" className="btn btn-default" onClick={this.cancelModal} >Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </Modal>
            </div>
        )
    }
}
export class LeaveModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            leaveId: this.props.leaveId,
            employeeId: '',
            leaveFromDate: new Date(),
            leaveToDate: new Date(),
            leaveType: 'CL',
            leaveCount: '1.0',
            remarks: '',
            IsApproved: false,
        }
        this.fromDateChange = this.fromDateChange.bind(this);
        this.toDateChange = this.toDateChange.bind(this);
        this.omponentDidMount = this.componentDidMount.bind(this)
    }
    componentDidMount() {
        this.props.refreshData();
    }
    cancelModal = () => {
        this.props.toggle();
    }
    fromDateChange(dt) {
        this.setState({
            leaveFromDate: dt
        });
    }
    toDateChange(date) {
        this.setState({
            leaveToDate: date
        });
    }
    handleSubmit = async (event) => {

        event.preventDefault();
        await insertLeave(this.state);
        this.props.refreshData();
        this.cancelModal();
    }
    handlechange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    deleteLeave = async () => {
        await deleteLeave({ LeaveId: this.state.leaveId });
        this.props.refreshData();
        this.props.setLeaveId()
        this.cancelModal();
    }
    render() {
        const _this = this;
        const leaveRecords = this.props.leaveRecords
        return (
            <>
                <Modal isOpen={this.props.isOpen} onRequestClose={this.props.toggle} ariaHideApp={false} className='modal-style'>
                    {this.props.type == 'add' &&
                        <div id='addNewIdeaModal' className="v-modal">
                            <div className={'modal fade-in'} style={{ display: 'block' }}>
                                <form onSubmit={this.handleSubmit} >
                                    <div className={'modal-dialog modal-lg'}>
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h4 style={{ marginRight: "auto" }}  ><i className='fa fa-plus-square-o'></i>  Add Leave</h4>
                                                <a href="javascript:void(0)" onClick={_this.cancelModal}>X</a>
                                            </div>
                                            <div className="modal-body leave-modal">
                                                <div className="form-horizontal">
                                                    <div className="row">
                                                        <label className="col-sm-4">From Date</label>
                                                        <div className="col-sm-8" id="LeaveDateFrom">
                                                            <DatePicker name='leaveFromDate' onChange={this.fromDateChange} required selected={new Date(this.state.leaveFromDate)} className="form-control date-picker" />
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <div className="row">
                                                        <label className="col-sm-4 control-label">To Date</label>
                                                        <div className="col-sm-8" id="LeaveDateTo">
                                                            <DatePicker name='leaveToDate' onChange={this.toDateChange} required selected={new Date(this.state.leaveToDate)} className="form-control date-picker" />
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <div className="row">
                                                        <label className="col-sm-4 control-label">Leave Type</label>
                                                        <div className="col-sm-8">
                                                            <select id="ComboBoxLeaveType" onChange={this.handlechange} value={this.state.leaveType} name="leaveType" className="form-control">
                                                                <option value="CL">Casual Leave</option>
                                                                <option value="SL">Sick Leave</option>
                                                                <option value="EL">Earned Leave</option>
                                                                <option value="EW">Extra Work</option>
                                                                <option value="LWP">Leave Without Pay</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <div className="row">
                                                        <label className="col-sm-4 control-label">Period</label>
                                                        <div className="col-sm-8">
                                                            <select id="ComboBoxLeaveCount" onChange={this.handlechange} value={this.state.leaveCount} name="leaveCount" className="form-control">
                                                                <option value="0.5">Half Day</option>
                                                                <option value="1.0">Full Day</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <div className="row">
                                                        <label className="col-sm-4 control-label">Remark</label>
                                                        <div className="col-sm-8">
                                                            <input type="text" id="TextAreaLeaveRemark" required  value={this.state.remarks} name="remarks" onChange={this.handlechange} className="form-control" />
                                                        </div>
                                                    </div>
                                                    <br />
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <input type='submit' className="btn btn-success" value='OK' />
                                                <button className="btn btn-default" style={{ borderColor: '#ccc' }} onClick={this.cancelModal} type='button' title="Cancel">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    }
                    {/* delete modal popup */}
                    {this.props.type == 'delete' &&
                        <div id='addNewIdeaModal' className="v-modal">
                            <div className={'modal fade-in'} style={{ display: 'block' }}>
                                <div className={'modal-dialog modal-lg'}>
                                    <div className="modal-content delete-modal">
                                        <div className="modal-header">
                                            <h4 style={{ marginRight: "auto" }} ><i className='fa fa-trash'></i> Delete</h4>
                                            <a href="javascript:void(0)" onClick={this.cancelModal}>X</a>
                                        </div>
                                        <div className="modal-body delete-modal" >
                                            <span>Are you sure you want to permanently delete this record?</span>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-success" onClick={this.deleteLeave} id="deleteConfirm">Delete</button><button type="button" id="btnCancelDialog" className="btn btn-default" onClick={this.cancelModal} >Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    {this.props.type == 'rowselection' &&
                        <div id='addNewIdeaModal' className="v-modal">
                            <div className={'modal fade-in'} style={{ display: 'block' }}>
                                <div className={'modal-dialog modal-lg'}>
                                    <div className="modal-content delete-modal">
                                        <div className="modal-header">
                                            <h4 style={{ marginRight: "auto" }} >Warning</h4>
                                            <a href="javascript:void(0)" onClick={this.cancelModal}>X</a>
                                        </div>
                                        <div className="modal-body delete-modal" >
                                            <span>Select a record to delete.</span>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" id="btnCancelDialog" className="btn btn-success" onClick={this.cancelModal} >OK</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {this.props.type == 'leaveRowSelectionModal' &&
                        <div id='addNewIdeaModal' className="v-modal">
                            <div className={'modal fade-in'} style={{ display: 'block' }}>
                                <div className={'modal-dialog modal-lg'}>
                                    <div className="modal-content delete-modal">
                                        <div className="modal-header">
                                            <h4 style={{ marginRight: "auto" }} >Warning</h4>
                                            <a href="javascript:void(0)" onClick={this.cancelModal}>X</a>
                                        </div>
                                        <div className="modal-body delete-modal" >
                                            <span>Select a record to Approve Leave</span>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" id="btnCancelDialog" className="btn btn-success" onClick={this.cancelModal} >OK</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {this.props.type == 'leaveRecordsModal' &&
                        <div id='addNewIdeaModal' className="v-modal">
                            <div className={'modal fade-in'} style={{ display: 'block' }}>
                                <div className={'modal-dialog modal-lg'}>
                                    <div className="modal-content delete-modal">
                                        <div className="modal-header">
                                            <h4 style={{ marginRight: "auto" }} >Leave Record</h4>
                                            <a href="javascript:void(0)" onClick={this.cancelModal}>X</a>
                                        </div>
                                        <div className="modal-body delete-modal" >

                                            <table className="table table-bordered table-striped table-sm" id="scrollbar">
                                                <thead className='green-color' style={{ display: 'block' }}>
                                                    <tr>
                                                        <th style={{ width: '151px' }}>Employee</th>
                                                        <th style={{ width: '151px' }}>Total CL</th>
                                                        <th style={{ width: '151px' }}>CL</th>
                                                        <th style={{ width: '151px' }}>Total EL</th>
                                                        <th style={{ width: '151px' }}>EL</th>
                                                        <th style={{ width: '151px' }}>Total SL</th>
                                                        <th style={{ width: '151px' }}>SL</th>
                                                    </tr>
                                                </thead>
                                                <tbody id='tbodyid' style={{ overflowY: 'auto', display: 'block' }}>
                                                    {
                                                        leaveRecords.map(function name(item, index) {
                                                            return <tr key={index}>
                                                                <td style={{ width: '151px' }}>{item.EmployeeName}</td>
                                                                <td style={{ width: '151px' }}>{item.TotalCL}</td>
                                                                <td style={{ width: '151px' }}>{item.CL}</td>
                                                                <td style={{ width: '151px' }}>{item.TotalEL}</td>
                                                                <td style={{ width: '151px' }}>{item.EL}</td>
                                                                <td style={{ width: '151px' }}>{item.TotalSL}</td>
                                                                <td style={{ width: '151px' }}>{item.SL}</td>
                                                            </tr>

                                                        })
                                                    }
                                                </tbody>
                                            </table>

                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" id="btnCancelDialog" className="btn btn-success" onClick={this.cancelModal} >OK</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                </Modal>
            </>
        )
    }
}
export class WorklogModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            TaskId: '',
            ProjectId: '',
            ViewId: "",
            UserId: '',
            WorkDateFrom: new Date(),
            WorkDateTo: new Date(),
            WorkHours: '',
            RemainHours: '',
            Comment
        }
        this.fromDateChange = this.fromDateChange.bind(this);
        this.toDateChange = this.toDateChange.bind(this);
    }
    fromDateChange(dt) {
        this.setState({
            WorkDateFrom: dt
        });
    }
    toDateChange(datevalue) {
        this.setState({
            WorkDateTo: datevalue
        });
    }
    cancelmodal = () => {
        this.props.toggle();
    }
    onChangeProject = (event) => {
        const projectid = event.target.value;
        this.setState({
            ProjectId: projectid
        })
        this.props.getalltasks(projectid)
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        this.state.UserId = document.getElementById('inputuserid').value;
        this.state.ViewId = document.getElementById('inputviewid').value;
        await insertWorkLog({ workLogJson: JSON.stringify(this.state) })
        this.props.refreshdata()
        this.cancelmodal();
    }
    changeSubmit = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        // if(event.target.name=="WorkHours"){
        //     this.setState({
        //         RemainHours:(9 - event.target.value)
        //     }) 
        // }
    }
    render() {
        const projects = this.props.employeeData.allProjects;
        const alltasks = this.props.employeeData.allTasks;
        const _this = this;
        return (
            <>
                <Modal isOpen={this.props.isOpen} onRequestClose={this.props.toggle} ariaHideApp={false} className='modal-style'>
                    <div id='addNewIdeaModal' className="v-modal">
                        <div className={'modal fade-in'} style={{ display: 'block' }}>
                            <div className={'modal-dialog modal-lg'}>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 style={{ marginRight: "auto" }}  ><i className='fa fa-plus-square-o'></i>   Add Worklog</h4>
                                            <a href="javascript:void(0)" onClick={this.cancelmodal}>X</a>
                                        </div>
                                        <div className="modal-body">
                                            <div className="form-horizontal">
                                                <div className="form-group" id="grpDdlProject">
                                                    <label for="ddlProject" className="col-sm-4 control-label">Projects</label>
                                                    <div className="col-sm-8" id="dfWorkDateUpdateWidget">
                                                        <input type="hidden" value={this.props.userId} id="inputuserid" />
                                                        <input type="hidden" value={this.props.viewid} id="inputviewid" />
                                                        <select className="form-control" id="ddlProject" name="ProjectId" onChange={this.onChangeProject}>
                                                            <option>---Select Project---</option>
                                                            {
                                                                projects.map(function (item, index) {
                                                                    return <option key={index} value={item.ProjectId}>{item.Name}</option>
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className="col-sm-8 col-sm-offset-4 has-error">
                                                        <span id="warningDdlProject" className="help-block hidden">Project is required.</span>
                                                    </div>
                                                </div>
                                                <div className="form-group" id="grpDdlIssues">
                                                    <label for="ddlIssues" className="col-sm-4 control-label">Tasks</label>
                                                    <div className="col-sm-8">
                                                        <input list="text_search" type="text" name="TaskId" onChange={_this.changeSubmit} className="task-item" tabIndex className="form-control" placeholder="search..." />
                                                        <datalist id="text_search" onClick={_this.selectid}>
                                                            {
                                                                alltasks.map(function (item, index) {
                                                                    return <option key={index} value={item.TaskId} label={item.IssueKeyAndSummary} />
                                                                })
                                                            }
                                                        </datalist>
                                                    </div>
                                                    <div className="col-sm-8 col-sm-offset-4 has-error">
                                                        <span id="warningDdlIssues" className="help-block hidden">Tasks is required.</span>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label for="chkAllTask" className="col-sm-4 control-label"></label>
                                                    <div className="col-sm-8">
                                                        <input id="chkAllTask" type="checkbox" onChange={this.changeSubmit} disabled /> All Tasks
                                                        </div>
                                                </div>
                                                <div className="form-group" id="grpDfWorkDateFrom">
                                                    <label for="dfWorkDateFrom" className="col-sm-4 control-label">Date From</label>
                                                    <div className="col-sm-8 input-group date" id="dfWorkDateFromWidget">
                                                        <DatePicker name='WorkDateFrom' onChange={this.fromDateChange} required selected={new Date(this.state.WorkDateFrom)} className="form-control date-picker" />
                                                    </div>
                                                    <div className="col-sm-8 col-sm-offset-4 has-error">
                                                        <span id="warningDfWorkDateFrom" className="help-block hidden">Date From is required.</span>
                                                    </div>
                                                </div>
                                                <div className="form-group" id="grpDfWorkDateTo">
                                                    <label for="dfWorkDateTo" className="col-sm-4 control-label">Date To</label>
                                                    <div className="col-sm-8 input-group date" id="dfWorkDateToWidget">
                                                        <DatePicker name='WorkDateTo' onChange={this.toDateChange} required selected={new Date(this.state.WorkDateTo)} className="form-control date-picker" />
                                                    </div>
                                                    <div className="col-sm-8 col-sm-offset-4 has-error">
                                                        <span id="warningDfWorkDateTo" className="help-block hidden">Date To is required.</span>
                                                    </div>
                                                </div>
                                                <div className="form-group" id="grpHours">
                                                    <label for="txthours" className="col-sm-4 control-label">Hours</label>
                                                    <div className="col-sm-8">
                                                        <input id="txthours" type="number" onChange={this.changeSubmit} name="WorkHours" className="form-control" />
                                                    </div>
                                                    <div className="col-sm-8 col-sm-offset-4 has-error">
                                                        <span id="warningHours" className="help-block hidden">Hours is required.</span>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label for="txtRemainingHours" className="col-sm-4 control-label">Remaining</label>
                                                    <div className="col-sm-8">
                                                        <input type="number" id="txtRemainingHours" name="RemainHours" onChange={this.changeSubmit} className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label for="txtComment" className="col-sm-4 control-label">Comment</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" id="txtComment" name="Comment" onChange={this.changeSubmit} className="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button id="btnSave" className="btn btn-success" data-toggle="tooltip" data-placement="top" title="Save">Save</button>
                                            <button id="btnWorklogCancel" className="btn btn-default" data-toggle="tooltip" data-placement="top" title="Cancel" onClick={this.cancelmodal} data-dismiss="modal">Cancel</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Modal>
            </>
        )
    }
}

export class TaxSavingModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeId: this.props.editTaxSaving.length == 0 ? '' : this.props.editTaxSaving[0].EmployeeId,
            taxSavingId: this.props.editTaxSaving.length == 0 ? '' : this.props.editTaxSaving[0].TaxSavingId,
            financialYear: this.props.editTaxSaving.length == 0 ? '' : `${this.props.editTaxSaving[0].FinancialYear}`,
            taxSavingType: this.props.editTaxSaving.length == 0 ? '' : `${this.props.editTaxSaving[0].TaxSavingType}`,
            recurringFrequency: this.props.editTaxSaving.length == 0 ? '1' : `${this.props.editTaxSaving[0].RecurringFrequency}`,
            savingDate: this.props.editTaxSaving.length == 0 ? new Date() : new Date(),
            accountNumber: this.props.editTaxSaving.length == 0 ? '' : this.props.editTaxSaving[0].AccountNumber,
            amount: this.props.editTaxSaving.length == 0 ? '' : `${this.props.editTaxSaving[0].Amount}`,
            remarks: this.props.editTaxSaving.length == 0 ? '' : this.props.editTaxSaving[0].Remarks,
            eligibleCount: this.props.editTaxSaving.length == 0 ? '' : this.props.editTaxSaving[0].EligibleCount,
            tsId: []
        }
        this.dateChange = this.dateChange.bind(this);
    }

    cancelModal = () => {
        this.props.toggle();
    }
    dateChange(dt) {
        this.setState({
            savingDate: dt
        });
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        const receiptEligibleCount = document.getElementById('receiptEligibleCount').value;
        if (this.state.financialYear == '') {
            const date = document.getElementById('inputDate').value
            this.state.financialYear = `${(new Date(date)).getFullYear()}`
        }
        this.state.eligibleCount = receiptEligibleCount
        if (this.state.employeeId == '') {
            const employeeId = document.getElementById('inputUserId').value
            this.state.employeeId = employeeId
        }
        const jsonData = JSON.stringify(this.state)
        await insertTaxSavingReceipt({ jsonData: jsonData, taxSavingId: this.state.taxSavingId })
        this.props.refreshData();
        this.cancelModal();
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    deleteTaxSaving = async () => {
        await deleteTaxSaving({ taxSavingId: this.props.taxSavingId })
        this.props.refreshData();
        this.cancelModal();
    }
    frequencyItem = (item) => {
        if (item == 1) {
            item = "Yearly"
        }
        else if (item == 2) {
            item = "Half-Yearly"
        }
        else if (item == 4) {
            item = "Quarterly"
        }
        else if (item == 12) {
            item = "Monthly"
        }
        return item;
    }
    checkUncheckCheckbox = () => {
        var arrayCollection = []
        var selectAllCheckbox = document.getElementById("checkUncheckAll");
        if (selectAllCheckbox.checked == true) {

            var checkboxes = document.getElementsByName("rowSelectCheckBox");
            for (var i = 0, n = checkboxes.length; i < n; i++) {
                if (i != 0) {
                    arrayCollection.push({ TaxSavingId: checkboxes[i].value })
                }
                checkboxes[i].checked = true;
            }
            this.setState({
                tsId: arrayCollection
            })
        } else if (selectAllCheckbox.checked == false) {
            var checkboxes = document.getElementsByName("rowSelectCheckBox");
            for (var i = 0, n = checkboxes.length; i < n; i++) {
                checkboxes[i].checked = false;
            }
            this.setState({
                tsId: []
            })
        }
    }
    singlecheckUncheckCheckbox = () => {
        var arrayCollection = []
        var checkboxes = document.getElementsByName("rowSelectCheckBox");
        for (var i = 0, n = checkboxes.length; i < n; i++) {
            if (checkboxes[i].checked == true) {
                arrayCollection.push({ TaxSavingId: checkboxes[i].value })
                checkboxes[i].checked = true;
            }
            else {
                checkboxes[i].checked = false;
            }
        }
        this.setState({
            tsId: arrayCollection
        })
    }
    approveTaxSavingReceipt = async () => {
        await approveTaxSavingReceipt({ jsonData: JSON.stringify(this.state.tsId) });
        this.props.refreshData();
        this.cancelModal();
    }
    render() {
        const usersData = this.props.employeeData
        const _this = this;
        return (
            <>
                <Modal isOpen={this.props.isOpen} onRequestClose={this.props.toggle} ariaHideApp={false} className='modal-style'>
                    {
                        this.props.type == "add" && <div id='addNewIdeaModal' className="v-modal">
                            <div className={'modal fade-in'} style={{ display: 'block' }}>
                                <div className={'modal-dialog modal-lg'}>
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                {this.state.taxSavingId == '' && <h4 style={{ marginRight: "auto" }}  ><i className='fa fa-plus-square-o'></i>   Add receipt of {this.props.userName} for year {this.props.FYear}</h4>}
                                                {this.state.taxSavingId != '' && <h4 style={{ marginRight: "auto" }}  ><i className='fa fa-edit'></i> Edit receipt for policy/account no. {this.state.accountNumber}</h4>}
                                                <a href="javascript:void(0)" onClick={this.cancelModal}>X</a>
                                            </div>
                                            <div className="modal-body">
                                                <div className="form-horizontal">
                                                    <input type='hidden' value={this.props.userId} id="inputuserid" />
                                                    {this.props.userName == "All" && <div id="grpEmployee" className="row">
                                                        <label className="col-sm-4 control-label">Employee</label>
                                                        <div className="col-sm-8">
                                                            {this.state.employeeId == '' ? <select className="form-control" onChange={this.handleChange} value={this.state.employeeId} name="employeeId" >
                                                                <option>All</option>
                                                                {
                                                                    usersData.users.map(function (item, index) {
                                                                        return <option key={index} value={item.Value}>{item.Text}</option>
                                                                    })
                                                                }
                                                            </select> : <select className="form-control" disabled onChange={this.handleChange} value={this.state.employeeId} name="employeeId" >
                                                                    <option>All</option>
                                                                    {
                                                                        usersData.users.map(function (item, index) {
                                                                            return <option key={index} value={item.Value}>{item.Text}</option>
                                                                        })
                                                                    }
                                                                </select>}
                                                        </div>
                                                        <div className="col-sm-8 col-sm-offset-4 has-error">
                                                            <span id="warningEmployee" className="help-block hidden">All can not be selected as employee.</span>
                                                        </div>
                                                    </div>}
                                                    <br />
                                                    <div id="grpSavingType" className="row">
                                                        <label className="col-sm-4 control-label">Saving Type</label>
                                                        <div className="col-sm-8">
                                                            <select className="form-control" onChange={this.handleChange} value={this.state.taxSavingType} name="taxSavingType" >
                                                                {
                                                                    usersData.taxSavingTypes.map(function (item, index) {
                                                                        return <option key={index} value={item.Value}>{item.Text}</option>
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <div id="grpRecurringFrequency" className="row">
                                                        <label className="col-sm-4 control-label">Frequency</label>
                                                        <div className="col-sm-3">
                                                            <select id="ddlRecurringFrequency" onChange={this.handleChange} value={this.state.recurringFrequency} name="recurringFrequency" className="form-control">
                                                                <option value="1">Yearly</option>
                                                                <option value="2">Half-Yearly</option>
                                                                <option value="4">Quarterly</option>
                                                                <option value="12">Monthly</option>
                                                            </select>
                                                        </div>

                                                        <div className="col-sm-5">
                                                            <label className="col-sm-4 control-label" style={{ paddingTop: "0px" }}>Eligible Count</label>
                                                            <div className="col-sm-8">
                                                                <input id="receiptEligibleCount" style={{ marginTop: '-52px', marginLeft: '87px' }} min="1" value={this.state.recurringFrequency} onChange={this.handlechange} type="number" name="eligibleCount" className="form-control" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <div className="row">
                                                        <label className="col-sm-4 control-label">Date</label>
                                                        <div className="col-sm-8">
                                                            <DatePicker onChange={this.dateChange} placeholderText="MM/DD/YYYY" required selected={this.state.savingDate} id="inputDate" className="form-control date-picker" />
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <div id="grpAccount" className="row">
                                                        <label className="col-sm-4 control-label">Policy/Account No.</label>
                                                        <div className="col-sm-8">
                                                            <input type="text" id="txtAccount" value={this.state.accountNumber} onChange={this.handleChange} name="accountNumber" className="form-control" />
                                                        </div>

                                                    </div>
                                                    <br />
                                                    <div id="grpAmount" className="row">
                                                        <label className="col-sm-4 control-label">Amount</label>
                                                        <div className="col-sm-8">
                                                            <input type="number" min="0" id="txtAmount" name="amount" value={this.state.amount} onChange={this.handleChange} className="form-control" />
                                                        </div>

                                                    </div>
                                                    <br />
                                                    <div className="row">
                                                        <label className="col-sm-4 control-label">Total Amount</label>
                                                        <div className="col-sm-8">
                                                            <input type="text" id="txtTotalAmount" value={this.state.amount * this.state.recurringFrequency} disabled className="form-control" />
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <div className="row">
                                                        <label className="col-sm-4 control-label">Remarks</label>
                                                        <div className="col-sm-8">
                                                            <input type="text" id="txtRemarks" name="remarks" value={this.state.remarks} onChange={this.handleChange} className="form-control" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button id="btnSave" className="btn btn-success" data-placement="top" title="Save">Save</button>
                                                <button id="btnWorklogCancel" className="btn btn-default" data-toggle="tooltip" data-placement="top" title="Cancel" onClick={this.cancelModal} data-dismiss="modal">Cancel</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>}
                    {this.props.type == "deleteModal" &&
                        <div id='addNewIdeaModal' className="v-modal">
                            <div className={'modal fade-in'} style={{ display: 'block' }}>
                                <div className={'modal-dialog modal-lg'}>
                                    <div className="modal-content delete-modal">
                                        <div className="modal-header">
                                            <h4 style={{ marginRight: "auto" }} ><i className='fa fa-trash'></i> Delete</h4>
                                            <a href="javascript:void(0)" onClick={this.cancelModal}>X</a>
                                        </div>
                                        <div className="modal-body delete-modal" >
                                            <span>Are you sure you want to permanently delete this record?</span>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-success" onClick={this.deleteTaxSaving} id="deleteConfirm">Delete</button><button type="button" id="btnCancelDialog" className="btn btn-default" onClick={this.cancelModal} >Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {this.props.type == "approveModal" &&
                        <div id='addNewIdeaModal' className="v-modal">
                            <div className={'modal fade-in'} style={{ display: 'block' }}>
                                <div className={'modal-dialog modal-lg'}>
                                    <div className="modal-content delete-modal">
                                        <div className="modal-header ">
                                            <h4 style={{ marginRight: "auto" }} >Approve receipts</h4>
                                            <a href="javascript:void(0)" onClick={this.cancelModal}>X</a>
                                        </div>
                                        <div className="modal-body delete-modal" >
                                            <table className="table table-bordered table-striped table-sm" id="scrollbar">
                                                <thead className='green-color' style={{ display: 'block' }}>
                                                    <tr>
                                                        <th style={{ width: '50' }}><input name="rowSelectCheckBox" id="checkUncheckAll" onClick={() => _this.checkUncheckCheckbox()} type="checkbox" /></th>
                                                        <th style={{ width: '200px' }}>Policy/Account No.</th>
                                                        <th style={{ width: '150px' }}>Saving Type</th>
                                                        <th style={{ width: '100px' }}>Recurring</th>
                                                        <th style={{ width: '100px' }}>Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody id='tbodyid' style={{ overflowY: 'auto', display: 'block' }}>
                                                    {
                                                        usersData.taxSaving.map(function (item, index) {
                                                            return <tr key={index}>
                                                                <td style={{ width: '50' }}><input type="checkbox" name="rowSelectCheckBox" value={item.TaxSavingId} onClick={() => _this.singlecheckUncheckCheckbox()} /></td>
                                                                <td style={{ width: '200px' }}>{item.AccountNumber}</td>
                                                                <td style={{ width: '150px' }}>{item.TaxSavingTypeName}</td>
                                                                <td style={{ width: '100px' }} >{_this.frequencyItem(item.RecurringFrequency)}</td>
                                                                <td style={{ width: '100px' }}>{item.TotalAmount}</td>
                                                            </tr>

                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="modal-footer">
                                            {this.state.tsId.length == 0 ? <button type="button" className="btn btn-success" disabled id="ApproveConfirm">Approve</button> : <button type="button" className="btn btn-success" onClick={this.approveTaxSavingReceipt} id="ApproveConfirm">Approve</button>}<button type="button" id="btnCancelDialog" className="btn btn-default" onClick={this.cancelModal} >Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </Modal>
            </>
        )
    }
}
export class UserModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UserName: this.props.user.length == 0 ? '' : this.props.user[0].UserName,
            FirstName: this.props.user.length == 0 ? '' : this.props.user[0].FirstName,
            LastName: this.props.user.length == 0 ? '' : this.props.user[0].LastName,
            Email: this.props.user.length == 0 ? '' : this.props.user[0].Email,
            PhoneNumber: this.props.user.length == 0 ? '' : this.props.user[0].PhoneNumber,
            Status: this.props.user.length == 0 ? '0' : this.props.user[0].Status,
            Password: '',
            Confirmpassword: '',
            NewPassword: '',

        }
    }
    componentWillUnmount() {
        this.props.refreshData()
    }
    cancelModal = () => {
        this.props.toggle();
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        if (this.state.Password == '') {
            await updateUser(this.state)
        }
        else {
            await registerUser(this.state);
        }
        this.componentWillUnmount();
        this.cancelModal()
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    deleteUser = async (username) => {
        await deleteUserConfirmed({ UserName: username })
        this.componentWillUnmount();
        this.cancelModal()
    }
    resetPassword = (event) => {
        event.preventDefault();
        if (this.state.UserName != '' && this.state.NewPassword != '') {
            passwordConfirmed(this.state);
            this.componentWillUnmount();
            this.cancelModal()
        }
    }
    manageUserRole = () => {
        var role = [];
        const checkboxes = document.getElementsByName('RoleName')
        for (var i = 0, n = checkboxes.length; i < n; i++) {
            let collection = '';
            if (checkboxes[i].checked == true) {
                collection = {
                    RoleName: checkboxes[i].value,
                    Selected: checkboxes[i].checked
                }
            }
            else {
                collection = {
                    RoleName: checkboxes[i].value,
                    Selected: checkboxes[i].checked
                }
            }
            role.push(collection)
        }
        userRolesConfirmed({ Roles: role, UserName: this.state.UserName })
        this.componentWillUnmount();
        this.cancelModal()
    }
    render() {

        return (
            <>
                <Modal isOpen={this.props.isOpen} onRequestClose={this.props.toggle} ariaHideApp={false} className='modal-style'>
                    {(this.props.modalType == 'edit' || this.props.modalType == 'add') &&
                        <div id='addNewIdeaModal' className="v-modal">
                            <div className={'modal fade-in'} style={{ display: 'block' }}>
                                <div className={'modal-dialog modal-lg'}>
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                {this.props.modalType == 'edit' && <h4 style={{ marginRight: "auto" }} ><i className='fa fa-edit'></i> Edit User Details  </h4>}
                                                {this.props.modalType == 'add' && <h4 style={{ marginRight: "auto" }} ><i className='fa fa-edit'></i> Register New User  </h4>}
                                                <a href="javascript:void(0)" onClick={this.cancelModal}>X</a>
                                            </div>
                                            <div className="modal-body">
                                                <div className="form-horizontal">
                                                    <div className="row">
                                                        <label className="col-md-3">User Name</label>
                                                        <div className="col-md-7">
                                                            {this.props.modalType == 'edit' && <input type="text" className="form-control" disabled name="UserName" value={this.state.UserName} />}
                                                            {this.props.modalType == 'add' && <input type="text" className="form-control" onChange={this.handleChange} name="UserName" value={this.state.UserName} />}
                                                        </div>
                                                    </div>
                                                    <br />
                                                    {this.props.modalType == 'add' && <div className="row">
                                                        <label className="col-md-3">Password</label>
                                                        <div className="col-md-7">
                                                            <input type="text" className="form-control" onChange={this.handleChange} name="Password" value={this.state.Password} />
                                                        </div>
                                                    </div>}
                                                    {this.props.modalType == 'add' && <br />}
                                                    {this.props.modalType == 'add' && <div className="row">
                                                        <label className="col-md-3">Confirmpassword</label>
                                                        <div className="col-md-7">
                                                            <input type="text" className="form-control" onChange={this.handleChange} name="Confirmpassword" value={this.state.Confirmpassword} />
                                                        </div>
                                                    </div>}
                                                    {this.props.modalType == 'add' && <br />}
                                                    <div className="row">
                                                        <label className="col-md-3">First Name</label>
                                                        <div className="col-md-7">
                                                            <input type="text" className="form-control" onChange={this.handleChange} name="FirstName" value={this.state.FirstName} />
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <div className="row">
                                                        <label className="col-md-3">Last Name</label>
                                                        <div className="col-md-7">
                                                            <input type="text" className="form-control" onChange={this.handleChange} name="LastName" value={this.state.LastName} />
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <div className="row">
                                                        <label className="col-md-3">Email</label>
                                                        <div className="col-md-7">
                                                            <input type="text" className="form-control" onChange={this.handleChange} name="Email" value={this.state.Email} />
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <div className="row">
                                                        <label className="col-md-3">Telephone</label>
                                                        <div className="col-md-7">
                                                            <input type="text" className="form-control" onChange={this.handleChange} name="PhoneNumber" value={this.state.PhoneNumber} />
                                                        </div>
                                                    </div>
                                                    <br />
                                                    {this.props.modalType == 'edit' && <div className="row">
                                                        <label className="col-md-3">Status</label>
                                                        <div className="col-md-7">
                                                            <select className="form-control" name="Status" onChange={this.handleChange} value={this.state.Status} >
                                                                <option value="1">Inactive</option>
                                                                <option value="0">Active</option>
                                                            </select>
                                                        </div>
                                                    </div>}
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                {this.props.modalType == 'edit' && <button id="btnSave" className="btn btn-success" data-placement="top" title="Save">Save</button>}
                                                {this.props.modalType == 'add' && <button id="btnSave" className="btn btn-success" data-placement="top" title="Save">Register</button>}
                                                <button id="btnWorklogCancel" className="btn btn-default" data-toggle="tooltip" data-placement="top" title="Cancel" onClick={this.cancelModal} data-dismiss="modal">Cancel</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    }
                    {this.props.modalType == "delete" &&
                        <div id='addNewIdeaModal' className="v-modal">
                            <div className={'modal fade-in'} style={{ display: 'block' }}>
                                <div className={'modal-dialog modal-lg'}>
                                    <div className="modal-content delete-modal">
                                        <div className="modal-header">
                                            <h4 style={{ marginRight: "auto" }} ><i className='fa fa-trash'></i> Delete User</h4>
                                            <a href="javascript:void(0)" onClick={this.cancelmodal}>X</a>
                                        </div>
                                        <div className="modal-body delete-modal" >
                                            <span><h4>Are you sure you want to delete this record?</h4></span>
                                            <table style={{ margin: 'auto' }}>
                                                <tbody >
                                                    <tr>
                                                        <th>User Name</th>
                                                        <td>&nbsp; : &nbsp;</td>
                                                        <td>{this.state.UserName}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>First Name</th>
                                                        <td>&nbsp; : &nbsp;</td>
                                                        <td>{this.state.FirstName}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Last Name</th>
                                                        <td>&nbsp; : &nbsp;</td>
                                                        <td>{this.state.LastName}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Email</th>
                                                        <td>&nbsp; : &nbsp;</td>
                                                        <td>{this.state.Email}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Telephone</th>
                                                        <td>&nbsp; : &nbsp;</td>
                                                        <td>{this.state.PhoneNumber}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-success" onClick={() => this.deleteUser(this.state.UserName)} id="deleteConfirm">Delete</button><button type="button" id="btnCancelDialog" className="btn btn-default" onClick={this.cancelModal} >Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    {this.props.modalType == "resetpassword" &&
                        <div id='addNewIdeaModal' className="v-modal">
                            <div className={'modal fade-in'} style={{ display: 'block' }}>
                                <div className={'modal-dialog modal-lg'}>
                                    <form onSubmit={this.resetPassword}>
                                        <div className="modal-content delete-modal">
                                            <div className="modal-header">
                                                <h4 style={{ marginRight: "auto" }} >Reset Password for user {this.state.UserName} </h4>
                                                <a href="javascript:void(0)" onClick={this.cancelModal}>X</a>
                                            </div>
                                            <div className="modal-body delete-modal" >
                                                <div className="form-horizontal">
                                                    <div className="row">
                                                        <label className="col-md-4">New Password</label>
                                                        <div className="col-md-7">
                                                            <input type="text" className="form-control" onChange={this.handleChange} name="NewPassword" value={this.state.NewPassword} />
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <div className="row">
                                                        <label className="col-md-4">Confirm Password</label>
                                                        <div className="col-md-7">
                                                            <input type="text" className="form-control" onChange={this.handleChange} name="Confirmpassword" value={this.state.Confirmpassword} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="submit" className="btn btn-success" id="Passwordconfirmed">Set password</button><button type="button" id="btnCancelDialog" className="btn btn-default" onClick={this.cancelModal} >Cancel</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    }
                    {this.props.modalType == "managerole" &&
                        <div id='addNewIdeaModal' className="v-modal">
                            <div className={'modal fade-in'} style={{ display: 'block' }}>

                                <div className={'modal-dialog modal-lg'}>
                                    <div className="modal-content delete-modal">
                                        <div className="modal-header">
                                            <h4 style={{ marginRight: "auto" }} > Roles for user {this.state.UserName}</h4>
                                            <a href="javascript:void(0)" onClick={this.cancelModal}>X</a>
                                        </div>
                                        <div className="modal-body delete-modal" >
                                            <span><h4>Select Role Assignments</h4></span>
                                            <br />
                                            <table>
                                                <tbody>
                                                    <tr >
                                                        {
                                                            this.props.user[0].Roles.map(function (item, index) {
                                                                return <td key={index}>
                                                                    {(item.RoleName == "Admin" && item.Selected == true) && <input type="checkbox" id="checkadmin" checked name='RoleName' value='Admin' />}  {(item.RoleName == "Admin" && item.Selected == false) && <input type="checkbox" id="checkadmin" name='RoleName' value='Admin' />} {item.RoleName == "Admin" && "Admin"}
                                                                    {(item.RoleName == "Client" && item.Selected == true) && <input type="checkbox" id="checkclient" checked name='RoleName' value='Client' />} {(item.RoleName == "Client" && item.Selected == false) && <input type="checkbox" id="checkclient" name='RoleName' value='Client' />}{item.RoleName == "Client" && "Client"}
                                                                    {(item.RoleName == "IR User" && item.Selected == true) && <input type="checkbox" id="checkiruser" checked name='RoleName' value='IR User' />}{(item.RoleName == "IR User" && item.Selected == false) && <input type="checkbox" id="checkiruser" name='RoleName' value='IR User' />}{item.RoleName == "IR User" && "IR User"}
                                                                </td>
                                                            })
                                                        }
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-success" onClick={this.manageUserRole} id="roleConfirm">Save</button><button type="button" id="btnCancelDialog" className="btn btn-default" onClick={this.cancelModal} >Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                </Modal>
            </>
        )
    }
}



