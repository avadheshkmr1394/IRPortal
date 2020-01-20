import React from 'react'

import AddAddTaxSavingTypeModal from '../../../components/modals/addAddTaxSavingTypeModal'
import DeleteConformModal from '../../../components/modals/deleteConformModal'
import WarningModal from '../../../components/modals/warningModal'
import { editTaxSavingType, deleteTaxSavingType } from '../../../actions/employeeActions'

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
            modalType: '',
            taxSavingTypeItem: []
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

    editTaxSavingType = async (taxSavingType) => {
        await editTaxSavingType({ taxSavingType: taxSavingType }).then((res) => {
            this.setState({ taxSavingTypeItem: res.data, modalType: 'addModal' })
        })
        this.toggle()
    }

    deleteRecords = async (id) => {
        if (id != '') {
            await deleteTaxSavingType({ taxSavingType: id })
        }
        this.refreshData();
        this.toggle()
    }

    render() {
        return (
            <>
                <div className='row'>
                    <div className="col-md-6">
                        <div className="pull-left" ><h3>Tax Saving Types</h3></div>
                    </div>
                    < div id="container" className="col-md-6">
                        <div className="float-right">
                            <div className="pull-right">
                                <div className="btn-toolbar" role="toolbar" aria-label="...">
                                    <div className="btn-group hidden-sm hidden-xs" role="group" aria-label="...">
                                        <div className="btn-group" role="group" aria-label="...">
                                            {this.props.taxSavingType != '' ? <button id="btnTaxSavingTypeDetailEdit" className="btn btn-default ir-btn ir-btn-neutral-outline wd35" onClick={() => { this.editTaxSavingType(this.props.taxSavingType) }} data-toggle="tooltip" data-placement="bottom" title="Edit Holiday Detail">
                                                <i className="fa fa-edit"></i>
                                            </button> : <button id="btnTaxSavingTypeDetailEdit" className="btn btn-default ir-btn ir-btn-neutral-outline wd35" disabled data-toggle="tooltip" data-placement="bottom" title="Edit Holiday Detail">
                                                    <i className="fa fa-edit"></i>
                                                </button>}
                                        </div>
                                        <div className="btn-group" role="group" aria-label="...">
                                            <button id="btnTaxSavingTypeDetailAdd" onClick={() => this.toggle(this.setState({ modalType: 'addModal', taxSavingTypeItem: '' }))} className="btn btn-default ir-btn ir-btn-neutral-outline wd35" data-toggle="tooltip" data-placement="bottom" title="Add Holiday Detail">
                                                <i className="fa fa-plus"></i>
                                            </button>
                                        </div>
                                        <div className="btn-group" role="group" aria-label="...">
                                            <button id="btnTaxSavingTypeDetailDelete" onClick={() => this.toggle(this.setState({ modalType: 'deleteModal' }))} className="btn btn-default ir-btn ir-btn-neutral-outline wd35" data-toggle="tooltip" data-placement="bottom" title="Delete Holiday Detail">
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </div>
                                        <div className="btn-group" role="group" aria-label="...">
                                            <button id="btnTaxSavingTypeDetailRefresh" className="btn btn-default ir-btn ir-btn-neutral-outline wd35" data-toggle="tooltip" onClick={this.refreshData} data-placement="bottom" title="Refresh Data">
                                                <i className="fas fa-sync-alt"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {(this.state.isOpen == true && this.state.modalType == "addModal") && <AddAddTaxSavingTypeModal isOpen={this.state.isOpen} toggle={this.toggle.bind(this)} refreshData={this.refreshData} taxSavingTypeItem={this.state.taxSavingTypeItem} />}
                {(this.state.isOpen == true && this.state.modalType == "deleteModal" && this.props.taxSavingType != '') && <DeleteConformModal isOpen={this.state.isOpen} toggle={this.toggle.bind(this)} refreshData={this.refreshData} conformText={'Are you sure you want to permanently delete this record?'} id={this.props.taxSavingType} onClickEvent={this.deleteRecords} />}
                {(this.state.isOpen == true && this.state.modalType == "deleteModal" && this.props.taxSavingType == '') && <WarningModal isOpen={this.state.isOpen} toggle={this.toggle.bind(this)} warningText={'Select a record to delete.'} />}
            </>
        )
    }
}
export default Header