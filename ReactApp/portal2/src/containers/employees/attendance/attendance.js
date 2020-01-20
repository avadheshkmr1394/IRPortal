import React from 'react'
import ReactTable from 'react-table'
// import 'react-table/react-table.css';
import { getFormattedTiming } from '../../../common/utils';
import moment from 'moment';
import AddAttendanceModal from '../../../components/modals/addAttendanceModal'
import DeleteConformModal from '../../../components/modals/deleteConformModal'
import { deleteAttendance } from '../../../actions/attendanceAction'
import { editAttendanceById } from '../../../actions/attendanceAction'


class EmployeeAttendance extends React.Component {
    constructor() {
        super()
        this.state = {
            isOpen: false,
            attendanceId: '',
            modalType: '',
            attendanceItem: [],
        }
    }

    toggle(e) {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    refreshData = () => {
        this.props.onPress();
    }

    editAttendance = async (attendanceDate, employeeId, attendanceId) => {
        this.setState({ modalType: 'addModal' })
        await editAttendanceById({ attendanceDate: attendanceDate, employeeId: employeeId, attendanceId: attendanceId }).then(res => {
            this.setState({
                attendanceItem: res.data,
            })
        });
        this.toggle();
    }

    deleteRecord = async (employeeId, attendanceId) => {
        this.setState({ modalType: 'deleteModal' })
        this.setState({
            attendanceId: attendanceId,
        })
        this.toggle();
    }

    deleteRecords = async (attendanceId) => {
        await deleteAttendance({ attendanceId: attendanceId })
        this.refreshData();
        this.toggle();
    }

    formatAMPM = (date) => {
        var strTime = null;
        if (date != null) {
            var date = new Date(date)
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0' + minutes : minutes;
            strTime = hours + ':' + minutes + ' ' + ampm;
        }
        return strTime;
    }

    getDatesAndDays = (userAttendance) => {
        var totaltime;
        var hours = 0;
        var minuts = 0;
        var dateArray = [];
        for (let i = 0; i < userAttendance.employeesAttendance.length; i++) {
            var dataCollection = {
                action: <span>{(userAttendance.employeesAttendance[i].Type != "O" && userAttendance.employeesAttendance[i].Type != "L" && userAttendance.employeesAttendance[i].Type != "H") && <label><a href='#' onClick={() => this.editAttendance(moment(userAttendance.employeesAttendance[i].Date).format('MM-DD-YYYY'), userAttendance.employeesAttendance[i].EmployeeId, userAttendance.employeesAttendance[i].AttendanceId)} ><i className='far fa-edit'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;{userAttendance.employeesAttendance[i].AttendanceId != null && <a href='#' onClick={() => this.deleteRecord(userAttendance.employeesAttendance[i].EmployeeId, userAttendance.employeesAttendance[i].AttendanceId)} ><i className='fa fa-trash'></i></a>}</label>}</span>,
                date: getFormattedTiming(userAttendance.employeesAttendance[i].Date),
                day: userAttendance.employeesAttendance[i].DayDescription,
                description: userAttendance.employeesAttendance[i].Description,
                inTime: this.formatAMPM(userAttendance.employeesAttendance[i].InTime),
                outTime: this.formatAMPM(userAttendance.employeesAttendance[i].OutTime),
                totalTime: userAttendance.employeesAttendance[i].TotalTime,
                remarks: userAttendance.employeesAttendance[i].Remarks,
                ctype: userAttendance.employeesAttendance[i].Type
            }
            dateArray.push(dataCollection)
            if (userAttendance.employeesAttendance[i].TotalTime != null) {
                hours = hours + parseInt(userAttendance.employeesAttendance[i].TotalTime.substring(0, 2));
                minuts = minuts + parseInt(userAttendance.employeesAttendance[i].TotalTime.substring(3, 5));
            }
        }
        hours = hours + Math.trunc((minuts / 60));
        minuts = (minuts % 60);
        var totaltime = hours + ":" + minuts
        dateArray.push(this.props.dashboardData.userRole == "Admin" ? {
            action: <label id="totaltime">Total Time In(hh:mm)   {totaltime}</label>,
        } : { date: <label id="totaltime">Total Time In(hh:mm)   {totaltime}</label>, })
        return dateArray;
    }

    addBackgroundRowColor = (rowInfo) => {
        var backgroundColor = 0
        if (rowInfo.original.day === 'Saturday' || rowInfo.original.day === 'Sunday') {
            var backgroundColor = '#b2beb5'
        }
        else if (rowInfo.original.inTime != null && rowInfo.original.outTime == null) {
            backgroundColor = '#BD33A4'
        }
        else if (rowInfo.original.outTime != null) {
            backgroundColor = '#b2ec5d'
        }
        else if (rowInfo.original.ctype == "P") {
            backgroundColor = '#b2ec5d'
        }
        else if (rowInfo.original.ctype == "L") {
            backgroundColor = '#FC8EAC'
        }
        else if (rowInfo.original.ctype == "A") {
            backgroundColor = '#BD33A4'
        }
        else if (rowInfo.original.ctype == "H") {
            backgroundColor = '#9BDDFF'
        }
        else {
            backgroundColor = '#fff'
        }
        if (rowInfo.original.ctype == "I") {
            backgroundColor = '#BD33A4'
        }
        return backgroundColor;
    }

    render() {
        const calenderData = this.getDatesAndDays(this.props.employeeData);
        const headerStyle = {
            backgroundColor: '#1abc9c',
            color: 'white',
            fontSize: 'small',
        }
        const userRole = this.props.dashboardData.userRole
        let columns = ''
        if (userRole == "Admin") {
            columns = [
                {
                    Header: "Action",
                    accessor: "action",
                    // headerStyle: headerStyle,
                    className: "header-class",
                    width: 100
                },
                userRole == "Admin" && {
                    Header: "Date",
                    accessor: "date",
                    // headerStyle: headerStyle,
                    className: "header-class",
                    width: 100
                },
                {
                    id: "Description",
                    Header: "Description",
                    accessor: e => { return e.day },
                    // headerStyle: headerStyle,
                    className: "header-class",
                    width: 100,
                },
                {
                    id: "Attendance",
                    Header: "Attendance",
                    accessor: e => { return e.description },
                    // headerStyle: headerStyle,
                    className: "header-class",
                    width: 100,
                },
                {
                    id: "In Time",
                    Header: "In Time",
                    accessor: e => { return e.inTime },
                    // headerStyle: headerStyle,
                    className: "header-class",
                    width: 100,
                },
                {
                    id: "Out Time",
                    Header: "Out Time",
                    accessor: "outTime",
                    // headerStyle: headerStyle,
                    className: "header-class",
                    width: 100,
                },
                {
                    id: "Total Time",
                    Header: "Total Time",
                    accessor: e => { return e.totalTime },
                    // headerStyle: headerStyle,
                    className: "header-class",
                },
                {
                    id: "Remarks",
                    Header: "Remarks",
                    accessor: e => { return e.remarks },
                    // headerStyle: headerStyle,
                    className: "header-class",
                },
            ];
        }
        else {
            columns = [
                {
                    Header: "Date",
                    accessor: "date",
                    // headerStyle: headerStyle,
                    className: "header-class",
                    width: 100
                },
                {
                    id: "Description",
                    Header: "Description",
                    accessor: e => { return e.day },
                    // headerStyle: headerStyle,
                    className: "header-class",
                    width: 100,
                },
                {
                    id: "Attendance",
                    Header: "Attendance",
                    accessor: e => { return e.description },
                    // headerStyle: headerStyle,
                    className: "header-class",
                    width: 100,
                },
                {
                    id: "In Time",
                    Header: "In Time",
                    accessor: e => { return e.inTime },
                    // headerStyle: headerStyle,
                    className: "header-class",
                    width: 100,
                },
                {
                    id: "Out Time",
                    Header: "Out Time",
                    accessor: "outTime",
                    // headerStyle: headerStyle,
                    className: "header-class",
                    width: 100,
                },
                {
                    id: "Total Time",
                    Header: "Total Time",
                    accessor: e => { return e.totalTime },
                    // headerStyle: headerStyle,
                    className: "header-class",
                },
                {
                    id: "Remarks",
                    Header: "Remarks",
                    accessor: e => { return e.remarks },
                    // headerStyle: headerStyle,
                    className: "header-class",
                },
            ];
        }
        if (!calenderData) return <div></div>
        return (
            <>
                <div className="row">
                    <div className="container-fluid" id="AttendanceTableContainer">
                        <ReactTable className="-highlight IRTable"
                            columns={columns}
                            data={calenderData}
                            showPagination={false}
                            pageSize={calenderData.length}
                            sortable={false}
                            getTrProps={(state, rowInfo, column, instance) => {
                                return {
                                    style: {
                                        background: this.addBackgroundRowColor(rowInfo),
                                        fontSize: 'small'
                                    }
                                }
                            }
                            }
                        />
                    </div>
                </div>
                {(this.state.isOpen == true && this.state.modalType == "addModal") && <AddAttendanceModal isOpen={this.state.isOpen} toggle={this.toggle.bind(this)} refreshData={this.refreshData} attendanceItem={this.state.attendanceItem} />}
                {(this.state.isOpen == true && this.state.modalType == "deleteModal") && <DeleteConformModal isOpen={this.state.isOpen} toggle={this.toggle.bind(this)} conformText={'Are you sure you want to permanently delete this record?'} id={this.state.attendanceId} onClickEvent={this.deleteRecords} />}
            </>
        )
    }
}

export default EmployeeAttendance
