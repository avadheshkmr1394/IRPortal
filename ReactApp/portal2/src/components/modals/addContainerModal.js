import React from 'react'
import Modal from 'react-modal';
import { saveContainer } from '../../actions/adminAction'


class AddContainerModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            containerId: this.props.container.length == 0 ? '' : this.props.container[0].ContainerId,
            name: this.props.container.length == 0 ? '' : this.props.container[0].Name,
            directories: this.props.container.length == 0 ? '' : this.props.container[0].Directories
        }
    }
    
    toggleModal() {
        this.props.toggle();
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        if (this.state.containerId != '') {
            await saveContainer(this.state)
        }
        else if (this.state.containerId == '') {
            await saveContainer(this.state)
        }
        this.props.refreshData()
        this.cancelModal();
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    cancelModal = () => {
        this.props.toggle();
    }

    render() {
        return (
            <>
                <Modal isOpen={this.props.isOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.toggleModal} ariaHideApp={false} className='modal-style' contentLabel="">
                    <div id='addContainerModal' className={'v-modal-transparet-header'}>
                        <div className={'modal fade-in'} style={{ display: 'block' }}>
                            <div className={'modal-dialog modal-wd95pc-mwd-618'} style={{ margin: '8.75rem 48.75rem' }}>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="modal-content delete-modal">
                                        <div className="modal-header">
                                            <h4 style={{ marginRight: "auto" }} >Container: {this.state.UserName} </h4>
                                            <div className='inline-block right pdT9'><span id='spnCancel' className='cursor-pointer v-bold' onClick={this.cancelModal}>X</span></div>
                                        </div>
                                        <div className="modal-body delete-modal" >
                                            <div className="form-horizontal">
                                                <div className="row">
                                                    <label className="col-md-4">Name</label>
                                                    <div className="col-md-7">
                                                        <input type="text" className="form-control" onChange={this.handleChange} name="name" value={this.state.name} />
                                                    </div>
                                                </div>
                                                <br />
                                                <div className="row">
                                                    <label className="col-md-4">Directories</label>
                                                    <div className="col-md-7">
                                                        <input type="text" className="form-control" onChange={this.handleChange} name="directories" value={this.state.directories} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="submit" className="btn btn-success" id="saveContainer">Save</button><button type="button" id="btnCancelDialog" className="btn btn-default" onClick={this.cancelModal} >Cancel</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Modal>
            </>
        )
    }
}

export default AddContainerModal