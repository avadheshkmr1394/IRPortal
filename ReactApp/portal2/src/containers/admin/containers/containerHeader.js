import React from 'react'
import AddContainerModal from '../../../components/modals/addContainerModal'
import DeleteConformModal from '../../../components/modals/deleteConformModal'
import WarningModal from '../../../components/modals/warningModal'
import { deleteContainer } from '../../../actions/adminAction'
import { editContainer } from '../../../actions/adminAction'


class ContainerHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
            modalType: '',
            container: [],
            warningText: ''
        }
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    refreshData = () => {
        this.props.onPressContainer();
    }

    editContainer = async (containerId) => {
        if (containerId != '') {
            await editContainer({ containerId: containerId }).then(res => {
                this.setState({
                    container: [res.data]
                })
            })
        }
        {
            this.setState({
                modalType: containerId == '' ? 'deleteModal' : 'addModal',
                warningText: containerId == '' ? 'Please select a Container.' : ''
            })

        }
        this.toggle()
    }

    deleteRecords = async (containerId) => {
        if (containerId != '') {
            await deleteContainer({ containerId: containerId })
            await this.refreshData();
            this.toggle();
        }
    }

    render() {
        return (
            <>
                <div className='row'>
                    <div className="col-md-6">
                        <div className="pull-left" >
                            <div className="btn-toolbar" id='containerHeader' role="toolbar" aria-label="...">
                                <div className="btn-group hidden-sm hidden-xs" role="group" aria-label="...">
                                    <div className="btn-group" role="group" aria-label="...">
                                        <button id="btnContainerDetailEdit" className="btn btn-default ir-btn ir-btn-neutral-outline wd35" onClick={() => this.editContainer(this.props.containerId)} data-toggle="tooltip" data-placement="bottom" title="Edit Container Detail">
                                            <i className="fa fa-edit"></i>
                                        </button>
                                    </div>
                                    <div className="btn-group" role="group" aria-label="...">
                                        <button id="btnContainerDetailAdd" onClick={() => this.toggle(this.setState({ modalType: 'addModal', container: '' }))} className="btn btn-default ir-btn ir-btn-neutral-outline wd35" data-toggle="tooltip" data-placement="bottom" title="Add Container Detail">
                                            <i className="fa fa-plus"></i>
                                        </button>
                                    </div>
                                    <div className="btn-group" role="group" aria-label="...">
                                        <button id="btnContainerDetailDelete" onClick={() => this.toggle(this.setState({ modalType: 'deleteModal', warningText: 'Select a record to delete.' }))} className="btn btn-default ir-btn ir-btn-neutral-outline wd35" data-toggle="tooltip" data-placement="bottom" title="Delete Container Detail">
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </div>
                                    <div className="btn-group" role="group" aria-label="...">
                                        <button id="btnContainerDetailRefresh" className="btn btn-default ir-btn ir-btn-neutral-outline wd35" data-toggle="tooltip" onClick={this.refreshData} data-placement="bottom" title="Refresh Data">
                                            <i className="fas fa-sync-alt"></i>
                                        </button>
                                    </div>
                                    <span>&nbsp;&nbsp;</span> <div className="btn-group" role="group" aria-label="...">
                                        <input type='text'   placeholder='Search...' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {(this.state.isOpen == true && this.state.modalType == 'addModal') && <AddContainerModal toggle={this.toggle} isOpen={this.state.isOpen} container={this.state.container} refreshData={this.refreshData} />}
                {(this.state.isOpen == true && this.state.modalType == "deleteModal" && this.props.containerId != '') && <DeleteConformModal isOpen={this.state.isOpen} toggle={this.toggle.bind(this)} refreshData={this.refreshData} conformText={'Are you sure you want to permanently delete this record?'} id={this.props.containerId} onClickEvent={this.deleteRecords} />}
                {(this.state.isOpen == true && this.state.modalType == "deleteModal" && this.props.containerId == '') && <WarningModal isOpen={this.state.isOpen} toggle={this.toggle.bind(this)} warningText={this.state.warningText} />}
            </>
        )
    }
}
export default ContainerHeader