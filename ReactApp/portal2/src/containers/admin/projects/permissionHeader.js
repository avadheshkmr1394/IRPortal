import React from 'react'


class PermissionHeader extends React.Component {
    render() {
        return (
            <>
                <div className='row'>
               
                    <div className="col-md-6">
                    {/* <div className="" ><h3>Permission</h3></div> */}
                        <div className="pull-left" >
                            <div className="btn-toolbar" role="toolbar" aria-label="...">
                                <div className="btn-group hidden-sm hidden-xs" role="group" aria-label="...">
                                    <div className="btn-group" role="group" aria-label="...">
                                        <button id="btn PermissionEdit" className="btn btn-default ir-btn ir-btn-neutral-outline wd35" data-toggle="tooltip" data-placement="bottom" title="Edit  Permission Detail">
                                            <i className="fa fa-edit"></i>
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
export default PermissionHeader

