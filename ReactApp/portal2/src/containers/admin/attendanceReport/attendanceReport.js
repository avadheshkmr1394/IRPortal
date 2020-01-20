import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css';
import withFixedColumns from 'react-table-hoc-fixed-columns';
import 'react-table-hoc-fixed-columns/lib/styles.css'

const ReactTableFixedColumns = withFixedColumns(ReactTable);


class AttendanceReport extends React.Component {
    checkAttendance = (item) => {
        if (item == 'O ') {
            item = <div className='weekend'></div>
        }
        else if (item == 'L-CL') {
            item = <div className='emp-leave'>CL</div>
        }
        else if (item == 'L-EL') {
            item =<div className='emp-leave'>EL</div>
        }
        else if (item == 'L-SL') {
            item =<div className='emp-leave'>SL</div>
        }
        else if (item == 'L-EW') {
            item = <div className='emp-leave'>EW</div>
        }
        else if (item == 'H ') {
            item = <div className='emp-holiday'></div>
        }
        else if (item == 'L-LWP') {
            item = <div className='emp-leave'>LWP</div>
        }
        else if (item != null) {
            var array = []
            if (item.substring(0, 1) == 'P') {
                var str = item.split(',')
                for (let i = 0; i < str.length; i++) {
                    if (str[i].substring(0, 9) == 'TotalTime') {
                        if (this.props.TotalTime == true) {
                            item = str[i].substring(10, 20)
                            array.push(item)
                        }
                    }
                    if (str[i].substring(0, 6) == 'InTime') {
                        if (this.props.InTime == true) {
                            item = str[i].substring(7, 20)
                            array.push(item)
                        }
                    }
                    if (str[i].substring(0, 7) == 'OutTime') {
                        if (this.props.OutTime == true) {
                            item = str[i].substring(8, 20)
                            array.push(item)
                        }
                    }
                }
                if (this.props.OutTime == true && this.props.TotalTime == false) {
                    item = <div className='emp-present'>
                    <div>{array[0] == undefined ? '' : array[0]}</div>
                    <div>{array[1] == undefined ? '' : array[1]}</div>
                    {array[2] == undefined ? '' : array[2]}
                </div>
                }
                else {
                    item = <div className='emp-present'>
                    {array[1] == undefined ? '' : array[1]}
                    {array[2] == undefined ? '' : array[2]}
                    {array[0] == undefined ? '' : array[0]}
                </div>
                }
            }
        }
        return item
    }

