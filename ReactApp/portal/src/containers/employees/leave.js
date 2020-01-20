import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css';
import '../../css/bootstrap.css';
import { LeaveModal } from '../../common/addModal'
import { getEmpLeaves,bindingLeaveRecord } from '../../actions/employeeActions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { approveEmployeeLeave,employeeLeaveCount } from '../../actions/leaveAction'
import { getFormattedTiming } from '../../common/utils';


class Leaves extends React.Component {
    constructor() {
        super();
        this.state = {
            item: [],
            isOpen: false,
            type: "",
            rowBackgoundColor: "",
            leaveId: "",
            leaveRecords: [],
            employeeId: '',
            years: '',
            userId: '',
            status: ''
        }
    }
    
    componentDidMount() {
        if (this.state.rowBackgoundColor == "") {
            if (document.getElementsByClassName('total-leaves').item(0) != null) {
                document.getElementsByClassName('total-leaves').item(0).parentNode.parentElement.classList.add("total-leave-row")
            }
            document.getElementById("btnSave").style.display = "none"
            document.getElementById("btnCancelEdit").style.display = "none"
            document.getElementById("btnInsertNew").style.display = "none"
            document.getElementById("btnDelete").style.display = "none"
            document.getElementById("btnEdit").style.display = "block"
        }
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
    isApprovedleave = (item) => {
        if (item == true) {
            item = <span style={{ color: "#008000" }}>Approved</span>;
        }
        else {
            item = <span style={{ color: "#ff0000" }}>Pending</span>;
        }
        return item;
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    refreshData = () => {
        const userId = document.getElementById('inputUserId').value
        this.props.getEmpLeaves({ employeeId: userId, year: (new Date()).getFullYear() });
        this.props.employeeLeaveCount({ employeeId: userId })
        this.setState({
            rowBackgoundColor: '',
            leaveId: '',
            employeeId: ''
        })
    }

    deleteLeave = async (leaveId) => {       
        if (leaveId != "") {
            this.setState({type: 'delete' })
            this.toggle();
        }
        else {
            this.setState({
                type: "rowselection"
            })
            this.toggle();
        }
    }
    setLeaveId = () => {
        this.setState({
            leaveId: ""
        })
    }

    getLeaveData = (leaveData) => {
        
        const leaveArr = [];
        if (leaveData.employeeLeaves.Leaves != null) {
            for (var i = 0; i < leaveData.employeeLeaves.Leaves.length; i++) {
                var dataCollection = {
                    leaveId: leaveData.employeeLeaves.Leaves[i].LeaveId,
                    employeeId: leaveData.employeeLeaves.Leaves[i].EmployeeId,
                    leaveDate: <span>{getFormattedTiming(leaveData.employeeLeaves.Leaves[i].LeaveDate)} <input type="hidden" value={leaveData.employeeLeaves.Leaves[i].LeaveId} /></span>,
                    isApproved: this.isApprovedleave(leaveData.employeeLeaves.Leaves[i].IsApproved),
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
        return leaveArr;
    }
    selectLeaveRow = (leaveId, employeeId, date, isApproved) => {
        
        if (leaveId != null) {
            var getyear = (new Date(date)).getFullYear()
            this.setState({
                leaveId: leaveId,
                employeeId: employeeId,
                years: getyear,
                rowBackgoundColor: "#ffefbb",
                status: isApproved.props.children
            })
        }
        else {
            this.setState({
                leaveId: "",
                rowBackgoundColor: ""
            })
        }
    }
    leaveRecord = async () => {
        await this.props.bindingLeaveRecord();
        this.setState({
            leaveRecords: this.props.leaveData.leaveRecord,
            type: "leaveRecordsModal"
        })
        this.toggle();
    }
    approveLeave = async (leaveId, employeeId, year) => {
        if (leaveId != "") {
            await approveEmployeeLeave({ LeaveId: leaveId, employeeId: employeeId, IsApproved: true, year: year });
            this.refreshData();
        }
        else {
            this.setState({
                type: "leaveRowSelectionModal"
            })
            this.toggle();
        }
    }
    btnEditClick = () => {
        document.getElementById("btnSave").style.display = "block"
        document.getElementById("btnCancelEdit").style.display = "block"
        document.getElementById("btnInsertNew").style.display = "block"
        document.getElementById("btnDelete").style.display = "block"
        document.getElementById("btnEdit").style.display = "none"
    }
    btnCancelEdit = () => {
        document.getElementById("btnSave").style.display = "none"
        document.getElementById("btnCancelEdit").style.display = "none"
        document.getElementById("btnInsertNew").style.display = "none"
        document.getElementById("btnDelete").style.display = "none"
        document.getElementById("btnEdit").style.display = "block"
    }
    changeUser = () => {
        const userId = document.getElementById('inputUserId').value
        this.setState({
            userId: userId
        })
        this.props.getEmpLeaves({ employeeId: userId, year: (new Date()).getFullYear() });
        this.props.employeeLeaveCount({ employeeId: userId })
    }
    render() {
        const headerStyle = {
            backgroundColor: '#1abc9c',
            color: 'white',
            fontSize: 'small',
        }
        const leaveData = this.getLeaveData(this.props.leaveData)
        const columns = [
            {
                Header: "Date",
                accessor: "leaveDate",
                headerStyle: headerStyle,
                width: 100
            },
            {
                Header: "Type",
                accessor: "leaveType",
                headerStyle: headerStyle,
                width: 100
            },
            {
                Header: "Leave Count",
                accessor: "leaveCount",
                headerStyle: headerStyle,
                width: 100
            },
            {
                Header: "Status",
                accessor: "isApproved",
                headerStyle: headerStyle,
                width: 100
            },
            {
                Header: "Remarks",
                accessor: "remarks",
                headerStyle: headerStyle,
            }
        ]
        const usersData = this.props.leaveData
        const leaveCount = this.props.leaveCount
        const userRole = this.props.dashboardData.userRole
        
        const _this = this
        return (
            <>
                <div className="col-sm-12" style={{ marginBottom: "8px", marginTop: "11px"  }} >
                <div className="pull-left" style={{ color: "#2e508f" }} ><h3>Leaves</h3></div>
                    <div id="container" className="row ei-page-title">
                        <div className="col-md-12">
                            <div className="pull-right">
                                <div className="btn-toolbar" role="toolbar" aria-label="...">
                                    <div className="btn-group" role="group" aria-label="...">
                                        {
                                            leaveCount.employeeLeaveCount.map(function (item, index) {
                                                return <div key={index} className='leave-beleance' ><b style={{ marginTop: '5px' }} ><b style={{ color: '#f8f9fa', fontSize: "15px", background: '#8888889c' }} key={index} id="balLeaves">CL : <b style={{ color: (`${item.TotalCL - item.CL}`).substring(0, 1) == "-" ? "red" : "" }}  >{item.TotalCL - item.CL}</b> EL : <b style={{ color: (`${item.TotalEL - item.EL}`).substring(0, 1) == "-" ? "red" : "" }} >{item.TotalEL - item.EL}</b> SL : <b style={{ color: (`${item.TotalSL - item.SL}`).substring(0, 1) == "-" ? "red" : "" }}>{item.TotalSL - item.SL}</b></b></b></div>
                                            })
                                        }
                                    </div>
                                    <span>&nbsp;&nbsp;</span>
                                    <div className="btn-group" role="group" aria-label="...">
                                        <select className="form-control" id="inputUserId" value={this.state.userId == '' ? this.props.dashboardData.EmployeeId : this.state.userId} onChange={this.changeUser} style={{ width: "170px" }}>
                                            {
                                                usersData.users.map(function (item, index) {
                                                    return <option key={index} value={item.Value}>{item.Text}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <span>&nbsp;&nbsp;</span>
                                    <div className="btn-group hidden-sm hidden-xs" role="group" aria-label="...">
                                        <div className="btn-group" role="group" aria-label="...">
                                            <button id="btnEdit" className="btn btn-default" onClick={this.btnEditClick} data-toggle="tooltip" data-placement="bottom" title="Edit Leaves">
                                                <span className="hidden-sm hidden-xs"><i className="fa fa-edit fa-fw"></i></span>
                                            </button>
                                        </div>
                                        <div className="btn-group" role="group" aria-label="...">
                                            {userRole == "Admin" ? this.state.status != '' ? <button id="btnSave" className="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Update Leaves"><span className="hidden-sm hidden-xs"><i className="fa fa-save fa-fw"></i></span></button> : <button id="btnSave" disabled className="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Update Leaves"> <span className="hidden-sm hidden-xs"><i className="fa fa-save fa-fw"></i></span>
                                            </button> : this.state.status == "Pending" ? <button id="btnSave" className="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Update Leaves"><span className="hidden-sm hidden-xs"><i className="fa fa-save fa-fw"></i></span></button> : <button id="btnSave" disabled className="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Update Leaves"><span className="hidden-sm hidden-xs"><i className="fa fa-save fa-fw"></i></span>
                                            </button>}
                                        </div>
                                        <div className="btn-group" role="group" aria-label="...">
                                            <button id="btnCancelEdit" className="btn btn-default" onClick={this.btnCancelEdit} data-toggle="tooltip" data-placement="bottom" title="Cancel Update">
                                                <span className="hidden-sm hidden-xs"><i className="fa fa-minus-circle fa-fw"></i></span>
                                            </button>
                                        </div>
                                        <div className="btn-group" role="group" aria-label="...">
                                            <button id="btnInsertNew" className="btn btn-default" type="button" onClick={() => this.toggle(this.setState({ type: 'add' }))} data-toggle="tooltip" data-placement="bottom" title="Add Leaves">
                                                <span className="hidden-sm hidden-xs"><i className="fa fa-plus-circle fa-fw"></i></span>
                                            </button>
                                        </div>
                                        <div className="btn-group" role="group" aria-label="...">
                                            {userRole == "Admin" ? this.state.status != '' ? <button id="btnDelete" className="btn btn-default" data-toggle="tooltip" onClick={() => this.deleteLeave(this.state.leaveId)} data-placement="bottom" title="Delete Leave">
                                                <span className="hidden-sm hidden-xs"><i className="fa fa-trash fa-fw"></i></span>
                                            </button> : <button id="btnDelete" disabled className="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Delete Leave">
                                                    <span className="hidden-sm hidden-xs"><i className="fa fa-trash fa-fw"></i></span>
                                                </button> : this.state.status == "Pending" ? <button id="btnDelete" onClick={() => this.deleteLeave(this.state.leaveId)} className="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Delete Leave">
                                                    <span className="hidden-sm hidden-xs"><i className="fa fa-trash fa-fw"></i></span>
                                                </button> : <button id="btnDelete" disabled className="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Delete Leave">
                                                        <span className="hidden-sm hidden-xs"><i className="fa fa-trash fa-fw"></i></span>
                                                    </button>}
                                        </div>
                                    </div>
                                    <span>&nbsp;&nbsp;</span>
                                    <div className="btn-group hidden-sm hidden-xs" role="group" aria-label="...">
                                        <div className="btn-group" role="group" aria-label="...">
                                            {userRole == "Admin" ? <button id="btnLeaveRecord" className="btn btn-default" onClick={this.leaveRecord} data-toggle="tooltip" data-placement="bottom" title="Leave Record">
                                                <span className="hidden-sm hidden-xs"><i className="fa fa-file-text fa-fw"></i></span>
                                            </button> : <button id="btnLeaveRecord" disabled className="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Leave Record">
                                                    <span className="hidden-sm hidden-xs"><i className="fa fa-file-text fa-fw"></i></span>
                                                </button>}
                                        </div>
                                        <div className="btn-group" role="group" aria-label="...">
                                            {userRole == "Admin" ? this.state.status == "Pending" ? <button id="btnApproveLeave" className="btn btn-default" data-toggle="tooltip" onClick={() => this.approveLeave(this.state.leaveId, this.state.employeeId, this.state.years)} data-placement="bottom" title="Approve Leave">
                                                <span className="hidden-sm hidden-xs"><i className="fa fa-thumbs-o-up fa-fw"></i></span>
                                            </button> : <button id="btnApproveLeave" disabled className="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Approve Leave">
                                                    <span className="hidden-sm hidden-xs"><i className="fa fa-thumbs-o-up fa-fw"></i></span>
                                                </button> : <button id="btnApproveLeave" disabled className="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Approve Leave">
                                                    <span className="hidden-sm hidden-xs"><i className="fa fa-thumbs-o-up fa-fw"></i></span>
                                                </button>}
                                        </div>
                                        <div className="btn-group" role="group" aria-label="...">
                                            <button id="btnrefresh" onClick={this.refreshData} className="btn btn-default" data-toggle="tooltip" type="button" title="Refresh Data">
                                                <span className="hidden-sm hidden-xs"><i className="fa fa-refresh fa-fw"></i></span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* <div className="btn-group  hidden-md hidden-lg">
                                        <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="fa fa-ellipsis-v fa-fw"></i>
                                        </button>
                                        <ul className="dropdown-menu pull-right">
                                            <li id="mnuEdit"><a href="#" ><i className="fa fa-edit fa-fw"></i>&nbsp;Edit</a></li>
                                            <li id="mnuSave"><a href="#" ><i className="fa fa-save fa-fw"></i>&nbsp;Save</a></li>
                                            <li id="mnuCancelEdit"><a href="#"><i className="fa fa-minus-circle fa-fw"></i>&nbsp;Cancel</a></li>
                                            <li id="mnuInsertNew"><a href="#"><i className="fa fa-plus-circle fa-fw"></i>&nbsp;Add</a></li>
                                            <li id="mnuDelete"><a href="#" ><i className="fa fa-trash fa-fw"></i>&nbsp;Delete</a></li>
                                            <li role="separator" className="divider"></li>
                                            <li id="mnuLeaveRecord"><a href="#" ><i className="fa fa-file-text fa-fw"></i>&nbsp;Record</a></li>
                                            <li id="mnuApproveLeave"><a href="#" ><i className="fa fa-thumbs-o-up fa-fw"></i>&nbsp;Approve</a></li>
                                            <li id="mnuRefresh"><a href="#" ><i className="fa fa-refresh fa-fw"></i>&nbsp;Refresh</a></li>
                                        </ul>
                                    </div> */}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid" style={{  padding: '20px 10px 30px' }}>
                    <ReactTable className="-highlight -striped"
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
                                    backgroundColor: (this.state.leaveId === rowInfo.original.leaveId) ? this.state.rowBackgoundColor : "",
                                    fontSize: 'small',
                                }
                            }

                        }}

                    />
                </div>

             {this.state.isOpen == true &&  <LeaveModal isOpen={this.state.isOpen} toggle={this.toggle} refreshData={this.refreshData} type={this.state.type} leaveId={this.state.leaveId} setLeaveId={this.setLeaveId} leaveRecords={this.state.leaveRecords} />}

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
const mapdispatchtoprops = (dispatch) => {
    return bindActionCreators({ getEmpLeaves, bindingLeaveRecord, employeeLeaveCount }, dispatch)
}
export default connect(mapStateToProps, mapdispatchtoprops)(Leaves);