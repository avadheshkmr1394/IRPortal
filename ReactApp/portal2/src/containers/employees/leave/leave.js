import React from 'react'
import ReactTable from 'react-table'
// import 'react-table/react-table.css';
import { getFormattedTiming } from '../../../common/utils';


class Leave extends React.Component {
    constructor() {
        super();
        this.state = {
            rowBackgroundColor: "",
            leaveId: "",
            employeeId: '',
            years: '',
            status: ''
        }
    }

    isApprovedLeave = (item) => {
        if (item == true) {
            item = <span style={{ color: "#008000" }}>Approved</span>;
        }
        else {
            item = <span style={{ color: "#ff0000" }}>Pending</span>;
        }
        return item;
    }

    leaveType = (item) => {
        if (item == "CL") {
            item = "Casual Leave"
        }
        else if (item == "EL") {
            item = "Earned Leave"
        }
        else if (item == "EW") {
            item = "Extra Wor"
        }
        else if (item == "SL") {
            item = "Sick Leave"
        }
        else if (item == "LWP") {
            item = "Leave Without Pay"
        }
        return item;
    }

    leaveCount = (item) => {
        if (item == "1") {
            item = "Full Day"
        }
        else if (item == "0.5") {
            item = "Half Day"
        }
        return item;
    }

    selectLeaveRow = (leaveId, employeeId, date, isApproved) => {
        if (leaveId != null) {
            var getyear = (new Date(date)).getFullYear()
            this.props.selectLeaveRowData(leaveId, employeeId, date, getyear, isApproved.props.children)
        }

    }

    getLeaveData = (leaveData) => {
        const leaveArr = [];
        if (leaveData.employeeLeaves.length != 0) {
            for (var i = 0; i < leaveData.employeeLeaves.Leaves.length; i++) {
                var dataCollection = {
                    leaveId: leaveData.employeeLeaves.Leaves[i].LeaveId,
                    employeeId: leaveData.employeeLeaves.Leaves[i].EmployeeId,
                    leaveDate: <span>{getFormattedTiming(leaveData.employeeLeaves.Leaves[i].LeaveDate)} <input type="hidden" value={leaveData.employeeLeaves.Leaves[i].LeaveId} /></span>,
                    isApproved: this.isApprovedLeave(leaveData.employeeLeaves.Leaves[i].IsApproved),
                    remarks: leaveData.employeeLeaves.Leaves[i].Remarks,
                    leaveType: this.leaveType(leaveData.employeeLeaves.Leaves[i].LeaveType),
                    leaveCount: this.leaveCount(leaveData.employeeLeaves.Leaves[i].LeaveCount),
                    date: leaveData.employeeLeaves.Leaves[i].LeaveDate
                }
                leaveArr.push(dataCollection);
            }
            leaveArr.push({
                leaveDate: <span className="total-leaves"> <h4>Total Leaves: {leaveData.employeeLeaves.TotalLeaves[0].TotalLeave}</h4></span>
            })

        }
         if (leaveData.employeeLeaves.length == 0) {
                leaveArr.push({
                    leaveDate: "No Row Found"
                })
            }
        return leaveArr;
    }
    render() {
        const headerStyle = {
            backgroundColor: '#1abc9c',
            color: 'white',
            fontSize: 'small',
        }
        const leaveData = this.getLeaveData(this.props.employeeData)
        const columns = [
            {
                Header: "Date",
                accessor: "leaveDate",
                // headerStyle: headerStyle,
                className: "header-class",
                width: 100
            },
            {
                Header: "Type",
                accessor: "leaveType",
                // headerStyle: headerStyle,
                className: "header-class",
                width: 100
            },
            {
                Header: "Leave Count",
                accessor: "leaveCount",
                // headerStyle: headerStyle,
                className: "header-class",
                width: 100
            },
            {
                Header: "Status",
                accessor: "isApproved",
                // headerStyle: headerStyle,
                className: "header-class",
                width: 100
            },
            {
                Header: "Remarks",
                accessor: "remarks",
                // headerStyle: headerStyle,
                className: "header-class",
            }
        ]
        return (
            <>
                <div className="row">
                    <div className="container-fluid" id="EmpLeaveContainer">
                        <ReactTable className="-highlight IRTable"
                            columns={columns}
                            data={leaveData}
                            showPagination={false}
                            pageSize={leaveData.length}
                            sortable={false}
                            getTrProps={(state, rowInfo, column, instance) => {
                                return {
                                    onClick: () => {
                                        this.selectLeaveRow(rowInfo.original.leaveId, rowInfo.original.employeeId, rowInfo.original.date, rowInfo.original.isApproved)
                                    },
                                    style: {
                                        backgroundColor: this.props.rowBackgroundColor == '' ? '' : (this.props.leaveId === rowInfo.original.leaveId) ? this.props.rowBackgroundColor : "",
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
export default Leave