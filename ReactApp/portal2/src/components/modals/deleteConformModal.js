import React from 'react'
import Modal from 'react-modal';

class DeleteConformModal extends React.Component {
    toggleModal() {
        this.props.toggle();
    }
    render() {
        return (
            <Modal isOpen={this.props.isOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.toggleModal} ariaHideApp={false} className='modal-style' contentLabel="">
                <div id='deleteConformModal' className="v-modal-transparet-header">
                    <div className={'modal fade-in'} style={{ display: 'block' }}>
                        <div className={'modal-dialog modal-wd95pc-mwd-618'} style={{ margin: '8.75rem 48.75rem' }}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 style={{ marginRight: "auto" }} ><i className='fa fa-trash'></i> Delete</h4>
                                    <div className='inline-block right pdT9'><span id='spnCancel' className='cursor-pointer v-bold' onClick={() => { this.props.toggle(); }}>X</span></div>
                                </div>
                                <div className="modal-body delete-modal" >
                                    <span>{this.props.conformText}</span>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" onClick={() => { this.props.onClickEvent(this.props.id) }} className="btn btn-success" id="deleteConfirm">Delete</button>
                                    <button type="button" id="btnCancelDialog" className="btn btn-default" onClick={() => { this.props.toggle(); }} >Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default DeleteConformModal


