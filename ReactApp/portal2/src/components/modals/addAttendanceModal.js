import React from 'react'
import Modal from 'react-modal';
import moment from 'moment';
import { updateAttendance } from '../../actions/attendanceAction'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/react-datepicker.css';



class AddAttendanceModal extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.attendanceItem)
        this.state = {
            date: new Date(),
            attendanceId: this.props.attendanceItem.length == 0 ? '' : this.props.attendanceItem[0].AttendanceId == null ? "" : this.props.attendanceItem[0].AttendanceId,
            employeeId: this.props.attendanceItem.length == 0 ? '' : this.props.attendanceItem[0].EmployeeId,
            type: this.props.attendanceItem.length == 0 ? '' : this.props.attendanceItem[0].Type,
            attendanceDate: this.props.attendanceItem.length == 0 ? '' : this.props.attendanceItem[0].Date,
            attendanceType: this.props.attendanceItem.length == 0 ? '' : this.changeAttendanceType(props.attendanceItem[0].Attendance),
            inTime: this.props.attendanceItem.length == 0 ? '' : this.props.attendanceItem[0].InTime == null ? '' : new Date(this.props.attendanceItem[0].InTime),
            outTime: this.props.attendanceItem.length == 0 ? '' : this.props.attendanceItem[0].OutTime == null ? '' : new Date(this.props.attendanceItem[0].OutTime),
            duration: this.props.attendanceItem.length == 0 ? '' : this.props.attendanceItem[0].TotalTime == null ? '' : this.props.attendanceItem[0].TotalTime == null,
            isWorkFromHome: this.props.attendanceItem.length == 0 ? false : this.props.attendanceItem[0].IsWorkFromHome,
            remarks: this.props.attendanceItem.length == 0 ? '' : this.props.attendanceItem[0].Remarks == null ? '' : this.props.attendanceItem[0].Remarks,
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

    toggleModal() {
        this.props.toggle();
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

    changeCheckBoxValue = (event) => {
        this.setState({
            [event.target.name]: event.target.checked
        })
    }

    render() {
        const _this = this;
        return (
            <>
                <Modal isOpen={this.props.isOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.toggleModal} ariaHideApp={false} className='modal-style' contentLabel="">
                    <div id='addAttendanceModal' className={'v-modal-transparet-header'}>
                        <div className={'modal fade-in'} style={{ display: 'block' }}>
                            <div className={'modal-dialog modal-wd95pc-mwd-618'} style={{ margin: '8.75rem 48.75rem' }}>
                                <form onSubmit={this.handleSubmit} >
                                    <div className={'modal-dialog modal-lg'}>
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <input type='hidden' name="employeeId" value={this.state.employeeId} />
                                                <input type='hidden' name="attendanceId" value={this.state.attendanceId} />
                                                <h4 style={{ marginRight: "auto" }} ><i className='far fa-edit'></i>  Edit Attendance</h4>
                                                <div className='inline-block right pdT9'><span id='spnCancel' className='cursor-pointer v-bold' onClick={_this.cancelModal}>X</span></div>
                                            </div>
                                            <div className="modal-body" >
                                                <div className="form-horizontal">
                                                    <div className="row">
                                                        <label className="col-sm-4 control-label">Date</label>
                                                        <div className="col-sm-8 input-group">
                                                            <input type="text" name="attendanceDate" value={moment(new Date(_this.state.attendanceDate)).format("DD/MM/YYYY")} className="form-control" disabled id="inputtxtDate" />
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
                                                            <DatePicker
                                                                selected={this.state.inTime}
                                                                onChange={(date) => this.setState({ inTime: date })}
                                                                showTimeSelect
                                                                showTimeSelectOnly
                                                                timeIntervals={15}
                                                                timeCaption="Time"
                                                                dateFormat="h:mm aa"
                                                                className="form-control"
                                                                name="inTime"
                                                            />
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <div className="row">
                                                        <label className="col-sm-4 control-label">Out Time (24 Hrs)</label>
                                                        <div className="col-sm-8 input-group" id='txtOutTime'>
                                                            <DatePicker
                                                                selected={this.state.outTime}
                                                                onChange={(date) => this.setState({ outTime: date })}
                                                                showTimeSelect
                                                                showTimeSelectOnly
                                                                timeIntervals={15}
                                                                timeCaption="Time"
                                                                dateFormat="h:mm aa"
                                                                className="form-control"
                                                                name="outTime"
                                                            />
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
                                                            <input type="time" name="duration" disabled value={_this.state.duration} onChange={_this.changeSubmit} id="txtDuration" className="form-control" />
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
                    </div>
                </Modal>
            </>
        )
    }
}
export default AddAttendanceModal
