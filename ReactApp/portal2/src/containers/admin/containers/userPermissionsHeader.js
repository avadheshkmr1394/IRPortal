import React from 'react'
import WarningModal from '../../../components/modals/warningModal'
import { savePermission } from '../../../actions/adminAction'



class UserPermissionHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
        }
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    refreshData = () => {
        this.props.onPressUser();
    }

    editPermission = (containerId) => {
        if (containerId == '') {
            this.toggle()
        }
        else {
            var userId = ''
            var userIdItem = ''
            var permissionUserId = []
            if (this.props.userId.length != 0 && localStorage.getItem('status') == 0) {
                userIdItem = this.props.userId
            }
            else {
                for (let i = 0; i < this.props.adminData.userContainerPermission.length; i++) {
                    if (this.props.adminData.userContainerPermission[i].Permission == true) {
                        permissionUserId.push({ UserId: this.props.adminData.userContainerPermission[i].UserId });
                    }
                }
                userIdItem = permissionUserId
            }
            if (userIdItem.length != 0) {
                for (var i = 0; i < userIdItem.length; i++) {
                    userId = userId + "," + userIdItem[i].UserId
                }
                userId = userId.substring(userId.length, +1)
            }
            savePermission({ containerId: containerId, userIds: userId })
        }
    }

    render() {
        return (
            <>
                <div className='row'>
                    <div className="col-md-6">
                        <div className="pull-left" >
                            <div className="btn-toolbar" id='userPermissionHeader' role="toolbar" aria-label="...">
                                <div className="btn-group hidden-sm hidden-xs" role="group" aria-label="...">
                                    <div className="btn-group" role="group" aria-label="...">
                                        <button id="btnContainerRefresh" className="btn btn-default ir-btn ir-btn-neutral-outline wd35" data-toggle="tooltip" onClick={this.refreshData} data-placement="bottom" title="Refresh Data">
                                            <i className="fas fa-sync-alt"></i>
                                        </button>
                                    </div>
                                    <div className="btn-group" role="group" aria-label="...">
                                        <button id="btnContainerSave" className="btn btn-default ir-btn ir-btn-neutral-outline wd35" data-toggle="tooltip" onClick={() => this.editPermission(this.props.containerId)} data-placement="bottom" title="Edit UserPermission Detail">
                                            <i className="fas fa-save"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {(this.state.isOpen == true && this.props.containerId == '') && <WarningModal isOpen={this.state.isOpen} toggle={this.toggle.bind(this)} warningText={'Please select a Container.'} />}
            </>
        )
    }
}
export default UserPermissionHeader