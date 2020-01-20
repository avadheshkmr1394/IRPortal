import React from 'react'
import AddUserModal from '../../../components/modals/addUserModal'

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
            modalType: '',
            user: [],
        }
    }

    addUser = () => {
        this.setState({
            modalType: 'add',
            user: []
        })
        this.toggle();
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    refreshData = () => {
        this.props.onPress();
    }

    render() {
        return (
            <>
                <div className='row'>
                    <div className="col-md-6">
                        <div className="pull-left" ><h3>Users</h3></div>
                    </div>
                    <div id="container" className="col-md-6"  >
                        <div className="float-right">
                            <div className="pull-right">
                                <div className="btn-toolbar" role="toolbar" aria-label="...">
                                    <div className="btn-group" role="group" aria-label="...">
                                        <a id="addUser" onClick={this.addUser} className="btn btn-default fa fa-plus fa-adjust ir-btn ir-btn-neutral-outline wd35" data-toggle="tooltip" data-placement="bottom" title="Create New User"></a>
                                        <a id="btnRefresh" onClick={this.refreshData} className="btn btn-default ir-btn ir-btn-neutral-outline wd35 fas fa-sync-alt" data-toggle="tooltip" data-placement="bottom" title="Refresh Users"></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isOpen == true && <AddUserModal isOpen={this.state.isOpen} toggle={this.toggle} modalType={this.state.modalType} user={this.state.user} refreshData={this.refreshData} />}
            </>
        );
    }
}
export default Header
