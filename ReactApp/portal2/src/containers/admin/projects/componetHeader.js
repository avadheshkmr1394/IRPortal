import React from 'react'


class ComponetHeader extends React.Component {
    render() {
        return (
            <>
             <div className='row'>
             {/* <div className="pull-left" ><h3>Componet</h3></div> */}
                    <div className="col-md-6">
                        <div className="pull-left" >
                            <div className="btn-toolbar" role="toolbar" aria-label="...">
                                <div className="btn-group hidden-sm hidden-xs" role="group" aria-label="...">
                                    <div className="btn-group" role="group" aria-label="...">
                                    <button id="btnComponetEdit" className="btn btn-default ir-btn ir-btn-neutral-outline wd35"  data-toggle="tooltip" data-placement="bottom" title="Edit Componet Detail">
                                                <i className="fa fa-edit"></i>
                                            </button>
                                    </div>
                                    <div className="btn-group" role="group" aria-label="...">
                                        <button id="btnComponetAdd" onClick={() => this.toggle(this.setState({ modalType: 'addModal',componetItem: '' }))} className="btn btn-default ir-btn ir-btn-neutral-outline wd35" data-toggle="tooltip" data-placement="bottom" title="Add Componet Detail">
                                            <i className="fa fa-plus"></i>
                                        </button>
                                    </div>
                                    <div className="btn-group" role="group" aria-label="...">
                                        <button id="btnComponetDelete" onClick={() => this.toggle(this.setState({ modalType: 'deleteModal' }))} className="btn btn-default ir-btn ir-btn-neutral-outline wd35" data-toggle="tooltip" data-placement="bottom" title="Delete Componet Detail">
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default ComponetHeader
