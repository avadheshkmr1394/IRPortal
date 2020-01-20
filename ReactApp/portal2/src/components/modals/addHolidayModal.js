import React from 'react'
import Modal from 'react-modal';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/react-datepicker.css';



class AddHolidayModal extends React.Component {
    constructor() {
        super();
        this.state = {
            holidayDate: ''
        }
        this.toggleModal = this.toggleModal.bind(this);
        this._onChange = this._onChange.bind(this);
    }
    _onChange(seletedDate) {
        this.setState({
            holidayDate: seletedDate
        })
    }
    toggleModal() {
        this.props.toggle();
    }
    render() {
        return (
            <>
                <Modal isOpen={this.props.isOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.toggleModal} className='modal-style' contentLabel="">
                    <div id='addHolidayModal' className={'ir-modal-blue-header'}>
                        <div className={'modal fade-in'} style={{ display: 'block' }}>
                            <div className={'modal-dialog wd400'}>
                                <div className="modal-content">
                                    <div className="modal-header">
                                    <div class="title">Add Holiday</div>
                                        <div className='inline-block right pdT9'>
                                            <span id='spnCancel' onClick={() => { this.props.toggle(); }}>
                                                <i class="fas fa-times"></i>
                                            </span>
                                        </div>                                    </div>
                                    <div className='modal-body'>
                                        <div>
                                            <label class="control-label">Holiday Date</label>
                                            <DatePicker className='form-control' selected={this.state.holidayDate}
                                                onChange={this._onChange}
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                                placeholderText="MM/DD/YYYY" />
                                        </div>
                                        <div>
                                            <label class="control-label">Name</label>
                                            <input type='text' id="txtName" class="form-control" />
                                        </div>
                                        <div>
                                            <label class="control-label">Remarks</label>
                                            <textarea rows="5" id="txtRemark" class="form-control"></textarea>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-success" id="addHoliday">Add</button>
                                        <button type="button" id="btnCancelDialog" className="btn btn-default" onClick={() => { this.props.toggle(); }} >Cancel</button>
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
export default AddHolidayModal