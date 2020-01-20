import React from 'react'
import Modal from 'react-modal';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/react-datepicker.css';
import { updateUser, registerUser, deleteUserConfirmed, passwordConfirmed, userRolesConfirmed } from '../../actions/adminAction'


class AddUserModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UserName: this.props.user.length == 0 ? '' : this.props.user[0].UserName,
            FirstName: this.props.user.length == 0 ? '' : this.props.user[0].FirstName,
            LastName: this.props.user.length == 0 ? '' : this.props.user[0].LastName,
            Email: this.props.user.length == 0 ? '' : this.props.user[0].Email,
            PhoneNumber: this.props.user.length == 0 ? '' : this.props.user[0].PhoneNumber,
            Status: this.props.user.length == 0 ? '0' : this.props.user[0].Status,
            Password: '',
            Confirmpassword: '',
            NewPassword: '',

        }
    }
    cancelModal = () => {
        this.props.toggle();
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        if (this.state.Password == '') {
            await updateUser(this.state)
        }
        else {
            await registerUser(this.state);
        }
        this.props.refreshData()
        this.cancelModal()
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    deleteUser = async (username) => {
        await deleteUserConfirmed({ UserName: username })
        this.props.refreshData()
        this.cancelModal()
    }

    resetPassword = (event) => {
        event.preventDefault();
        if (this.state.UserName != '' && this.state.NewPassword != '') {
            passwordConfirmed(this.state);
            this.props.refreshData()
            this.cancelModal()
        }
    }

    manageUserRole = () => {
        var role = [];
        const checkboxes = document.getElementsByName('RoleName')
        for (var i = 0, n = checkboxes.length; i < n; i++) {
            let collection = '';
            if (checkboxes[i].checked == true) {
                collection = {
                    RoleName: checkboxes[i].value,
                    Selected: checkboxes[i].checked
                }
            }
            else {
                collection = {
                    RoleName: checkboxes[i].value,
                    Selected: checkboxes[i].checked
                }
            }
            role.push(collection)
        }
        userRolesConfirmed({ Roles: role, UserName: this.state.UserName })
        this.props.refreshData()
        this.cancelModal()
    }
    toggleModal() {
        this.props.toggle();
    }
    render() {

        return (
            <>
                <Modal isOpen={this.props.isOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.toggleModal} ariaHideApp={false} className='modal-style' contentLabel="">
                    {(this.props.modalType == 'edit' || this.props.modalType == 'add') &&
                        <div id='addUserModal' className={'v-modal-transparet-header'}>
                            <div className={'modal fade-in'} style={{ display: 'block' }}>
                                <div className={'modal-dialog modal-wd95pc-mwd-618'} style={{ margin: '8.75rem 48.75rem' }}>
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                {this.props.modalType == 'edit' && <h4 style={{ marginRight: "auto" }} ><i className='fa fa-edit'></i> Edit User Details  </h4>}
                                                {this.props.modalType == 'add' && <h4 style={{ marginRight: "auto" }} ><i className='fa fa-edit'></i> Register New User  </h4>}
                                                <div className='inline-block right pdT9'><span id='spnCancel' className='cursor-pointer v-bold' onClick={this.cancelModal}>X</span></div>
                                            </div>
                                            <div className="modal-body">
                                                <div className="form-horizontal">
                                                    <div className="row">
                                                        <label className="col-md-3">User Name</label>
                                                        <div className="col-md-7">
                                                            {this.props.modalType == 'edit' && <input type="text" className="form-control" disabled name="UserName" value={this.state.UserName} />}
                                                            {this.props.modalType == 'add' && <input type="text" className="form-control" onChange={this.handleChange} name="UserName" value={this.state.UserName} />}
                                                        </div>
                                                    </div>
                                                    <br />
                                                    {this.props.modalType == 'add' && <div className="row">
                                                        <label className="col-md-3">Password</label>
                                                        <div className="col-md-7">
                                                            <input type="text" className="form-control" onChange={this.handleChange} name="Password" value={this.state.Password} />
                                                        </div>
                                                    </div>}
                                                    {this.props.modalType == 'add' && <br />}
                                                    {this.props.modalType == 'add' && <div className="row">
                                                        <label className="col-md-3">Confirmpassword</label>
                                                        <div className="col-md-7">
                                                            <input type="text" className="form-control" onChange={this.handleChange} name="Confirmpassword" value={this.state.Confirmpassword} />
                                                        </div>
                                                    </div>}
                                                    {this.props.modalType == 'add' && <br />}
                                                    <div className="row">
                                                        <label className="col-md-3">First Name</label>
                                                        <div className="col-md-7">
                                                            <input type="text" className="form-control" onChange={this.handleChange} name="FirstName" value={this.state.FirstName} />
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <div className="row">
                                                        <label className="col-md-3">Last Name</label>
                                                        <div className="col-md-7">
                                                            <input type="text" className="form-control" onChange={this.handleChange} name="LastName" value={this.state.LastName} />
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <div className="row">
                                                        <label className="col-md-3">Email</label>
                                                        <div className="col-md-7">
                                                            <input type="text" className="form-control" onChange={this.handleChange} name="Email" value={this.state.Email} />
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <div className="row">
                                                        <label className="col-md-3">Telephone</label>
                                                        <div className="col-md-7">
                                                            <input type="text" className="form-control" onChange={this.handleChange} name="PhoneNumber" value={this.state.PhoneNumber} />
                                                        </div>
                                                    </div>
                                                    <br />
                                                    {this.props.modalType == 'edit' && <div className="row">
                                                        <label className="col-md-3">Status</label>
                                                        <div className="col-md-7">
                                                            <select className="form-control" name="Status" onChange={this.handleChange} value={this.state.Status} >
                                                                <option value="1">Inactive</option>
                                                                <option value="0">Active</option>
                                                            </select>
                                                        </div>
                                                    </div>}
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                {this.props.modalType == 'edit' && <button id="btnSave" className="btn btn-success" data-placement="top" title="Save">Save</button>}
                                                {this.props.modalType == 'add' && <button id="btnSave" className="btn btn-success" data-placement="top" title="Save">Register</button>}
                                                <button id="btnWorklogCancel" className="btn btn-default" data-toggle="tooltip" data-placement="top" title="Cancel" onClick={this.cancelModal} data-dismiss="modal">Cancel</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    }
                    {this.props.modalType == "delete" &&
                        <div id='addDeletUserModal' className={'v-modal-transparet-header'}>
                            <div className={'modal fade-in'} style={{ display: 'block' }}>
                                <div className={'modal-dialog modal-wd95pc-mwd-618'} style={{ margin: '8.75rem 48.75rem' }}>
                                    <div className="modal-content delete-modal">
                                        <div className="modal-header">
                                            <h4 style={{ marginRight: "auto" }} ><i className='fa fa-trash'></i> Delete User</h4>
                                            <div className='inline-block right pdT9'><span id='spnCancel' className='cursor-pointer v-bold' onClick={this.cancelModal}>X</span></div>
                                        </div>
                                        <div className="modal-body delete-modal" >
                                            <span><h4>Are you sure you want to delete this record?</h4></span>
                                            <table style={{ margin: 'auto' }}>
                                                <tbody >
                                                    <tr>
                                                        <th>User Name</th>
                                                        <td>&nbsp; : &nbsp;</td>
                                                        <td>{this.state.UserName}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>First Name</th>
                                                        <td>&nbsp; : &nbsp;</td>
                                                        <td>{this.state.FirstName}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Last Name</th>
                                                        <td>&nbsp; : &nbsp;</td>
                                                        <td>{this.state.LastName}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Email</th>
                                                        <td>&nbsp; : &nbsp;</td>
                                                        <td>{this.state.Email}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Telephone</th>
                                                        <td>&nbsp; : &nbsp;</td>
                                                        <td>{this.state.PhoneNumber}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-success" onClick={() => this.deleteUser(this.state.UserName)} id="deleteConfirm">Delete</button><button type="button" id="btnCancelDialog" className="btn btn-default" onClick={this.cancelModal} >Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    {this.props.modalType == "resetpassword" &&
                        <div id='addReserPasswordModal' className={'v-modal-transparet-header'}>
                            <div className={'modal fade-in'} style={{ display: 'block' }}>
                                <div className={'modal-dialog modal-wd95pc-mwd-618'} style={{ margin: '8.75rem 48.75rem' }}>
                                    <form onSubmit={this.resetPassword}>
                                        <div className="modal-content delete-modal">
                                            <div className="modal-header">
                                                <h4 style={{ marginRight: "auto" }} >Reset Password for user {this.state.UserName} </h4>
                                                <div className='inline-block right pdT9'><span id='spnCancel' className='cursor-pointer v-bold' onClick={this.cancelModal}>X</span></div>
                                            </div>
                                            <div className="modal-body delete-modal" >
                                                <div className="form-horizontal">
                                                    <div className="row">
                                                        <label className="col-md-4">New Password</label>
                                                        <div className="col-md-7">
                                                            <input type="text" className="form-control" onChange={this.handleChange} name="NewPassword" value={this.state.NewPassword} />
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <div className="row">
                                                        <label className="col-md-4">Confirm Password</label>
                                                        <div className="col-md-7">
                                                            <input type="text" className="form-control" onChange={this.handleChange} name="Confirmpassword" value={this.state.Confirmpassword} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="submit" className="btn btn-success" id="Passwordconfirmed">Set password</button><button type="button" id="btnCancelDialog" className="btn btn-default" onClick={this.cancelModal} >Cancel</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    }
                    {this.props.modalType == "managerole" &&
                        <div id='addUserRoleModal' className={'v-modal-transparet-header'}>
                            <div className={'modal fade-in'} style={{ display: 'block' }}>
                                <div className={'modal-dialog modal-wd95pc-mwd-618'} style={{ margin: '8.75rem 48.75rem' }}>
                                    <div className="modal-content delete-modal">
                                        <div className="modal-header">
                                            <h4 style={{ marginRight: "auto" }} > Roles for user {this.state.UserName}</h4>
                                            <div className='inline-block right pdT9'><span id='spnCancel' className='cursor-pointer v-bold' onClick={this.cancelModal}>X</span></div>
                                        </div>
                                        <div className="modal-body delete-modal" >
                                            <span><h4>Select Role Assignments</h4></span>
                                            <br />
                                            <table>
                                                <tbody>
                                                    <tr >
                                                        {
                                                            this.props.user[0].Roles.map(function (item, index) {
                                                                return <td key={index}>
                                                                    {(item.RoleName == "Admin" && item.Selected == true) && <input type="checkbox" id="checkadmin" checked name='RoleName' value='Admin' />}  {(item.RoleName == "Admin" && item.Selected == false) && <input type="checkbox" id="checkadmin" name='RoleName' value='Admin' />} {item.RoleName == "Admin" && "Admin"}
                                                                    {(item.RoleName == "Client" && item.Selected == true) && <input type="checkbox" id="checkclient" checked name='RoleName' value='Client' />} {(item.RoleName == "Client" && item.Selected == false) && <input type="checkbox" id="checkclient" name='RoleName' value='Client' />}{item.RoleName == "Client" && "Client"}
                                                                    {(item.RoleName == "IR User" && item.Selected == true) && <input type="checkbox" id="checkiruser" checked name='RoleName' value='IR User' />}{(item.RoleName == "IR User" && item.Selected == false) && <input type="checkbox" id="checkiruser" name='RoleName' value='IR User' />}{item.RoleName == "IR User" && "IR User"}
                                                                </td>
                                                            })
                                                        }
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-success" onClick={this.manageUserRole} id="roleConfirm">Save</button><button type="button" id="btnCancelDialog" className="btn btn-default" onClick={this.cancelModal} >Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                </Modal>
            </>
        )
    }
}

export default AddUserModal