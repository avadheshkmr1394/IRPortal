import React from 'react'
import Modal from 'react-modal';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/react-datepicker.css';
import { insertTaxSavingReceipt } from '../../actions/employeeActions'

class AddTaxSavingModal extends React.Component {
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
        }
        this.dateChange = this.dateChange.bind(this);
    }

    dateChange(selectedDate) {
        this.setState({
            savingDate: selectedDate
        });
    }

    toggleModal() {
        this.props.toggle();
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
        this.toggleModal();
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    render() {
        const usersData = this.props.employeeData
        const _this = this;
        return (
            <>
                <Modal isOpen={this.props.isOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.toggleModal} ariaHideApp={false} className='modal-style' contentLabel="">
                    <div id='addNewIdeaModal' className={'v-modal-transparet-header'}>
                        <div className={'modal fade-in'} style={{ display: 'block' }}>
                            <div className={'modal-dialog modal-wd95pc-mwd-618'} style={{ margin: '8.75rem 48.75rem' }}>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            {this.state.taxSavingId == '' && <h4 style={{ marginRight: "auto" }}  ><i className='fa fa-plus-square-o'></i>   Add receipt of {this.props.userName} for year {this.props.FYear}</h4>}
                                            {this.state.taxSavingId != '' && <h4 style={{ marginRight: "auto" }}  ><i className='fa fa-edit'></i> Edit receipt for policy/account no. {this.state.accountNumber}</h4>}
                                            <div className='inline-block right pdT9'><span id='spnCancel' className='cursor-pointer v-bold' onClick={() => this.props.toggle()}>X</span></div>
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
                                                        <DatePicker className='form-control' selected={this.state.savingDate}
                                                            onChange={this.dateChange}
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            placeholderText="MM/DD/YYYY" id="inputDate" />
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
                                            <button id="btnWorklogCancel" className="btn btn-default" data-toggle="tooltip" data-placement="top" title="Cancel" onClick={() => this.props.toggle()} data-dismiss="modal">Cancel</button>
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
export default AddTaxSavingModal

