import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import '../../css/employees.css'
import '../../css/bootstrap.css';
import 'react-table/react-table.css';
import ReactTable from 'react-table'
import moment from 'moment';
import { getEmployeesAttendance, insertInOutTime, getTodayeAttendanceTime, editAttendanceById } from '../../actions/attendanceAction'
import { getMonthName, getFormattedTiming } from '../../common/utils';
import { AttendanceModal } from '../../common/addModal'



class EmployeeAttendance extends React.Component {
    constructor() {
        super();
        this.state = {
            month: '',
            year: '',
            fullDate: moment(new Date()).format('MMM') + "," + moment(new Date()).format('YYYY'),
            refreshDate: new Date(),
            isOpen: false,
            type: '',
            item: [],
            attendanceId: '',
            ctype: '',
            userId: ''
        }
    }
    componentDidMount() {
        this.props.getEmployeesAttendance();
    }
    monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }
    editAttendance = async (attendanceDate, employeeId, attendanceId) => {

        this.setState({ type: 'edit' })
        await editAttendanceById({ attendanceDate: attendanceDate, employeeId: employeeId, attendanceId: attendanceId }).then(res => {
            this.setState({
                item: res.data
            })
        });
        this.toggle();
    }
    deleteAttendance = async (employeeId, attendanceId) => {
        this.setState({ type: 'delete' })
        this.setState({
            attendanceId: attendanceId
        })
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
                action: <span>{(userAttendance.employeesAttendance[i].Type != "O" && userAttendance.employeesAttendance[i].Type != "L" && userAttendance.employeesAttendance[i].Type != "H") && <label><a href='#' onClick={() => this.editAttendance(moment(userAttendance.employeesAttendance[i].Date).format('MM-DD-YYYY'), userAttendance.employeesAttendance[i].EmployeeId, userAttendance.employeesAttendance[i].AttendanceId)} ><i className='far fa-edit'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;{userAttendance.employeesAttendance[i].AttendanceId != null && <a href='#' onClick={() => this.deleteAttendance(userAttendance.employeesAttendance[i].EmployeeId, userAttendance.employeesAttendance[i].AttendanceId)} ><i className='fa fa-trash'></i></a>}</label>}</span>,
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
    changeUser = () => {
        var userId = document.getElementById('inputUserId').value
        var btnDate = document.getElementById('btnTitledate').value
        var dateFormat = moment(new Date(btnDate))
        var fullDate = new Date(dateFormat._d).getMonth() + 1 + "-" + "0" + 1 + "-" + new Date(dateFormat._d).getFullYear()

        this.setState({
            userId: userId
        })
        this.props.getEmployeesAttendance({ employeeId: userId, date: fullDate })
    }
    prevMonth = async () => {
        const date = new Date();
        const month = date.getMonth();
        const year = date.getFullYear();
        if (this.state.month == '') {
            await this.setState({
                month: month == 0 ? 12 : month,
                year: month == 0 ? year - 1 : year
            })
        }
        else {
            await this.setState({
                month: this.state.month == 1 ? 12 : this.state.month - 1,
                year: this.state.month == 1 ? this.state.year - 1 : this.state.year
            })
        }
        const fullDate = this.state.month + "-" + "0" + 1 + "-" + this.state.year
        const fd = new Date(fullDate);
        this.setState({
            fullDate: moment(fd).format('MMM') + "," + fd.getFullYear()
        })
        var userId = document.getElementById('inputUserId').value
        this.props.getEmployeesAttendance({ employeeId: userId, date: fd })
        this.setState({
            refreshDate: fd
        })
    }
    nextMonth = async () => {
        const date = new Date();
        const month = date.getMonth();
        const year = date.getFullYear();
        if (this.state.month == '') {
            await this.setState({
                month: month == 11 ? 1 : month + 2,
                year: month == 11 ? year + 1 : year
            })
        }
        else {
            await this.setState({
                month: this.state.month == 12 ? 1 : this.state.month + 1,
                year: this.state.month == 12 ? this.state.year + 1 : this.state.year
            })
        }
        const fullDate = this.state.month + "-" + "0" + 1 + "-" + this.state.year
        const fd = new Date(fullDate);

        this.setState({
            fullDate: moment(fd).format('MMM') + "," + fd.getFullYear()
        })
        var userId = document.getElementById('inputUserId').value
        this.props.getEmployeesAttendance({ employeeId: userId, date: fd })
        this.setState({
            refreshDate: fd
        })
    }
    refreshData = () => {
        var userId = document.getElementById('inputUserId').value
        this.props.getEmployeesAttendance({ employeeId: userId, date: this.state.refreshDate })
    }
    getCurrentTime() {
        var date = new Date();
        var currentDate = this.getFinalDate();
        var current_Hours = date.getHours();
        var current_Minute = date.getMinutes();
        var current_Second = date.getSeconds();
        var time = currentDate + " " + current_Hours + ":" + current_Minute + ":" + current_Second;
        return time;
    }
    getFinalDate() {
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var finalDate = year + "-" + month + "-" + day;
        return finalDate;
    }
    InsertInOutTime = (inTime) => async e => {
        await this.props.insertInOutTime(inTime, moment(new Date()).format('LLL'));
        this.refreshData()
    }
    addBackgroundRowColor = (rowInfo) => {
        var backgroundColor = 0
        if (rowInfo.original.day === 'Saturday' || rowInfo.original.day === 'Sunday') {
            var backgroundColor = '#b2beb5'
        }
        else if (rowInfo.original.inTime != null && rowInfo.original.outTime == null) {
            backgroundColor = '#B2EC5D'
        }
        else if (rowInfo.original.outTime != null) {
            backgroundColor = '#D5F2AA'
        }
        else if (rowInfo.original.ctype == "P") {
            backgroundColor = "#D5F2AA"
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
            backgroundColor = '#9B9C9A'
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
                    headerStyle: headerStyle,
                    width: 100
                },
                userRole == "Admin" && {
                    Header: "Date",
                    accessor: "date",
                    headerStyle: headerStyle,
                    width: 100
                },
                {
                    id: "Description",
                    Header: "description",
                    accessor: e => { return e.day },
                    headerStyle: headerStyle,
                    width: 100,
                },
                {
                    id: "Attendance",
                    Header: "Attendance",
                    accessor: e => { return e.description },
                    headerStyle: headerStyle,
                    width: 100,
                },
                {
                    id: "In Time",
                    Header: "In Time",
                    accessor: e => { return e.inTime },
                    headerStyle: headerStyle,
                    width: 100,
                },
                {
                    id: "Out Time",
                    Header: "Out Time",
                    accessor: "outTime",
                    headerStyle: headerStyle,
                    width: 100,
                },
                {
                    id: "Total Time",
                    Header: "Total Time",
                    accessor: e => { return e.totalTime },
                    headerStyle: headerStyle,
                },
                {
                    id: "Remarks",
                    Header: "Remarks",
                    accessor: e => { return e.remarks },
                    headerStyle: headerStyle,
                },
            ];
        }
        else {
            columns = [
                {
                    Header: "Date",
                    accessor: "date",
                    headerStyle: headerStyle,
                    width: 100
                },
                {
                    id: "Description",
                    Header: "description",
                    accessor: e => { return e.day },
                    headerStyle: headerStyle,
                    width: 100,
                },
                {
                    id: "Attendance",
                    Header: "Attendance",
                    accessor: e => { return e.description },
                    headerStyle: headerStyle,
                    width: 100,
                },
                {
                    id: "In Time",
                    Header: "In Time",
                    accessor: e => { return e.inTime },
                    headerStyle: headerStyle,
                    width: 100,
                },
                {
                    id: "Out Time",
                    Header: "Out Time",
                    accessor: "outTime",
                    headerStyle: headerStyle,
                    width: 100,
                },
                {
                    id: "Total Time",
                    Header: "Total Time",
                    accessor: e => { return e.totalTime },
                    headerStyle: headerStyle,
                },
                {
                    id: "Remarks",
                    Header: "Remarks",
                    accessor: e => { return e.remarks },
                    headerStyle: headerStyle,
                },
            ];
        }
        if (!calenderData) return <div></div>
        const userAttendance = this.props.employeeData
        var inTime = null;
        for (var i = 0; i < userAttendance.todayAttendanceDate.length; i++) {

            inTime = userAttendance.todayAttendanceDate[i].InTime
        }
        return (
            <>
                <div className="col-sm-12" style={{ marginBottom: "8px", marginTop: "11px" }} >
                    <div className="pull-left" style={{ color: "#2e508f" }} ><h3>Attendance</h3></div>
                    <div className="pull-right">
                        <div className="btn-toolbar" role="toolbar" aria-label="...">
                            <div className="btn-group" role="group" aria-label="...">
                                <select className="form-control" value={this.state.userId == '' ? this.props.dashboardData.EmployeeId : this.state.userId} id='inputUserId' onChange={this.changeUser} style={{ width: "170px" }}>
                                    {
                                        userAttendance.users.map(function (item, index) {
                                            return <option key={index} value={item.Value}>{item.Text}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <span>&nbsp;&nbsp;</span>
                            <div className="btn-group hidden-xs" role="group" aria-label="...">
                                <div className="btn-group" role="group" aria-label="...">
                                    <button id="btnPrev" onClick={this.prevMonth} className="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Previous Month">
                                        <i className="fa fa-angle-left fa-fw"></i>
                                    </button>
                                    <button id="btnTitledate" className="btn btn-default hidden-sm hidden-xs" style={{ fontWeight: "bold", width: "120px" }} value={this.state.fullDate}>{this.state.fullDate}</button>
                                    <button id="btnNext" onClick={this.nextMonth} className="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Next Month">
                                        <i className="fa fa-angle-right fa-fw"></i>
                                    </button>
                                </div>
                                <div className="btn-group" role="group" aria-label="...">
                                    {inTime == null && <div className="btn-group" role="group" aria-label="...">
                                        <button type="button" name="InTime" onClick={this.InsertInOutTime(true)} id="btnInTime" value="Upload" className="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="In Time">
                                            <span className="hidden-sm hidden-xs"><i className="fa fa-sign-in fa-fw"></i>&nbsp;In Time</span>
                                        </button>
                                    </div>}
                                    {inTime != null && <div className="btn-group" role="group" aria-label="...">
                                        <button type="button" name="InTime" disabled id="btnInTime" value="Upload" className="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="In Time">
                                            <span className="hidden-sm hidden-xs"><i className="fa fa-sign-in fa-fw"></i>&nbsp;In Time</span>
                                        </button>
                                    </div>}
                                    <div className="btn-group" role="group" aria-label="...">
                                        <button type="button" name="OutTime" id="btnOutTime" onClick={this.InsertInOutTime(false)} value="Upload" className="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Out Time">
                                            <span className="hidden-sm hidden-xs"><i className="fa fa-sign-out fa-fw"></i>&nbsp;Out Time</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="btn-group" role="group" aria-label="...">
                                    <button id="btnRefresh" onClick={this.refreshData} className="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Refresh Data">
                                        <i className="fa fa-refresh fa-fw"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid" style={{ padding: '60px 10px 30px' }}>
                    <ReactTable className="-highlight"
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
                {this.state.isOpen == true && <AttendanceModal isOpen={this.state.isOpen} toggle={this.toggle} type={this.state.type} item={this.state.item} attendanceId={this.state.attendanceId} refreshData={this.refreshData} />}
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
    return bindActionCreators({ getEmployeesAttendance, insertInOutTime, getTodayeAttendanceTime }, dispatch)
}
export default connect(mapStateToProps, dispactchstatetoprops)(EmployeeAttendance) 
