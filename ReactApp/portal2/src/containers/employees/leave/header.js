import React from 'react'
import AddLeaveModal from '../../../components/modals/addLeaveModal'
import DeleteConformModal from '../../../components/modals/deleteConformModal'
import WarningModal from '../../../components/modals/warningModal'
import { approveEmployeeLeave, employeeLeaveCount } from '../../../actions/leaveAction'
import LeaveRecordsModal from '../../../components/modals/leaveRecordsModal'
import { deleteLeave } from '../../../actions/leaveAction'

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            userId: '',
            isOpen: false,
            modalType: '',
            reverseYear: []
        }
    }

    componentWillMount() {
        this.academicYear()
    }

    academicYear = () => {
        var date = new Date();
        var reverseYear = [];
        for (var i = 2014; i <= date.getFullYear(); i++) {
            const collection = {
                value: i,
                text: i 
            }
            reverseYear.push(collection);
        }
        this.setState({
            reverseYear: reverseYear.reverse()
        })
    }


    componentDidMount() {
        if (document.getElementsByClassName('total-leaves').item(0) != null) {
            document.getElementsByClassName('total-leaves').item(0).parentNode.parentElement.classList.add("total-leave-row")
        }
        document.getElementById("btnSave").style.display = "none"
        document.getElementById("btnCancelEdit").style.display = "none"
        document.getElementById("btnInsertNew").style.display = "none"
        document.getElementById("btnDelete").style.display = "none"
        document.getElementById("btnEdit").style.display = "block"
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    refreshData = () => {
        this.props.onPress();
    }

    changeUser = () => {
        const userId = document.getElementById('inputUserId').value
        this.setState({
            userId: userId
        })
        this.refreshData();
    }

    approveLeave = async () => {
        if (this.props.leaveId != "") {
            await approveEmployeeLeave({ LeaveId: this.props.leaveId, employeeId: this.props.employeeId, IsApproved: true, year: this.props.years });
            this.refreshData();
        }
        else {
            this.refreshData();
        }
    }

    leaveRecord = async () => {
        this.props.leaveRecords()
        this.setState({
            modalType: "leaveRecordsModal"
        })
        this.toggle();
    }

    deleteLeave = async (leaveId) => {
        await deleteLeave({ LeaveId: leaveId });
        this.refreshData();
        this.toggle();
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

    render() {
        const usersData = this.props.employeeData
        const leaveCount = this.props.employeeData
        const userRole = this.props.dashboardData.userRole
        return (
            <>
                <div className='row'>
                    <div className="col-md-6">
                        <div className="pull-left" ><h3>Leaves</h3></div>
                    </div>
                    <div id="container" className="col-md-6">
                        <div className="float-right">
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
                                        <select className="form-control" id="inputUserId" disabled={userRole == 'Admin' ? false : true} value={this.state.userId == '' ? this.props.dashboardData.employeeId : this.state.userId} onChange={this.changeUser} style={{ width: "170px" }}>
                                            {
                                                usersData.users.map(function (item, index) {
                                                    return <option key={index} value={item.Value}>{item.Text}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <span>&nbsp;&nbsp;</span>
                                    <div className="btn-group" role="group" aria-label="...">
                                        <select id='getYear' onChange={this.changeUser} id="inputYear" className="form-control">
                                            {
                                                this.state.reverseYear.map(function (item, index) {
                                                    return <option key={index} value={`${item.value}`}>{item.text}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <span>&nbsp;&nbsp;</span>
                                    <div className="btn-group hidden-sm hidden-xs" role="group" aria-label="...">
                                        <div className="btn-group" role="group" aria-label="...">
                                            <button id="btnEdit" className="btn btn-default ir-btn-neutral-outline ir-btn-neutral-outline" onClick={this.btnEditClick} data-toggle="tooltip" data-placement="bottom" title="Edit Leaves">
                                                <span className="hidden-sm hidden-xs"><i className="fa fa-edit fa-fw"></i></span>
                                            </button>
                                        </div>
                                        <div className="btn-group" role="group" aria-label="...">
                                            {userRole == "Admin" ? this.props.status != '' ? <button id="btnSave" className="btn btn-default ir-btn-neutral-outline" data-toggle="tooltip" data-placement="bottom" title="Update Leaves"><span className="hidden-sm hidden-xs"><i className="fa fa-save fa-fw"></i></span></button> : <button id="btnSave" disabled className="btn btn-default ir-btn-neutral-outline" data-toggle="tooltip" data-placement="bottom" title="Update Leaves"> <span className="hidden-sm hidden-xs"><i className="fa fa-save fa-fw"></i></span>
                                            </button> : this.props.status == "Pending" ? <button id="btnSave" className="btn btn-default ir-btn-neutral-outline" data-toggle="tooltip" data-placement="bottom" title="Update Leaves"><span className="hidden-sm hidden-xs"><i className="fa fa-save fa-fw"></i></span></button> : <button id="btnSave" disabled className="btn btn-default ir-btn-neutral-outline" data-toggle="tooltip" data-placement="bottom" title="Update Leaves"><span className="hidden-sm hidden-xs"><i className="fa fa-save fa-fw"></i></span>
                                            </button>}
                                        </div>
                                        <div className="btn-group" role="group" aria-label="...">
                                            <button id="btnCancelEdit" className="btn btn-default ir-btn-neutral-outline" onClick={this.btnCancelEdit} data-toggle="tooltip" data-placement="bottom" title="Cancel Update">
                                                <span className="hidden-sm hidden-xs"><i className="fa fa-minus-circle fa-fw"></i></span>
                                            </button>
                                        </div>
                                        <div className="btn-group" role="group" aria-label="...">
                                            <button id="btnInsertNew" className="btn btn-default ir-btn-neutral-outline" type="button" onClick={() => this.toggle(this.setState({ modalType: 'addModal' }))} data-toggle="tooltip" data-placement="bottom" title="Add Leaves">
                                                <span className="hidden-sm hidden-xs"><i className="fa fa-plus-circle fa-fw"></i></span>
                                            </button>
                                        </div>
                                        <div className="btn-group" role="group" aria-label="...">
                                            {userRole == "Admin" ? this.props.status != '' ? <button id="btnDelete" className="btn btn-default ir-btn-neutral-outline" data-toggle="tooltip" onClick={() => this.toggle(this.setState({ modalType: "deleteModal" }))} data-placement="bottom" title="Delete Leave">
                                                <span className="hidden-sm hidden-xs"><i className="fa fa-trash fa-fw"></i></span>
                                            </button> : <button id="btnDelete" disabled className="btn btn-default ir-btn-neutral-outline" data-toggle="tooltip" data-placement="bottom" title="Delete Leave">
                                                    <span className="hidden-sm hidden-xs"><i className="fa fa-trash fa-fw"></i></span>
                                                </button> : this.props.status == "Pending" ? <button id="btnDelete" onClick={() => this.toggle(this.setState({ modalType: "deleteModal" }))} className="btn btn-default ir-btn-neutral-outline" data-toggle="tooltip" data-placement="bottom" title="Delete Leave">
                                                    <span className="hidden-sm hidden-xs"><i className="fa fa-trash fa-fw"></i></span>
                                                </button> : <button id="btnDelete" disabled className="btn btn-default ir-btn-neutral-outline" data-toggle="tooltip" data-placement="bottom" title="Delete Leave">
                                                        <span className="hidden-sm hidden-xs"><i className="fa fa-trash fa-fw"></i></span>
                                                    </button>}
                                        </div>
                                    </div>
                                    <span>&nbsp;&nbsp;</span>
                                    <div className="btn-group hidden-sm hidden-xs" role="group" aria-label="...">
                                        <div className="btn-group" role="group" aria-label="...">
                                            {userRole == "Admin" ? <button id="btnLeaveRecord" className="btn btn-default ir-btn-neutral-outline" onClick={this.leaveRecord} data-toggle="tooltip" data-placement="bottom" title="Leave Record">
                                                <span className="hidden-sm hidden-xs"><i className="fas fa-file-alt"></i></span>
                                            </button> : <button id="btnLeaveRecord" disabled className="btn btn-default ir-btn-neutral-outline" data-toggle="tooltip" data-placement="bottom" title="Leave Record">
                                                    <span className="hidden-sm hidden-xs"><i className="fas fa-file-alt"></i></span>
                                                </button>}
                                        </div>
                                        <div className="btn-group" role="group" aria-label="...">
                                            {userRole == "Admin" ? this.props.status == "Pending" ? <button id="btnApproveLeave" className="btn btn-default ir-btn-neutral-outline" data-toggle="tooltip" onClick={() => this.approveLeave()} data-placement="bottom" title="Approve Leave">
                                                <span className="hidden-sm hidden-xs"><i className="fas fa-thumbs-up"></i></span>
                                            </button> : <button id="btnApproveLeave" disabled className="btn btn-default ir-btn-neutral-outline" data-toggle="tooltip" data-placement="bottom" title="Approve Leave">
                                                    <span className="hidden-sm hidden-xs"><i className="fas fa-thumbs-up"></i></span>
                                                </button> : <button id="btnApproveLeave" disabled className="btn btn-default ir-btn-neutral-outline" data-toggle="tooltip" data-placement="bottom" title="Approve Leave">
                                                    <span className="hidden-sm hidden-xs"><i className="fas fa-thumbs-up"></i></span>
                                                </button>}
                                        </div>
                                        <div className="btn-group" role="group" aria-label="...">
                                            <button id="btnrefresh" onClick={this.refreshData} className="btn btn-default ir-btn-neutral-outline" data-toggle="tooltip" type="button" title="Refresh Data">
                                                <span className="hidden-sm hidden-xs"><i className="fas fa-sync-alt"></i></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {(this.state.isOpen == true && this.state.modalType == "addModal") && <AddLeaveModal isOpen={this.state.isOpen} toggle={this.toggle.bind(this)} refreshData={this.refreshData} />}
                {(this.state.isOpen == true && this.state.modalType == "deleteModal") && <DeleteConformModal isOpen={this.state.isOpen} toggle={this.toggle.bind(this)} conformText={'Are you sure you want to permanently delete this record?'} id={this.props.leaveId} onClickEvent={this.deleteLeave} />}
                {(this.state.isOpen == true && this.state.modalType == "leaveRecordsModal") && <LeaveRecordsModal isOpen={this.state.isOpen} toggle={this.toggle.bind(this)} leaveRecords={this.props.employeeData.leaveRecord} />}
            </>
        )
    }
}
export default Header