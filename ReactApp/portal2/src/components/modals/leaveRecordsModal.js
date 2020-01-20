import React from 'react'
import Modal from 'react-modal';


class LeaveRecordsModal extends React.Component {
    toggleModal() {
        this.props.toggle();
    }
    render() {
        return (
            <>
                <Modal isOpen={this.props.isOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.toggleModal} ariaHideApp={false} className='modal-style' contentLabel="">
                    <div id='leaveRecordsModal' className={'v-modal-transparet-header'}>
                        <div className={'modal fade-in'} style={{ display: 'block' }}>
                            <div className={'modal-dialog modal-wd95pc-mwd-618'} style={{ margin: '8.75rem 48.75rem' }}>
                                <div className="modal-content delete-modal">
                                    <div className="modal-header">
                                        <h4 style={{ marginRight: "auto" }} >Leave Record</h4>
                                        <div className='inline-block right pdT9'><span id='spnCancel' className='cursor-pointer v-bold' onClick={() => { this.props.toggle(); }}>X</span></div>
                                    </div>
                                    <div className="modal-body delete-modal" >

                                        <table className="table table-bordered table-striped table-sm" id="scrollbar">
                                            <thead className='green-color' style={{ display: 'block' }}>
                                                <tr>
                                                    <th style={{ width: '151px' }}>Employee</th>
                                                    <th style={{ width: '151px' }}>Total CL</th>
                                                    <th style={{ width: '151px' }}>CL</th>
                                                    <th style={{ width: '151px' }}>Total EL</th>
                                                    <th style={{ width: '151px' }}>EL</th>
                                                    <th style={{ width: '151px' }}>Total SL</th>
                                                    <th style={{ width: '151px' }}>SL</th>
                                                </tr>
                                            </thead>
                                            <tbody id='tbodyid' style={{ overflowY: 'auto', display: 'block' }}>
                                                {
                                                    this.props.leaveRecords.map(function name(item, index) {
                                                        return <tr key={index}>
                                                            <td style={{ width: '151px' }}>{item.EmployeeName}</td>
                                                            <td style={{ width: '151px' }}>{item.TotalCL}</td>
                                                            <td style={{ width: '151px' }}>{item.CL}</td>
                                                            <td style={{ width: '151px' }}>{item.TotalEL}</td>
                                                            <td style={{ width: '151px' }}>{item.EL}</td>
                                                            <td style={{ width: '151px' }}>{item.TotalSL}</td>
                                                            <td style={{ width: '151px' }}>{item.SL}</td>
                                                        </tr>

                                                    })
                                                }
                                            </tbody>
                                        </table>

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" id="btnCancelDialog" className="btn btn-success" onClick={() => { this.props.toggle() }} >OK</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </>
        )
    }
}
export default LeaveRecordsModal