import React from 'react'
import AddHolidayModal from '../../../components/modals/addHolidayModal'
import DeleteConformModal from '../../../components/modals/deleteConformModal'
import WarningModal from '../../../components/modals/warningModal'
import { deleteHoliday } from '../../../actions/employeeActions'
import { editHoliday } from '../../../actions/employeeActions'
import moment from 'moment'




class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
            modalType: '',
            holidayItem: []
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle(e) {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    refreshData = () => {
        this.props.onPress();
    }

    editHoliday = async (holidayDate) => {
        holidayDate = moment(new Date(holidayDate)).format('YYYY-MM-DD');
        await editHoliday({ holidayDate: holidayDate }).then((res) => {
            this.setState({ holidayItem: res.data, modalType: 'addModal' })
        })
        this.toggle()
    }

    deleteRecords = async (id) => {
        if (id != '') {
            const holidayDate = moment(new Date(id)).format('YYYY-MM-DD');
            await deleteHoliday({ holidayDate: holidayDate })
        }
        this.refreshData();
        this.toggle()
    }

    render() {
        const userRole = this.props.dashboardData.userRole
        return (
            <>
                <div className='row'>
                    <div className="col-md-6">
                        <div className="pull-left" ><h3>Holidays</h3></div>
                    </div>
                    {(userRole == 'Admin' && this.props.action == 'displayAction') && < div id="container" className="col-md-6">
                        <div className="float-right">
                            <div className="pull-right">
                                <div className="btn-toolbar" role="toolbar" aria-label="...">
                                    <div className="btn-group hidden-sm hidden-xs" role="group" aria-label="...">
                                        <div className="btn-group" role="group" aria-label="...">
                                            {this.props.holidayDate != '' ? <button id="btnHolidayDetailEdit" className="btn btn-default ir-btn ir-btn-neutral-outline wd35" onClick={() => { this.editHoliday(this.props.holidayDate) }} data-toggle="tooltip" data-placement="bottom" title="Edit Holiday Detail">
                                                <i className="fa fa-edit"></i>
                                            </button> : <button id="btnHolidayDetailEdit" className="btn btn-default ir-btn ir-btn-neutral-outline wd35" disabled data-toggle="tooltip" data-placement="bottom" title="Edit Holiday Detail">
                                                    <i className="fa fa-edit"></i>
                                                </button>}
                                        </div>
                                        <div className="btn-group" role="group" aria-label="...">
                                            <button id="btnHolidayDetailAdd" onClick={() => this.toggle(this.setState({ modalType: 'addModal', holidayItem: '' }))} className="btn btn-default ir-btn ir-btn-neutral-outline wd35" data-toggle="tooltip" data-placement="bottom" title="Add Holiday Detail">
                                                <i className="fa fa-plus"></i>
                                            </button>
                                        </div>
                                        <div className="btn-group" role="group" aria-label="...">
                                            <button id="btnHolidayDetailDelete" onClick={() => this.toggle(this.setState({ modalType: 'deleteModal' }))} className="btn btn-default ir-btn ir-btn-neutral-outline wd35" data-toggle="tooltip" data-placement="bottom" title="Delete Holiday Detail">
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </div>
                                        <div className="btn-group" role="group" aria-label="...">
                                            <button id="btnHolidayDetailRefresh" className="btn btn-default ir-btn ir-btn-neutral-outline wd35" data-toggle="tooltip" onClick={this.refreshData} data-placement="bottom" title="Refresh Data">
                                                <i className="fas fa-sync-alt"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
                </div>
                {(this.state.isOpen == true && this.state.modalType == "addModal") && <AddHolidayModal isOpen={this.state.isOpen} toggle={this.toggle.bind(this)} refreshData={this.refreshData} holidayItem={this.state.holidayItem} />}
                {(this.state.isOpen == true && this.state.modalType == "deleteModal" && this.props.holidayDate != '') && <DeleteConformModal isOpen={this.state.isOpen} toggle={this.toggle.bind(this)} refreshData={this.refreshData} conformText={'Are you sure you want to permanently delete this record?'} id={this.props.holidayDate} onClickEvent={this.deleteRecords} />}
                {(this.state.isOpen == true && this.state.modalType == "deleteModal" && this.props.holidayDate == '') && <WarningModal isOpen={this.state.isOpen} toggle={this.toggle.bind(this)} warningText={'Select a record to delete.'} />}
            </>
        )
    }
}
export default Header



