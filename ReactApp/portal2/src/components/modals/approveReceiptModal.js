import React from 'react'
import Modal from 'react-modal';
import moment from 'moment';
import { approveTaxSavingReceipt } from '../../actions/employeeActions'


class ApproveReceiptModal extends React.Component {
    constructor() {
        super()
        this.state = {
            tsId: []
        }
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
        this.toggleModal();
    }

    toggleModal() {
        this.props.toggle();
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

    render() {
        const usersData = this.props.employeeData
        const _this = this;
        return (
            <>
                <Modal isOpen={this.props.isOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.toggleModal} ariaHideApp={false} className='modal-style' contentLabel="">
                    <div id='addApproveReceiptModal' className="v-modal-transparet-header">
                        <div className={'modal fade-in'} style={{ display: 'block' }}>
                            <div className={'modal-dialog modal-wd95pc-mwd-618'} style={{ margin: '8.75rem 48.75rem' }}>
                                <div className="modal-content">
                                    <div className="modal-header ">
                                        <h4 style={{ marginRight: "auto" }} >Approve receipts</h4>
                                        <div className='inline-block right pdT9'><span id='spnCancel' className='cursor-pointer v-bold' onClick={() => { this.props.toggle(); }}>X</span></div>
                                    </div>
                                    <div className="modal-body" >
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
                                        {this.state.tsId.length == 0 ? <button type="button" className="btn btn-success" disabled id="ApproveConfirm">Approve</button> : <button type="button" className="btn btn-success" onClick={this.approveTaxSavingReceipt} id="ApproveConfirm">Approve</button>}<button type="button" id="btnCancelDialog" className="btn btn-default" onClick={() => this.props.toggle()} >Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </>
        )
    }
}

export default ApproveReceiptModal