    getAttendanceReport = (attendanceData) => {
        var attendanceArray = [];
        if (attendanceData.attendanceReport.length != 0) {
            for (let i = 0; i < attendanceData.attendanceReport.Attendance.length; i++) {
                var arr = JSON.stringify(attendanceData.attendanceReport.Attendance[i])
                var obj = JSON.parse(arr)
                let keys = Object.keys(obj);
                const dataCollection = {
                    [keys[0]]: this.checkAttendance(attendanceData.attendanceReport.Attendance[i][keys[0]]),
                    [keys[1]]: this.checkAttendance(attendanceData.attendanceReport.Attendance[i][keys[1]]),
                    [keys[2]]: this.checkAttendance(attendanceData.attendanceReport.Attendance[i][keys[2]]),
                    [keys[3]]: this.checkAttendance(attendanceData.attendanceReport.Attendance[i][keys[3]]),
                    [keys[4]]: this.checkAttendance(attendanceData.attendanceReport.Attendance[i][keys[4]]),
                    [keys[5]]: this.checkAttendance(attendanceData.attendanceReport.Attendance[i][keys[5]]),
                    [keys[6]]: this.checkAttendance(attendanceData.attendanceReport.Attendance[i][keys[6]]),
                    [keys[7]]: this.checkAttendance(attendanceData.attendanceReport.Attendance[i][keys[7]]),
                    [keys[8]]: this.checkAttendance(attendanceData.attendanceReport.Attendance[i][keys[8]]),
                    [keys[9]]: this.checkAttendance(attendanceData.attendanceReport.Attendance[i][keys[9]]),
                    [keys[10]]: this.checkAttendance(attendanceData.attendanceReport.Attendance[i][keys[10]]),
                    [keys[11]]: this.checkAttendance(attendanceData.attendanceReport.Attendance[i][keys[11]]),
                    [keys[12]]: this.checkAttendance(attendanceData.attendanceReport.Attendance[i][keys[12]]),
                    [keys[13]]: this.checkAttendance(attendanceData.attendanceReport.Attendance[i][keys[13]]),
                    [keys[14]]: this.checkAttendance(attendanceData.attendanceReport.Attendance[i][keys[14]]),
                    [keys[15]]: this.checkAttendance(attendanceData.attendanceReport.Attendance[i][keys[15]]),
                    [keys[16]]: this.checkAttendance(attendanceData.attendanceReport.Attendance[i][keys[16]]),
                    [keys[17]]: this.checkAttendance(attendanceData.attendanceReport.Attendance[i][keys[17]]),
                    [keys[18]]: this.checkAttendance(attendanceData.attendanceReport.Attendance[i][keys[18]]),
                    [keys[19]]: this.checkAttendance(attendanceData.attendanceReport.Attendance[i][keys[19]]),
                    [keys[20]]: this.checkAttendance(attendanceData.attendanceReport.Attendance[i][keys[20]]),
                    [keys[21]]: this.checkAttendance(attendanceData.attendanceReport.Attendance[i][keys[21]]),
                    [keys[22]]: this.checkAttendance(attendanceData.attendanceReport.Attendance[i][keys[22]]),
                    [keys[23]]: this.checkAttendance(attendanceData.attendanceReport.Attendance[i][keys[23]]),
                    [keys[24]]: this.checkAttendance(attendanceData.attendanceReport.Attendance[i][keys[24]]),
                    [keys[25]]: this.checkAttendance(attendanceData.attendanceReport.Attendance[i][keys[25]]),
                    [keys[26]]: this.checkAttendance(attendanceData.attendanceReport.Attendance[i][keys[26]]),
                    [keys[27]]: this.checkAttendance(attendanceData.attendanceReport.Attendance[i][keys[27]]),
                    [keys[28]]: this.checkAttendance(attendanceData.attendanceReport.Attendance[i][keys[28]]),
                    [keys[29]]: this.checkAttendance(attendanceData.attendanceReport.Attendance[i][keys[29]]),
                    [keys[30]]: this.checkAttendance(attendanceData.attendanceReport.Attendance[i][keys[30]]),
                    [keys[31]]: this.checkAttendance(attendanceData.attendanceReport.Attendance[i][keys[31]]),
                }
                attendanceArray.push(dataCollection);
            }
        }
        // if (attendanceData.attendanceReport.length == 0) {
        //     attendanceArray.push({
        //         employeeName: "No Row Found"
        //     })
        // }
        return attendanceArray;
    }

    render() {

        const attendanceReport = this.getAttendanceReport(this.props.adminData)
        var columns = [];
        if (this.props.adminData.attendanceReport.length != 0) {
            let keys = this.props.adminData.attendanceReport.ReportHeaders;
            for (let j = 0; j < keys.length; j++) {
                const columnsCollection = {
                    Header: keys[j].ReportHeaders == 'EmployeeName' ? 'Employee Name' : keys[j].ReportHeaders.substring(0, 3) + " " + keys[j].ReportHeaders.substring(4, 7),
                    accessor: keys[j].ReportHeaders,
                    className: "header-class table-border",
                    width: keys[j].ReportHeaders == 'EmployeeName' ? 250 : 60,
                    fixed: keys[j].ReportHeaders == 'EmployeeName' ? 'left' : ''

                }
                columns.push(columnsCollection)
            }
        }

        return (
            <>
                <div className='row'>
                    <div className="container-fluid" id="AttendanceReport">
                        {/* <Loader isLoading={this.props.adminData.isLoading} /> */}
                        <ReactTableFixedColumns className="-highlight IRTable"
                            columns={columns}
                            data={attendanceReport}
                            showPagination={false}
                            pageSize={attendanceReport.length}
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
export default AttendanceReport
