import React from 'react'
import AddTaxSavingModal from '../../../components/modals/addTaxSavingsModal'
import ApproveReceiptModal from '../../../components/modals/approveReceiptModal'
import { taxSavingExcelExport, copyPriviousReciept, deleteTaxSaving, editTaxSaving } from '../../../actions/employeeActions'
import { exportExcel } from '../../../common/addExcel'
import DeleteConformModal from '../../../components/modals/deleteConformModal'

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
            modalType: '',
            reverseYear: [],
            userId: '',
            item: [],
            userName: '',
            FYear: ''
        }
    }

    componentDidMount() {
        this.academicYear()
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    changeUser = () => {
        const userId = document.getElementById('inputUserId').value;
        const financialYear = document.getElementById('inputFinancialYear').value;
        this.setState({
            userId: userId
        })
        this.props.getTaxSavingReceipt(userId, financialYear)
    }

    academicYear = () => {
        var date = new Date();
        var reverseYear = [];
        for (var i = 2014; i <= date.getFullYear(); i++) {
            const collection = {
                value: i,
                text: i + "-" + (parseInt(i.toString().substring(2)) + 1)
            }
            reverseYear.push(collection);
        }
        this.setState({
            reverseYear: reverseYear.reverse()
        })
    }

    refreshData = () => {
        this.props.onPress();
    }

    approveReceipt = () => {
        this.setState({
            modalType: 'approveModal',
        })
        this.toggle();
    }

    copyPriviousReciept = async () => {
        const userId = document.getElementById('inputUserId').value;
        const currentYear = document.getElementById('inputFinancialYear').value;
        await copyPriviousReciept({ EmployeeId: userId, CurrentYear: currentYear })
        this.refreshData();
    }

    excelExport = () => {
        const userId = document.getElementById('inputUserId').value;
        const financialYear = document.getElementById('inputFinancialYear').value;
        var yearSelect = document.getElementById("inputFinancialYear");
        const financialText = document.getElementById('inputFinancialYear').options[yearSelect.selectedIndex].text;
        taxSavingExcelExport({ EmployeeId: userId, FinancialYear: financialYear, FinancialText: financialText }).then(res => {
            exportExcel(res)
        })
    }

    editTaxSavingReceipt = async () => {
        var userSelect = document.getElementById("inputUserId");
        const userName = document.getElementById('inputUserId').options[userSelect.selectedIndex].text;
        await editTaxSaving({ TaxSavingId: this.props.taxSavingId, EmployeeId: this.props.employeeId, FinancialYear: document.getElementById('inputFinancialYear').value }).then(res => {

            this.setState({
                item: res.data,
                userName: userName,
                modalType: 'addModal'
            })
        })
        this.toggle();
    }

    deleteTaxSaving = async (taxSavingId) => {
        await deleteTaxSaving({ taxSavingId: taxSavingId })
        this.refreshData();
        this.toggle()
    }

    addReceipt = () => {
        var userSelect = document.getElementById("inputUserId");
        var yearSelect = document.getElementById("inputFinancialYear");
        const userName = document.getElementById('inputUserId').options[userSelect.selectedIndex].text;
        const financialYear = document.getElementById('inputFinancialYear').options[yearSelect.selectedIndex].text;
        const userId = document.getElementById('inputUserId').value;
        this.setState({
            userName: userName,
            FYear: financialYear,
            userId: userId,
            item: [],
            modalType: 'addModal'
        })
        this.toggle();
    }

    render() {
        const usersData = this.props.employeeData
        const userRole = this.props.dashboardData.userRole
        const savingDataTable = this.props.employeeData.taxSaving
        return (
            <>
                <div className='row'>
                    <div className="col-md-6">
                        <div className="pull-left" ><h3>Tax Savings</h3></div>
                    </div>
                    <div id="container" className="col-md-6">
                        <div className="float-right">
                            <div className="pull-right">
                                <div className="btn-toolbar" role="toolbar" aria-label="...">
                                    <div className="btn-group" role="group" aria-label="...">
                                        <select className="form-control" disabled={userRole == 'Admin' ? false : true} id="inputUserId" value={this.state.userId == '' ? this.props.dashboardData.employeeId : this.state.userId} onChange={this.changeUser} name="userId" style={{ width: "170px" }}>
                                            {userRole == "Admin" && <option>All</option>}
                                            {
                                                usersData.users.map(function (item, index) {
                                                    return <option key={index} value={item.Value}>{item.Text}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <span>&nbsp;&nbsp;</span>
                                    <div className="btn-group" role="group" aria-label="...">
                                        <select id='getYear' onChange={this.changeUser} id="inputFinancialYear" className="form-control">
                                            {
                                                this.state.reverseYear.map(function (item, index) {
                                                    return <option key={index} value={`${item.value}`}>{item.text}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <span>&nbsp;&nbsp;</span>
                                    <div className="btn-group" role="group" aria-label="...">

                                        <div className="btn-group" role="group" aria-label="...">
                                            {savingDataTable != 0 ? <button id="copydisabled" disabled className="btn btn-default ir-btn-neutral-outline" data-toggle="tooltip" data-placement="bottom" title="" title="Copy Last Year">
                                                <i className="fa fa-copy"></i>
                                            </button> : <button id="copydisabled" className="btn btn-default ir-btn-neutral-outline" data-toggle="tooltip" onClick={this.copyPriviousReciept} data-placement="bottom" title="" title="Copy Last Year">
                                                    <i className="fa fa-copy"></i>
                                                </button>}
                                        </div>
                                        <div className="btn-group" role="group" aria-label="...">
                                            <button id="btnAdd" className="btn btn-default ir-btn-neutral-outline" onClick={this.addReceipt} title="Add receipt">
                                                <i className="fa fa-plus fa-fw"></i>
                                            </button>
                                        </div>
                                        <div className="btn-group" role="group" aria-label="...">
                                            {this.props.taxSavingId == "" ? <button id="btnEdit" disabled className="btn btn-default ir-btn-neutral-outline" onClick={this.editTaxSavingReceipt} data-toggle="tooltip" data-placement="bottom" title="Edit receipt">
                                                <i className="fa fa-edit fa-fw"></i>
                                            </button> : <button id="btnEdit" className="btn btn-default ir-btn-neutral-outline" onClick={this.editTaxSavingReceipt} data-toggle="tooltip" data-placement="bottom" title="Edit receipt">
                                                    <i className="fa fa-edit fa-fw"></i>
                                                </button>}
                                        </div>
                                        <div className="btn-group" role="group" aria-label="...">
                                            {this.props.taxSavingId == "" ? <button id="btnDelete" className="btn btn-default ir-btn-neutral-outline" disabled data-toggle="tooltip" data-placement="bottom" title="Delete receipt">
                                                <i className="fa fa-trash fa-fw"></i>
                                            </button> : <button id="btnDelete" className="btn btn-default ir-btn-neutral-outline" onClick={() => { this.toggle(this.setState({ modalType: "deleteModal" })) }} data-toggle="tooltip" data-placement="bottom" title="Delete receipt">
                                                    <i className="fa fa-trash fa-fw"></i>
                                                </button>}
                                        </div>
                                        <div className="btn-group" role="group" aria-label="...">
                                            <a id="btnExcelExport" href="#" className="btn btn-default ir-btn-neutral-outline" data-toggle="tooltip" onClick={this.excelExport} data-placement="bottom" title="Excel Export">
                                                <i className="fas fa-file-excel"></i>
                                            </a>
                                        </div>
                                        <div className="btn-group" role="group" aria-label="...">
                                            <button id="btnRefresh" className="btn btn-default ir-btn-neutral-outline" onClick={this.refreshData} data-toggle="tooltip" data-placement="bottom" title="Refresh Data">
                                                <i className="fas fa-sync-alt"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="btn-group" role="group" aria-label="...">
                                        {userRole == "Admin" ? <button id="btnApproveReceipt" className="btn btn-default ir-btn-neutral-outline" onClick={this.approveReceipt} data-toggle="tooltip" data-placement="bottom" title="Approve receipts">
                                            <i className="fas fa-thumbs-up"></i>
                                        </button> : <button id="btnApproveReceipt" disabled className="btn btn-default ir-btn-neutral-outline" data-toggle="tooltip" data-placement="bottom" title="Approve receipts">
                                                <i className="fas fa-thumbs-up"></i>
                                            </button>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {(this.state.isOpen == true && this.state.modalType == "addModal") && <AddTaxSavingModal isOpen={this.state.isOpen} toggle={this.toggle.bind(this)} employeeData={this.props.employeeData} refreshData={this.refreshData} editTaxSaving={this.state.item} userName={this.state.userName} FYear={this.state.FYear} userId={this.state.userId} employeeData={this.props.employeeData} />}
                {(this.state.isOpen == true && this.state.modalType == "approveModal") && <ApproveReceiptModal isOpen={this.state.isOpen} toggle={this.toggle.bind(this)} employeeData={this.props.employeeData} refreshData={this.refreshData} />}
                {(this.state.isOpen == true && this.state.modalType == "deleteModal") && <DeleteConformModal isOpen={this.state.isOpen} toggle={this.toggle.bind(this)} conformText={'Are you sure you want to permanently delete this record?'} id={this.props.taxSavingId} onClickEvent={this.deleteTaxSaving} />}
            </>
        )
    }
}
export default Header