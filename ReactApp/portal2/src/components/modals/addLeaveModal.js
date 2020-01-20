import React from 'react'
import Modal from 'react-modal';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/react-datepicker.css';
import { insertLeave } from '../../actions/leaveAction'
import Switch from "react-switch";

class AddLeaveModal extends React.Component {
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
            IsSecondHalf: false
        }
        this.fromDateChange = this.fromDateChange.bind(this);
        this.toDateChange = this.toDateChange.bind(this);
        // this.omponentDidMount = this.componentDidMount.bind(this)
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
        this.props.toggle()
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    toggleModal() {
        this.props.toggle();
    }

    handleSwitch = (checked) => {
        this.setState({ IsSecondHalf: checked });
    }
    render() {

        return (
            <>
                <Modal isOpen={this.props.isOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.toggleModal} ariaHideApp={false} className='modal-style' contentLabel="">
                    <div id='addLeaveModal' className={'v-modal-transparet-header'}>
                        <div className={'modal fade-in'} style={{ display: 'block' }}>
                            <div className={'modal fade-in'} style={{ display: 'block' }}>

                                <form onSubmit={this.handleSubmit} >
                                    <div className={'modal-dialog modal-lg modal-wd95pc-mwd-618'} style={{ margin: '8.75rem 48.75rem' }}>
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h4 style={{ marginRight: "auto" }}  ><i className='fa fa-plus-square-o'></i>  Add Leave</h4>
                                                <div className='inline-block right pdT9'><span id='spnCancel' className='cursor-pointer v-bold' onClick={() => { this.props.toggle(); }}>X</span></div>
                                            </div>
                                            <div className="modal-body leave-modal">
                                                <div className="form-horizontal">
                                                    <div className="row">
                                                        <label className="col-sm-4">From Date</label>
                                                        <div className="col-sm-8" id="LeaveDateFrom">
                                                            <DatePicker className='form-control' selected={new Date(this.state.leaveFromDate)}
                                                                onChange={this.fromDateChange}
                                                                showMonthDropdown
                                                                showYearDropdown
                                                                dropdownMode="select"
                                                                placeholderText="MM/DD/YYYY" />
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <div className="row">
                                                        <label className="col-sm-4 control-label">To Date</label>
                                                        <div className="col-sm-8" id="LeaveDateTo">
                                                            <DatePicker className='form-control' selected={new Date(this.state.leaveToDate)}
                                                                onChange={this.toDateChange}
                                                                showMonthDropdown
                                                                showYearDropdown
                                                                dropdownMode="select"
                                                                placeholderText="MM/DD/YYYY" />
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <div className="row">
                                                        <label className="col-sm-4 control-label">Leave Type</label>
                                                        <div className="col-sm-8">
                                                            <select id="ComboBoxLeaveType" onChange={this.handleChange} value={this.state.leaveType} name="leaveType" className="form-control">
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
                                                            <select id="ComboBoxLeaveCount" onChange={this.handleChange} value={this.state.leaveCount} name="leaveCount" className="form-control">
                                                                <option value="0.5">Half Day</option>
                                                                <option value="1.0">Full Day</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <br />

                                                    {this.state.leaveCount == '0.5' && <div className="row">
                                                        <label className="col-sm-4 control-label">Second Half</label>
                                                        <div className="col-sm-8">
                                                            <Switch onChange={this.handleSwitch} checked={this.state.IsSecondHalf}
                                                                onColor="#b2ec5c"
                                                                checkedIcon={<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", fontSize: 15, color: "orange", paddingRight: 2 }}>On</div>}
                                                                uncheckedIcon={<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", fontSize: 15, color: "orange", paddingRight: 2, }}>off</div>} />
                                                        </div>
                                                    </div>}
                                                    {this.state.leaveCount == '0.5' && <br />}
                                                    <div className="row">
                                                        <label className="col-sm-4 control-label">Remark</label>
                                                        <div className="col-sm-8">
                                                            <input type="text" id="TextAreaLeaveRemark" value={this.state.remarks} name="remarks" onChange={this.handleChange} className="form-control" />
                                                        </div>
                                                    </div>
                                                    <br />
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <input type='submit' className="btn btn-success" value='OK' />
                                                <button className="btn btn-default" style={{ borderColor: '#ccc' }} onClick={() => { this.props.toggle() }} type='button' title="Cancel">Cancel</button>
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
export default AddLeaveModal