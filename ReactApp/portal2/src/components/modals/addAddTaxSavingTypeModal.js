import React from 'react'
import Modal from 'react-modal';
import { insertTaxSavingReceiptType, updateTaxSavingReceiptType } from '../../actions/employeeActions'

export class AddAddTaxSavingTypeModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.taxSavingTypeItem.length == 0 ? '0' : '1',
            taxSavingType: this.props.taxSavingTypeItem.length == 0 ? 0 : this.props.taxSavingTypeItem[0].TaxSavingType,
            taxSavingTypeName: this.props.taxSavingTypeItem.length == 0 ? '' : this.props.taxSavingTypeItem[0].TaxSavingTypeName,
            taxCategoryCode: this.props.taxSavingTypeItem.length == 0 ? '' : this.props.taxSavingTypeItem[0].TaxCategoryCode == null ? '' : this.props.taxSavingTypeItem[0].TaxCategoryCode,
        }
        this.toggleModal = this.toggleModal.bind(this)
    }

    toggleModal() {
        this.props.toggle();
    }
    handleSubmit = async (event) => {
        event.preventDefault()
        // if (this.handleValidation()) {
        if (this.state.id == '0') {
            await insertTaxSavingReceiptType({ jsonData: JSON.stringify(this.state) });
        }
        else if (this.state.id == '1') {
            await updateTaxSavingReceiptType({ jsonData: JSON.stringify(this.state) });
        }
        this.props.refreshData();
        this.toggleModal()
        // }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    render() {
        return (
            <>
                <Modal isOpen={this.props.isOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.toggleModal} ariaHideApp={false} className='modal-style' contentLabel="">
                    <div id='addTaxSavingTypeModal' className={'v-modal-transparet-header'}>
                        <div className={'modal fade-in'} style={{ display: 'block' }}>
                            <div className={'modal-dialog modal-wd95pc-mwd-618'} style={{ margin: '8.75rem 48.75rem' }}>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="modal-content delete-modal">
                                        <div className="modal-header">
                                            <h4 style={{ marginRight: "auto" }} ><i className='fa fa-plus'></i> Add Tax Saving </h4>
                                            <div className='inline-block right pdT9'><span id='spnCancel' className='cursor-pointer v-bold' onClick={this.toggleModal}>X</span></div>
                                        </div>
                                        <div className="modal-body delete-modal" >
                                            <div className="form-horizontal">
                                                <div className="row">
                                                    <label className="col-md-4">Type Name</label>
                                                    <div className="col-md-7">
                                                        <input type="text" className="form-control" onChange={this.handleChange} name="taxSavingTypeName" value={this.state.taxSavingTypeName} />
                                                    </div>
                                                </div>
                                                <br />
                                                <div className="row">
                                                    <label className="col-md-4">Category Code</label>
                                                    <div className="col-md-7">
                                                        <input type="text" className="form-control" onChange={this.handleChange} name="taxCategoryCode" value={this.state.taxCategoryCode} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="submit" className="btn btn-success" id="btnTaxSavingType">Add</button><button type="button" id="btnCancelDialog" className="btn btn-default" onClick={this.toggleModal} >Cancel</button>
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
export default AddAddTaxSavingTypeModal