import React from 'react'


class ProjectHeader extends React.Component {
    render() {
        return (
            <>
                <div className='row'>
                    <div className="col-md-6">
                        <div className="pull-left" >
                            <div className="btn-toolbar" role="toolbar" aria-label="...">
                                <div className="btn-group hidden-sm hidden-xs" role="group" aria-label="...">
                                    <div className="btn-group" role="group" aria-label="...">
                                        <div className="btn-group" role="group" aria-label="...">
                                            <button id="btnprojectRefresh" className="btn btn-default ir-btn ir-btn-neutral-outline wd35" data-toggle="tooltip" onClick={this.refreshData} data-placement="bottom" title="Refresh Data">
                                                <i className="fas fa-sync-alt"></i>
                                            </button>
                                        </div>
                                        <span>&nbsp;</span>
                                        <div className="btn-group" role="group" aria-label="...">
                                            <select>
                                                <option value=''>Select All</option>
                                            </select>
                                        </div>
                                        <span>&nbsp;</span>
                                        <div className="btn-group" role="group" aria-label="...">
                                            <select>
                                                <option value=''>Active</option>
                                            </select>
                                        </div>
                                        <span>&nbsp;</span>
                                        <button id="btnprojectEdit" className="btn btn-default ir-btn ir-btn-neutral-outline wd35"  data-toggle="tooltip" data-placement="bottom" title="Edit Project Detail">
                                                <i className="fa fa-edit"></i>
                                            </button>
                                    </div>
                                    <div className="btn-group" role="group" aria-label="...">
                                        <button id="btnprojectAdd"  className="btn btn-default ir-btn ir-btn-neutral-outline wd35" data-toggle="tooltip" data-placement="bottom" title="Add Project Detail">
                                            <i className="fa fa-plus"></i>
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
export default ProjectHeader