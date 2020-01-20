import React from 'react'


class Header extends React.Component {

    refreshData = () => {
        var employeeStatus = document.getElementById('statusLeaveReport').value;
        this.props.onPress(employeeStatus)
    }

    render() {
        return (
            <>
                <div className='row mgB5'>
                    <div className="col-md-6">
                        <div className="pull-left" ><div className="page-title">Leave Report</div></div>
                    </div>
                    {this.props.user == 'Admin' && <div id="container" className="col-md-6"  >
                        <div className="float-right">
                            <div className="pull-right">
                                <div className="btn-toolbar" role="toolbar" aria-label="...">
                                    <div className="btn-group" role="group" aria-label="...">
                                        <select className='form-control' onChange={this.refreshData} id='statusLeaveReport' ><option value='Active'>Active</option><option value='All'>All</option> </select>
                                        <span> &nbsp; </span> <button id="btnRefresh" onClick={this.refreshData} className="btn btn-default  ir-btn-neutral-outline" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Refresh Data">&nbsp;<i className="fas fa-sync-alt"></i> Refresh &nbsp;</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
                </div>
            </>
        )
    }
}
export default Header