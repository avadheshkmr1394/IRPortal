import React from 'react'
import { getFormattedTiming } from '../../../common/utils';
import ReactTable from 'react-table'

class TaxSaving extends React.Component {
    constructor() {
        super();
        this.state = {
            taxSavingId: ''
        }
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
            if (this.props.dashboardData.userRole != 'Admin') {
                taxSavingArr.push({
                    taxSavingTypeName: "No Row Found"
                })
            }
            else {
                taxSavingArr.push({
                    fullName: "No Row Found"
                })
            }
        }

        return taxSavingArr;
    }

    selectTaxSavingRow = (taxsavingId, employeeId) => {
        this.props.selectTaxSavingRowData(taxsavingId, employeeId)
    }

    render() {
        const savingDataTable = this.bindSavingDataTable(this.props.employeeData)
        const headerStyle = {
            backgroundColor: '#1abc9c',
            color: 'white',
            fontSize: 'small',
        }
        const columns = [
            {
                Header: "Employee",
                accessor: "fullName",
                // headerStyle: headerStyle,
                width: 200,
                className: "header-class table-border",
            },
            {
                Header: "Saving Type",
                accessor: "taxSavingTypeName",
                // headerStyle: headerStyle,
                width: 200,
                className: "header-class table-border",

            },
            {
                Header: "Frequency",
                accessor: "recurringFrequency",
                // headerStyle: headerStyle,
                width: 150,
                className: "header-class table-border",
            },
            {
                Header: "Date",
                accessor: "savingDate",
                // headerStyle: headerStyle,
                width: 120,
                className: "header-class table-border",
            },
            {
                Header: "Policy/Account No./Description",
                accessor: "accountNumber",
                // headerStyle: headerStyle,
                width: 500,
                className: "header-class table-border",
            },
            {
                Header: "Amount",
                accessor: "amount",
                // headerStyle: headerStyle,
                width: 130,
                className: "header-class table-border",
            },
            {
                Header: "Total Amount",
                accessor: "totalAmount",
                // headerStyle: headerStyle,
                width: 150,
                className: "header-class table-border",
            },
            {
                Header: "Remarks",
                accessor: "remarks",
                // headerStyle: headerStyle,
                width: 250,
                className: "header-class table-border",
            },
            {
                Header: "Receipt",
                accessor: "receiptSubmitted",
                // headerStyle: headerStyle,
                width: 200,
                className: "header-class table-border",
            },
        ]
        if (this.props.dashboardData.userRole != 'Admin') {
            columns.shift()
        }
        return (
            <>
                <div className="row">
                    <div className="container-fluid">
                        <ReactTable className="-highlight IRTable"
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
                                        backgroundColor: (this.props.taxSavingId === rowInfo.original.taxSavingId) ? this.props.rowBackgroundColor : "",
                                        fontSize: 'small',
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
            </>
        )
    }
}
export default TaxSaving