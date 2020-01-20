import React from 'react'
import moment from 'moment';




class Header extends React.Component {
    constructor() {
        super()
        this.state = {
            fullDate: moment(new Date()).format('MMM') + "," + moment(new Date()).format('YYYY'),
            userId: '',
            refreshDate: new Date(),
            month: '',
            year: '',
            ctype: '',
        }
    }

    changeUser = () => {
        var userId = document.getElementById('inputUserId').value
        var btnDate = document.getElementById('btnTitledate').value
        var dateFormat = moment(new Date(btnDate))
        var fullDate = new Date(dateFormat._d).getMonth() + 1 + "-" + "0" + 1 + "-" + new Date(dateFormat._d).getFullYear()

        this.setState({
            userId: userId
        })
        this.props.onPress(userId, fullDate)
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
        this.props.onPress(userId, fd)
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
        this.props.onPress(userId, fd)
        this.setState({
            refreshDate: fd
        })
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

    refreshData = () => {
        var userId = document.getElementById('inputUserId').value
        this.props.onPress(userId, this.state.refreshDate);
    }

    InsertInOutTime = (inTime) => async e => {
        await this.props.insertInOutTime(inTime);
        this.refreshData()
    }

    render() {

        const userAttendance = this.props.employeeData
        const userRole = this.props.dashboardData.userRole
        var inTime = null;
        for (var i = 0; i < userAttendance.todayAttendanceDate.length; i++) {
            inTime = userAttendance.todayAttendanceDate[i].InTime
        }
        return (
            <>
                <div className='row'>
                    <div className="col-md-6">
                        <div className="pull-left" ><h3>Attendance</h3></div>
                    </div>
                    <div id="container" className="col-md-6">
                        <div className="float-right">
                            <div className="pull-right">
                                <div className="btn-toolbar" role="toolbar" aria-label="...">
                                    <div className="btn-group" role="group" aria-label="...">
                                        <select className="form-control" disabled={userRole == 'Admin' ? false : true} value={this.state.userId == '' ? this.props.dashboardData.employeeId : this.state.userId} id='inputUserId' onChange={this.changeUser} style={{ width: "170px" }}>
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
                                            <button id="btnPrev" onClick={this.prevMonth} className="btn btn-default  ir-btn-neutral-outline wd35" data-toggle="tooltip" data-placement="bottom" title="Previous Month">
                                                <i className="fa fa-angle-left fa-fw"></i>
                                            </button>
                                            <button id="btnTitledate" className="btn btn-default  ir-btn-neutral-outline hidden-sm hidden-xs" style={{ fontWeight: "bold", width: "120px" }} value={this.state.fullDate}>{this.state.fullDate}</button>
                                            <button id="btnNext" onClick={this.nextMonth} className="btn btn-default  ir-btn-neutral-outline wd35" data-toggle="tooltip" data-placement="bottom" title="Next Month">
                                                <i className="fa fa-angle-right fa-fw"></i>
                                            </button>
                                        </div>
                                        <div className="btn-group" role="group" aria-label="...">
                                            {inTime == null && <div className="btn-group" role="group" aria-label="...">
                                                <button type="button" name="InTime" onClick={this.InsertInOutTime(true)} id="btnInTime" value="Upload" className="btn btn-default  ir-btn-neutral-outline" data-toggle="tooltip" data-placement="bottom" title="In Time">
                                                    <span className="hidden-sm hidden-xs"><i className="fas fa-sign-in-alt"></i>&nbsp;In Time</span>
                                                </button>
                                            </div>}
                                            {inTime != null && <div className="btn-group" role="group" aria-label="...">
                                                <button type="button" name="InTime" disabled id="btnInTime" value="Upload" className="btn btn-default ir-btn-neutral-outline" data-toggle="tooltip" data-placement="bottom" title="In Time">
                                                    <span className="hidden-sm hidden-xs"><i className="fas fa-sign-in-alt"></i>&nbsp;In Time</span>
                                                </button>
                                            </div>}
                                            <div className="btn-group" role="group" aria-label="...">
                                                <button type="button" name="OutTime" id="btnOutTime" onClick={this.InsertInOutTime(false)} value="Upload" className="btn btn-default  ir-btn-neutral-outline" data-toggle="tooltip" data-placement="bottom" title="Out Time">
                                                    <span className="hidden-sm hidden-xs"><i className="fas fa-sign-out-alt"></i>&nbsp;Out Time</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="btn-group" role="group" aria-label="...">
                                            <button id="btnRefresh" onClick={this.refreshData} className="btn btn-default  ir-btn-neutral-outline wd35" data-toggle="tooltip" data-placement="bottom" title="Refresh Data">
                                                <i className="fas fa-sync-alt"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default Header