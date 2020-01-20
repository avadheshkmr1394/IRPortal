import React from "react";
import moment from 'moment';
import { bindWorklogs } from "../../actions/employeeActions";
import { WorklogModal } from "../../common/addModal";
import { connect } from 'react-redux';
import ReactTable from 'react-table'
import 'react-table/react-table.css';
import '../../css/bootstrap.css';
import { bindActionCreators } from 'redux'
import { getAllProjects } from '../../actions/employeeActions'
import { getAllTasksForCombo } from '../../actions/employeeActions'



class Worklog extends React.Component {
    constructor() {
        super();
        this.state = {
            month: '',
            year: '',
            fulldate: moment(new Date()).format('MMM') + "," + moment(new Date()).format('YYYY'),
            isOpen: false,
            viewid: '',
            userId: '',
            date: moment(new Date()).format('MM/DD/YYYY h:mm:ss a')

        }
    }
    componentDidMount() {
        const viewId = "0";
        this.setState({
            viewid: viewId,
            userId: this.props.dashboardData.EmployeeId
        })
        this.props.BindWorklogs({ ViewId: viewId, startMonthDate: this.state.date });
    }
    changeuser = () => {
        const viewId = document.getElementById('inputviewid').value;
        const userid = document.getElementById('inputuserid').value;
        this.setState({
            viewid: viewId,
            userId: userid
        })
        const date = moment(new Date(this.state.date)).format('MM/DD/YYYY h:mm:ss a');
        this.props.BindWorklogs({ ViewId: viewId, startMonthDate: date, userId: userid });
    }
    getworkLogcolumn = (worklogColumn) => {
        const columnarr = []
        if (worklogColumn.workLogs.length != 0) {
            for (var i = 0; i < worklogColumn.workLogs.column.length; i++) {
                const columncollection = {
                    ColumnName: worklogColumn.workLogs.column[i].ColumnName,
                }
                columnarr.push(columncollection)
            }
        }
        return columnarr;
    }
    getworkLogTable = (worklogTable) => {
        const wroklogdataTable = []
        if (worklogTable.workLogs.length != 0) {
            for (var j = 0; j < worklogTable.workLogs.Table.length; j++) {

                const tablecollection = {}
                if (this.state.viewid == 0) {
                    tablecollection = {
                        Project: worklogTable.workLogs.Table[j].Project,
                        IssueKey: worklogTable.workLogs.Table[j].IssueKey,
                        Total: worklogTable.workLogs.Table[j].Total,
                        1: worklogTable.workLogs.Table[j]["1"],
                        2: worklogTable.workLogs.Table[j]["2"],
                        3: worklogTable.workLogs.Table[j]["3"],
                        4: worklogTable.workLogs.Table[j]["4"],
                        5: worklogTable.workLogs.Table[j]["5"],
                        6: worklogTable.workLogs.Table[j]["6"],
                        7: worklogTable.workLogs.Table[j]["7"],
                        8: worklogTable.workLogs.Table[j]["8"],
                        9: worklogTable.workLogs.Table[j]["9"],
                        10: worklogTable.workLogs.Table[j]["10"],
                        11: worklogTable.workLogs.Table[j]["11"],
                        12: worklogTable.workLogs.Table[j]["12"],
                        13: worklogTable.workLogs.Table[j]["13"],
                        14: worklogTable.workLogs.Table[j]["14"],
                        15: worklogTable.workLogs.Table[j]["15"],
                        16: worklogTable.workLogs.Table[j]["16"],
                        17: worklogTable.workLogs.Table[j]["17"],
                        18: worklogTable.workLogs.Table[j]["18"],
                        19: worklogTable.workLogs.Table[j]["19"],
                        20: worklogTable.workLogs.Table[j]["20"],
                        21: worklogTable.workLogs.Table[j]["21"],
                        22: worklogTable.workLogs.Table[j]["22"],
                        23: worklogTable.workLogs.Table[j]["23"],
                        24: worklogTable.workLogs.Table[j]["24"],
                        25: worklogTable.workLogs.Table[j]["25"],
                        26: worklogTable.workLogs.Table[j]["26"],
                        27: worklogTable.workLogs.Table[j]["27"],
                        28: worklogTable.workLogs.Table[j]["28"],
                        29: worklogTable.workLogs.Table[j]["29"],
                        30: worklogTable.workLogs.Table[j]["30"],
                        31: worklogTable.workLogs.Table[j]["31"]
                    }
                }
                if (this.state.viewid == 1) {
                    tablecollection = {
                        UserName: worklogTable.workLogs.Table[j].UserName,
                        Total: worklogTable.workLogs.Table[j].Total,
                        1: worklogTable.workLogs.Table[j]["1"],
                        2: worklogTable.workLogs.Table[j]["2"],
                        3: worklogTable.workLogs.Table[j]["3"],
                        4: worklogTable.workLogs.Table[j]["4"],
                        5: worklogTable.workLogs.Table[j]["5"],
                        6: worklogTable.workLogs.Table[j]["6"],
                        7: worklogTable.workLogs.Table[j]["7"],
                        8: worklogTable.workLogs.Table[j]["8"],
                        9: worklogTable.workLogs.Table[j]["9"],
                        10: worklogTable.workLogs.Table[j]["10"],
                        11: worklogTable.workLogs.Table[j]["11"],
                        12: worklogTable.workLogs.Table[j]["12"],
                        13: worklogTable.workLogs.Table[j]["13"],
                        14: worklogTable.workLogs.Table[j]["14"],
                        15: worklogTable.workLogs.Table[j]["15"],
                        16: worklogTable.workLogs.Table[j]["16"],
                        17: worklogTable.workLogs.Table[j]["17"],
                        18: worklogTable.workLogs.Table[j]["18"],
                        19: worklogTable.workLogs.Table[j]["19"],
                        20: worklogTable.workLogs.Table[j]["20"],
                        21: worklogTable.workLogs.Table[j]["21"],
                        22: worklogTable.workLogs.Table[j]["22"],
                        23: worklogTable.workLogs.Table[j]["23"],
                        24: worklogTable.workLogs.Table[j]["24"],
                        25: worklogTable.workLogs.Table[j]["25"],
                        26: worklogTable.workLogs.Table[j]["26"],
                        27: worklogTable.workLogs.Table[j]["27"],
                        28: worklogTable.workLogs.Table[j]["28"],
                        29: worklogTable.workLogs.Table[j]["29"],
                        30: worklogTable.workLogs.Table[j]["30"],
                        31: worklogTable.workLogs.Table[j]["31"]
                    }
                }
                if (this.state.viewid == 2) {
                    tablecollection = {
                        UserName: worklogTable.workLogs.Table[j].UserName,
                        Total: worklogTable.workLogs.Table[j].Total,
                        CBS: worklogTable.workLogs.Table[j]["CBS"],
                        DM: worklogTable.workLogs.Table[j]["DM"],
                        EIMP: worklogTable.workLogs.Table[j]["EIMP"],
                        GEN: worklogTable.workLogs.Table[j]["GEN"],
                        IRAP: worklogTable.workLogs.Table[j]["IRAP"],
                        IRI: worklogTable.workLogs.Table[j]["IRI"],
                        PROC: worklogTable.workLogs.Table[j]["PROC"],
                        SYS: worklogTable.workLogs.Table[j]["SYS"],
                        VCEN: worklogTable.workLogs.Table[j]["VCEN"],
                        VCOM: worklogTable.workLogs.Table[j]["VCOM"],
                        VCRM: worklogTable.workLogs.Table[j]["VCRM"]
                    }
                }
                wroklogdataTable.push(tablecollection)
            }
            if (wroklogdataTable.length == 0) {
                wroklogdataTable.push({
                    10: <span>No Row Found</span>
                })
            }

        }
        return wroklogdataTable;
    }
    refreshdata = () => {
        const viewId = document.getElementById('inputviewid').value;
        const userid = document.getElementById('inputuserid').value;
        const date = moment(new Date(this.state.date)).format('MM/DD/YYYY h:mm:ss a');
        this.props.BindWorklogs({ ViewId: viewId, startMonthDate: date, userId: userid });
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    prevMonth = async (value) => {
        const date = new Date();
        const month = date.getMonth();
        const year = date.getFullYear();
        if (this.state.month == '') {
            await this.setState({
                month: month,
                year: year
            })
        }
        else {
            await this.setState({
                month: this.state.month == 1 ? 12 : this.state.month - 1,
                year: this.state.month == 1 ? this.state.year - 1 : this.state.year
            })
        }
        const fulldate = this.state.month + "-" + "0" + 1 + "-" + this.state.year
        const fd = new Date(fulldate);

        this.setState({
            fulldate: moment(fd).format('MMM') + "," + fd.getFullYear()
        })
        this.setState({
            refreshdate: fd
        })
        this.setState({
            date: fd
        })
        this.changeuser()
    }
    nextMonth = async () => {
        const date = new Date();
        const month = date.getMonth();
        const year = date.getFullYear();
        if (this.state.month == '') {
            await this.setState({
                month: month + 2,
                year: year
            })
        }
        else {
            await this.setState({
                month: this.state.month == 12 ? 1 : this.state.month + 1,
                year: this.state.month == 12 ? this.state.year + 1 : this.state.year
            })
        }
        const fulldate = this.state.month + "-" + "0" + 1 + "-" + this.state.year
        const fd = new Date(fulldate);
        this.setState({
            fulldate: moment(fd).format('MMM') + "," + fd.getFullYear()
        })
        this.setState({
            refreshdate: fd
        })
        this.setState({
            date: fd
        })
        this.changeuser()
    }
    addWorklog = () => {
        const userid = document.getElementById('inputuserid').value;
        const viewId = document.getElementById('inputviewid').value;
        this.setState({
            userId: userid,
            viewid: viewId
        })
        this.props.getAllProjects({ userId: userid })
        this.toggle()
    }
    getalltasks = (projectid) => {
        this.props.getAllTasksForCombo({ ProjectId: projectid, isAllChecked: false })
    }
    columnwidth = (item) => {
        if (item == "Project") {
            item = 250;
        }
        else if (item == "IssueKey") {
            item = 150;
        }
        else if (item == "Total") {
            item = 100;
        }
        else if (item == "UserName") {
            item = 300;
        }
        else if (item == "CBS") {
            item = 150;
        }
        else if (item == "DM") {
            item = 150;
        }
        else if (item == "EIMP") {
            item = 150;
        }
        else if (item == "GEN") {
            item = 150;
        }
        else if (item == "IRAP") {
            item = 150;
        }
        else if (item == "IRI") {
            item = 150;
        }
        else if (item == "PROC") {
            item = 150;
        }
        else if (item == "SYS") {
            item = 150;
        }
        else if (item == "VCEN") {
            item = 150;
        }
        else if (item == "VCOM") {
            item = 150;
        }
        else if (item == "VCRM") {
            item = 150;
        }
        else {
            item = 55
        }
        return item;

    }
    render() {
        const usersdata = this.props.employeedata
        const worklogcolumn = this.getworkLogcolumn(this.props.employeedata)
        const worklogTable = this.getworkLogTable(this.props.employeedata)

        const headerStyle = {
            backgroundColor: '#1abc9c',
            color: 'white',
            fontSize: 'small',
        }
        const columns = [];
        for (var j = 0; j < worklogcolumn.length; j++) {
            if (worklogcolumn[j].ColumnName != "UserId" && worklogcolumn[j].ColumnName != "TaskId" && worklogcolumn[j].ColumnName != "Name" && worklogcolumn[j].ColumnName != "Summary" && worklogcolumn[j].ColumnName != "Estimate" && worklogcolumn[j].ColumnName != "TimeSpent" && worklogcolumn[j].ColumnName != "RemainingEstimate") {
                const col = {
                    Header: worklogcolumn[j].ColumnName,
                    accessor: worklogcolumn[j].ColumnName,
                    headerStyle: headerStyle,
                    className: "td-border",
                    width: this.columnwidth(worklogcolumn[j].ColumnName)
                }

                columns.push(col)
            }
        }
        const _this = this;
        return (
            <>
                <div className="col-md-12" style={{ marginTop: "9px", marginBottom: "25px" }} >
                    <div className="col-md-4" style={{ color: "#2e508f", paddingTop: "8px", marginLeft: "-13px" }} ><h3>Worklog</h3></div>
                    <div id="container" className="row ei-page-title">
                        <div className="col-md-12">
                            <div className="pull-right">
                                <div className="btn-toolbar" role="toolbar" aria-label="...">
                                    <div className="btn-group" role="group" aria-label="...">
                                        <select className="form-control" id="inputuserid" value={this.state.userId} onChange={this.changeuser} name="UserId" style={{ width: "170px" }}>
                                            {
                                                usersdata.users.map(function (item, index) {
                                                    return <option key={index} value={item.Value}>{item.Text}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="btn-group" role="group" aria-label="...">
                                        <select className="form-control" id="inputviewid" onChange={this.changeuser} name="ViewId" style={{ width: "170px" }}>
                                            <option value='0' >Users</option>
                                            <option value='1'>Team</option>
                                            <option value='2'>Project</option>
                                        </select>
                                    </div>
                                    <div className="btn-group hidden-xs" role="group" aria-label="...">
                                        <div className="btn-group" role="group" aria-label="...">
                                            <button id="btnPrev" onClick={_this.prevMonth} className="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Previous Month">
                                                <i className="fa fa-angle-left fa-fw"></i>
                                            </button>
                                            <button id="btnTitle" className="btn btn-default hidden-sm hidden-xs" style={{ fontWeight: "bold", width: "120px" }} value="">{_this.state.fulldate}</button>
                                            <button id="btnNext" onClick={_this.nextMonth} className="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Next Month">
                                                <i className="fa fa-angle-right fa-fw"></i>
                                            </button>
                                        </div>
                                       
                                        {/* { this.props.dashboardData.UserRole="Admin" && */}
                                            <div className="btn-group" role="group" aria-label="...">
                                                <button id="btnAddworkLog" onClick={this.addWorklog} className="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Add Worklog">
                                                    <i className="fa fa-plus fa-fw"></i>
                                                </button>
                                            </div>
                                        {/* } */}
                                        <div className="btn-group" role="group" aria-label="...">
                                            <button id="btnRefresh" onClick={this.refreshdata} className="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Refresh Data">
                                                <i className="fa fa-refresh fa-fw"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="btn-group   hidden-sm hidden-md hidden-lg">
                                        <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" title="More Options">
                                            <i className="fa fa-ellipsis-v fa-fw"></i>
                                        </button>
                                        <ul className="dropdown-menu pull-right">
                                            <li id="mnuPrev"><a href="#" ><i className="fa fa-angle-left fa-fw"></i>&nbsp;Previous Month</a></li>
                                            <li id="mnuNext"><a href="#"><i className="fa fa-angle-right fa-fw"></i>&nbsp;Next Month</a></li>
                                            <li id="mnuAddworkLog"><a href="#" ><i className="fa fa-plus fa-fw"></i>&nbsp;Add Worklog</a></li>
                                            <li id="mnuRefresh"><a href="#" ><i className="fa fa-refresh fa-fw"></i>&nbsp;Refresh</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid" style={{ padding: '10px', paddingBottom: '30px' }}>
                    <ReactTable className="-highlight -striped"
                        columns={columns}
                        data={worklogTable}
                        showPagination={false}
                        pageSize={worklogTable.length}
                        sortable={false}
                        getTrProps={(state, rowInfo, column, instance) => {
                            // console.log("rowinfo", rowInfo)
                            return rowInfo

                        }}
                    />
                </div>
                <WorklogModal isOpen={this.state.isOpen} toggle={this.toggle} employeeData={this.props.employeeData} getalltasks={(projectid) => this.getalltasks(projectid)} userId={this.state.userId} viewid={this.state.viewid} refreshdata={this.refreshdata} />
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
    return bindActionCreators({ bindWorklogs, getAllProjects, getAllTasksForCombo }, dispatch)
}
export default connect(mapStateToProps, dispactchstatetoprops)(Worklog) 