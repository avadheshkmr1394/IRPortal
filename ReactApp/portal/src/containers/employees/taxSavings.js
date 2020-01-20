import React from "react";
import {  } from '../../actions/employeeActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import ReactTable from 'react-table'
import 'react-table/react-table.css';
import { TaxSavingModal } from '../../common/addModal'
import { getTaxSavingReceipt,getSavingTypes,editTaxSaving,copyPriviousReciept,taxSavingExcelExport } from '../../actions/employeeActions'
import { exportExcel } from '../../common/addExcel'
import { getFormattedTiming } from '../../common/utils';



class TaxSaving extends React.Component {
    constructor() {
        super();
        this.state = {
            item: [],
            reverseYear: [],
            userId: '',
            financialYear: (new Date()).getFullYear(),
            isOpen: false,
            userName: '',
            FYear: '',
            taxSavingId: '',
            employeeId: '',
            rowBackgroundColor: '',
            year: '',
            type: ''
        }
    }
    componentWillMount() {
        this.academicYear()
        this.setState({
            userId: this.props.dashboardData.EmployeeId
        })
        this.getSavingData(this.props.dashboardData.EmployeeId, this.state.financialYear)
    }
    changeUser = () => {
        const userId = document.getElementById('inputUserId').value;
        const financialYear = document.getElementById('inputFinacialYear').value;
        this.setState({
            userId: userId
        })
        this.getSavingData(userId, financialYear)
    }
    getSavingData = (userId, financialYear) => {
        this.props.getTaxSavingReceipt({ employeeId: userId, financialYear: financialYear })
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
    taxSavingReceipt = (item) => {
        if (item == false) {
            item = <span style={{ color: "#ff0000" }}>No</span>;
        }
        else if (item == true) {
            item = <span style={{ color: "#008000" }}>Yes</span>;
        }
        return item;
    }
    bindSavingDataTable = (items) => {
        const taxSavingArr = [];
        if (items.taxSaving.length != 0) {
            for (var i = 0; i < items.taxSaving.length; i++) {
                const collection = {
                    taxSavingId: items.taxSaving[i].TaxSavingId,
                    employeeId: items.taxSaving[i].EmployeeId,
                    fullName: items.taxSaving[i].FullName,
                    taxSavingTypeName: items.taxSaving[i].TaxSavingTypeName,
                    recurringFrequency: this.frequencyItem(items.taxSaving[i].RecurringFrequency),
                    savingDate: getFormattedTiming(items.taxSaving[i].SavingDate),
                    accountNumber: items.taxSaving[i].AccountNumber,
                    amount: items.taxSaving[i].Amount + "." + '00',
                    totalAmount: items.taxSaving[i].TotalAmount + "." + '00',
                    remarks: items.taxSaving[i].Remarks,
                    receiptSubmitted: this.taxSavingReceipt(items.taxSaving[i].ReceiptSubmitted)
                }
                taxSavingArr.push(collection)
            }
        }
        if (taxSavingArr.length == 0) {
            taxSavingArr.push({
                fullName: "No Row Found"
            })
        }
        return taxSavingArr;
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    editTaxSavingReceipt = async () => {
        var userSelect = document.getElementById("inputUserId");
        const userName = document.getElementById('inputUserId').options[userSelect.selectedIndex].text;
        await editTaxSaving({ TaxSavingId: this.state.taxSavingId, EmployeeId: this.state.employeeId, FinancialYear: document.getElementById('inputFinacialYear').value }).then(res => {
            this.setState({
                item: res.data,
                userName: userName,
                type: 'add'
            })
        })
        this.props.getSavingTypes();
        this.toggle();
    }
    selectTaxSavingRow = (taxsavingId, employeeId) => {
        this.setState({
            taxSavingId: taxsavingId,
            employeeId: employeeId,
            rowBackgroundColor: "#ffefbb"
        })
    }
    addReceipt = () => {
        var userSelect = document.getElementById("inputUserId");
        var yearSelect = document.getElementById("inputFinacialYear");
        const userName = document.getElementById('inputUserId').options[userSelect.selectedIndex].text;
        const financialYear = document.getElementById('inputFinacialYear').options[yearSelect.selectedIndex].text;
        const userId = document.getElementById('inputUserId').value;

        this.setState({
            userName: userName,
            FYear: financialYear,
            userId: userId,
            item: [],
            type: 'add'
        })
        this.props.getSavingTypes();
        this.toggle();
    }
    refreshData = () => {
        this.changeUser()
        this.setState({
            taxSavingId: '',
            employeeId: '',
            rowBackgroundColor: ""
        })
    }
    deleteTaxSavingReceipt = async () => {
        this.setState({
            type: 'deleteModal',
            taxSavingId: this.state.taxSavingId
        })
        this.toggle();
    }
    copyPriviousReciept = async () => {
        const userId = document.getElementById('inputUserId').value;
        const currentYear = document.getElementById('inputFinacialYear').value;
        await copyPriviousReciept({ EmployeeId: userId, CurrentYear: currentYear })
        this.refreshData();
    }
    excelExport = () => {
        const userId = document.getElementById('inputUserId').value;
        const financialYear = document.getElementById('inputFinacialYear').value;
        var yearSelect = document.getElementById("inputFinacialYear");
        const financialText = document.getElementById('inputFinacialYear').options[yearSelect.selectedIndex].text;
        taxSavingExcelExport({ EmployeeId: userId, FinancialYear: financialYear, FinancialText: financialText }).then(res => {
            exportExcel(res)
        })
    }
    approveReceipt = () => {
        this.setState({
            type: 'approveModal',
        })
        this.toggle();
    }
    render() {
        const usersdata = this.props.employeeData
        const savingDataTable = this.bindSavingDataTable(this.props.employeeData)
        const userRole = this.props.dashboardData.userRole

        const headerStyle = {
            backgroundColor: '#1abc9c',
            color: 'white',
            fontSize: 'small',
        }
        const columns = [
            {
                Header: "Employee",
                accessor: "fullName",
                headerStyle: headerStyle,
                width: 200,
                className: "td-border",
            },
            {
                Header: "Saving Type",
                accessor: "taxSavingTypeName",
                headerStyle: headerStyle,
                width: 200,
                className: "td-border",

            },
            {
                Header: "Frequency",
                accessor: "recurringFrequency",
                headerStyle: headerStyle,
                width: 150,
                className: "td-border",
            },
            {
                Header: "Date",
                accessor: "savingDate",
                headerStyle: headerStyle,
                width: 120,
                className: "td-border",
            },
            {
                Header: "Policy/Account No./Description",
                accessor: "accountNumber",
                headerStyle: headerStyle,
                width: 500,
                className: "td-border",
            },
            {
                Header: "Amount",
                accessor: "amount",
                headerStyle: headerStyle,
                width: 130,
                className: "td-border",
            },
            {
                Header: "Total Amount",
                accessor: "totalAmount",
                headerStyle: headerStyle,
                width: 150,
                className: "td-border",
            },
            {
                Header: "Remarks",
                accessor: "remarks",
                headerStyle: headerStyle,
                width: 250,
                className: "td-border",
            },
            {
                Header: "Receipt",
                accessor: "receiptSubmitted",
                headerStyle: headerStyle,
                width: 200,
                className: "td-border",
            },
        ]

        return (
            <>
                <div className="col-md-12" style={{ marginTop: "9px", marginBottom: "10px" }} >
                <div className="pull-left" style={{ color: "#2e508f" }} ><h3>Tax Savings</h3></div>
                    <div id="container" className="row ei-page-title">
                        <div className="col-md-12">
                            <div className="pull-right">
                                <div className="btn-toolbar" role="toolbar" aria-label="...">
                                    <div className="btn-group" role="group" aria-label="...">
                                        <select className="form-control" id="inputUserId" value={this.state.userId} onChange={this.changeUser} name="userId" style={{ width: "170px" }}>
                                            {userRole == "Admin" && <option>All</option>}
                                            {
                                                usersdata.users.map(function (item, index) {
                                                    return <option key={index} value={item.Value}>{item.Text}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <span>&nbsp;&nbsp;</span>
                                    <div className="btn-group" role="group" aria-label="...">
                                        <select id='getYear' onChange={this.changeUser} id="inputFinacialYear" className="form-control">
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
                                            {savingDataTable[0].fullName != "No Row Found" ? <button id="copydisabled" disabled className="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="" title="Copy Last Year">
                                                <i className="fa fa-copy"></i>
                                            </button> : <button id="copydisabled" className="btn btn-default" data-toggle="tooltip" onClick={this.copyPriviousReciept} data-placement="bottom" title="" title="Copy Last Year">
                                                    <i className="fa fa-copy"></i>
                                                </button>}
                                        </div>

                                        <div className="btn-group" role="group" aria-label="...">
                                            <button id="btnAdd" className="btn btn-default" onClick={this.addReceipt} title="Add receipt">
                                                <i className="fa fa-plus fa-fw"></i>
                                            </button>
                                        </div>
                                        <div className="btn-group" role="group" aria-label="...">
                                            {this.state.taxSavingId == "" ? <button id="btnEdit" disabled className="btn btn-default" onClick={this.editTaxSavingReceipt} data-toggle="tooltip" data-placement="bottom" title="Edit receipt">
                                                <i className="fa fa-edit fa-fw"></i>
                                            </button> : <button id="btnEdit" className="btn btn-default" onClick={this.editTaxSavingReceipt} data-toggle="tooltip" data-placement="bottom" title="Edit receipt">
                                                    <i className="fa fa-edit fa-fw"></i>
                                                </button>}
                                        </div>
                                        <div className="btn-group" role="group" aria-label="...">
                                            {this.state.taxSavingId == "" ? <button id="btnDelete" className="btn btn-default" disabled data-toggle="tooltip" data-placement="bottom" title="Delete receipt">
                                                <i className="fa fa-trash fa-fw"></i>
                                            </button> : <button id="btnDelete" className="btn btn-default" onClick={this.deleteTaxSavingReceipt} data-toggle="tooltip" data-placement="bottom" title="Delete receipt">
                                                    <i className="fa fa-trash fa-fw"></i>
                                                </button>}
                                        </div>
                                        <div className="btn-group" role="group" aria-label="...">
                                            <a id="btnExcelExport" href="javascript:void(0)" className="btn btn-default" data-toggle="tooltip" onClick={this.excelExport} data-placement="bottom" title="Excel Export">
                                                <i className="fa fa-file-excel-o fa-fw"></i>
                                            </a>
                                        </div>
                                        <div className="btn-group" role="group" aria-label="...">
                                            <button id="btnRefresh" className="btn btn-default" onClick={this.refreshData} data-toggle="tooltip" data-placement="bottom" title="Refresh Data">
                                                <i className="fa fa-refresh fa-fw"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="btn-group" role="group" aria-label="...">
                                        {userRole == "Admin" ? <button id="btnApproveReceipt" className="btn btn-default" onClick={this.approveReceipt} data-toggle="tooltip" data-placement="bottom" title="Approve receipts">
                                            <i className="fa fa-thumbs-o-up fa-fw"></i>
                                        </button> : <button id="btnApproveReceipt" disabled className="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Approve receipts">
                                                <i className="fa fa-thumbs-o-up fa-fw"></i>
                                            </button>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-fluid" style={{ padding: '20px 10px 30px' }}>
                    <ReactTable className="-highlight -striped"
                        columns={columns}
                        data={savingDataTable}
                        showPagination={false}
                        pageSize={savingDataTable.length}
                        sortable={false}
                        getTrProps={(state, rowInfo, column, instance) => {
                            return {
                                onClick: () => {
                                    this.selectTaxSavingRow(rowInfo.original.taxSavingId, rowInfo.original.employeeId)
                                },
                                style: {
                                    backgroundColor: (this.state.taxSavingId === rowInfo.original.taxSavingId) ? this.state.rowBackgroundColor : "",
                                    fontSize: 'small',
                                }
                            }
                        }}
                    />
                </div>
                {this.state.isOpen == true && <TaxSavingModal isOpen={this.state.isOpen} toggle={this.toggle} userName={this.state.userName} FYear={this.state.FYear} employeeData={this.props.employeeData} userId={this.state.userId} refreshData={this.refreshData} editTaxSaving={this.state.item} type={this.state.type} taxSavingId={this.state.taxSavingId} />}
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        employeeData: state.employeeData,
        dashboardData: state.dashboardData
    }
}
const dispactchstatetoprops = (dispatch) => {
    return bindActionCreators({ getTaxSavingReceipt, getSavingTypes }, dispatch)
}
export default connect(mapStateToProps, dispactchstatetoprops)(TaxSaving) 
