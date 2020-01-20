import React from 'react'
import Modal from 'react-modal';

class WarningModal extends React.Component {

    toggleModal() {
        this.props.toggle();
    }
    
    render() {

        return (
            <Modal isOpen={this.props.isOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.toggleModal} ariaHideApp={false} className='modal-style' contentLabel="">
                <div id='warningModal' className="v-modal-transparet-header">
                    <div className={'modal fade-in'} style={{ display: 'block' }}>
                        <div className={'modal-dialog modal-wd95pc-mwd-618'} style={{ margin: '8.75rem 48.75rem' }}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 style={{ marginRight: "auto" }} ><i className='fa fa-trash'></i> Warning</h4>
                                    <div className='inline-block right pdT9'><span id='spnCancel' className='cursor-pointer v-bold' onClick={() => { this.props.toggle(); }}>X</span></div>
                                </div>
                                <div className="modal-body delete-modal" >
                                    <span>{this.props.warningText}</span>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" id="btnCancelDialog" className="btn btn-default" onClick={() => { this.props.toggle() }} >OK</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}
export default WarningModal