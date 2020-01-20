import React from 'react'

class Header extends React.Component {
    refreshData = () => {
        this.props.onPress();
    }

    render() {
        return (
            <>
                <div className='row'>
                    <div className="col-md-6">
                        <div className="pull-left" ><h3> Map Employee</h3></div>
                        <div className="pull-left" ><input type='text' placeholder='Search...' /></div>
                    </div>
                    <div id="container" className="col-md-6"  >
                        <div className="float-right">
                            <div className="pull-right">
                                <div className="btn-group" role="group" aria-label="...">
                                    <a id="btnRefresh" onClick={this.refreshData} className="btn btn-default ir-btn ir-btn-neutral-outline wd35 fas fa-sync-alt" data-toggle="tooltip" data-placement="bottom" title="Refresh Employee"></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default Header