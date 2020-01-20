import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css';
import withFixedColumns from 'react-table-hoc-fixed-columns';
import 'react-table-hoc-fixed-columns/lib/styles.css'


const ReactTableFixedColumns = withFixedColumns(ReactTable);



class LeaveReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    getLeaveReport = (leaveData) => {
        var leaveReportArray = [];
        if (leaveData.employeeLeaveReport.length != 0) {
            for (let i = 0; i < leaveData.employeeLeaveReport.LeaveReport.length; i++) {
                leaveReportArray.push(leaveData.employeeLeaveReport.LeaveReport[i]);
            }
        }
        return leaveReportArray;
    }

    innerColumns = (keys, year) => {
        var columnsArray = []
        for (let j = 0; j < keys.length; j++) {
            if (year == keys[j].ReportHeaders.substring(0, 4)) {
                const collection = {
                    Header: keys[j].ReportHeaders == 'EmployeeName' ? "" : keys[j].ReportHeaders.substring(4, 8),
                    accessor: keys[j].ReportHeaders,
                    width: keys[j].ReportHeaders == 'EmployeeName' ? 200 : 45,
                    headerClassName: 'leave-type-header'
                }
                columnsArray.push(collection);
            }
            else if (year == 2013) {
                if (keys[j].ReportHeaders == 'EmployeeName') {
                    const collection = {
                        Header: keys[j].ReportHeaders == 'EmployeeName' ? "" : keys[j].ReportHeaders.substring(4, 8),
                        accessor: keys[j].ReportHeaders,
                        width: keys[j].ReportHeaders == 'EmployeeName' ? 250 : 45,
                    }
                    columnsArray.push(collection);
                }
            }
            else if (year == new Date().getFullYear() + 1) {
                if (keys[j].ReportHeaders == 'CL' || keys[j].ReportHeaders == 'EL' || keys[j].ReportHeaders == 'SL') {
                    const collection = {
                        Header: keys[j].ReportHeaders,
                        accessor: keys[j].ReportHeaders,
                        width: keys[j].ReportHeaders == 'EmployeeName' ? 250 : 45,
                    }
                    columnsArray.push(collection);
                }
            }
        }
        return columnsArray
    }

    render() {
        const leaveReport = this.getLeaveReport(this.props.adminData)
        let columns = [];
        let date = new Date();
        if (this.props.adminData.employeeLeaveReport.length != 0) {
            for (let i = 2013; i <= date.getFullYear() + 1; i++) {
                let keys = this.props.adminData.employeeLeaveReport.ReportHeaders;
                const columnsCollection = {
                    Header: i == 2013 ? 'Employee Name' : i == date.getFullYear() + 1 ? 'Balance' : i,
                    columns: this.innerColumns(keys, i),
                    className: "header-class table-border",
                    fixed: i == 2013 ? "left" : i == date.getFullYear() + 1 ? 'right' : '',
                    headerClassName: i == 2013 ? '' : 'leave-year-header'
                }
                columns.push(columnsCollection)
            }
        }
        return (
            <>
                <div className='row'>
                    <div className="container-fluid" id="LeaveReportContainer">
                        <ReactTableFixedColumns className="-highlight  IRTable"
                            columns={columns}
                            data={leaveReport}
                            showPagination={false}
                            pageSize={leaveReport.length}
                            sortable={false}
                            getTrProps={(state, rowInfo, column, instance) => {
                                return {
                                    style: {
                                        backgroundColor: ''
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

export default LeaveReport

