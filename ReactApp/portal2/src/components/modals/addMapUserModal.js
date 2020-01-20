import React from 'react'
import Modal from 'react-modal';

class AddMapUserModal extends React.Component {

    toggleModal() {
        this.props.toggle();
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.toggleModal} ariaHideApp={false} className='modal-style' contentLabel="">
                <div id='addMapUserModal' className="v-modal-transparet-header">
                    <div className={'modal fade-in'} style={{ display: 'block' }}>
                        <div className={'modal-dialog modal-wd95pc-mwd-618'} style={{ margin: '8.75rem 48.75rem' }}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 style={{ marginRight: "auto" }} >Employee</h4>
                                    <div className='inline-block right pdT9'><span id='spnCancel' className='cursor-pointer v-bold' onClick={() => { this.props.toggle(); }}>X</span></div>
                                </div>
                                <div className="modal-body" >
                                    <div className="row">
                                        <label className="col-md-4">User Name</label>
                                        <div className="col-md-7">
                                            <select className='form-control'>
                                                {
                                                    this.props.user.map(function (item, index) {
                                                        return <option key={index} value={item.Value}>{item.Text}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
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
export default AddMapUserModal