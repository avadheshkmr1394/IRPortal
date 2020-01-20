import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css';
import { getAdminUser, editUser, resetPassword, userRoles, deleteUser } from '../../../actions/adminAction'
// import Loader from '../../../components/common/loader'
import AddUserModal from '../../../components/modals/addUserModal'

class User extends React.Component {
    constructor() {
        super();
        this.state = {
            user: [],
            isOpen: false,
            modalType: ''
        }
    }

    refreshData = () => {
        this.props.onPress();
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    detailClick = async (type, username) => {
        if (type == "Edit") {
            await editUser({ UserName: username }).then(res => {
                this.setState({
                    user: [res.data],
                    modalType: 'edit'
                })
            })
            this.toggle()
        }
        else if (type == "ResetPassword") {
            await resetPassword({ UserName: username }).then(res => {
                this.setState({
                    user: [res.data],
                    modalType: 'resetpassword'
                })
            })
            this.toggle()
        }
        else if (type == "UserRoles") {
            await userRoles({ UserName: username }).then(res => {
                this.setState({
                    user: [res.data],
                    modalType: 'managerole'
                })
            })
            this.toggle()
        }
        else if (type == "Delete") {
            await deleteUser({ UserName: username }).then(res => {
                this.setState({
                    user: [res.data],
                    modalType: 'delete'
                })
            })
            this.toggle()
        }
        else {

        }
    }
    userStatus = (status) => {
        if (status === 1) {
            status = <i className='fa fa-times' style={{ color: "#ff0000" }}></i>
        }
        else {
            status = <i className='fa fa-check' style={{ color: "#008000" }}></i>
        }
        return status
    }

    getUser = (userData) => {
        var userArr = [];
        if (userData.adminUsers.length != 0) {
            for (let i = 0; i < userData.adminUsers.length; i++) {
                var dataCollection = {
                    User: userData.adminUsers[i].UserName,
                    FirstName: userData.adminUsers[i].FirstName,
                    LastName: userData.adminUsers[i].LastName,
                    Email: userData.adminUsers[i].Email,
                    Phone: userData.adminUsers[i].PhoneNumber,
                    Status: this.userStatus(userData.adminUsers[i].Status),
                    Action: <span>
                        <a className="btn btn-default btn-xs fa fa-edit" onClick={() => this.detailClick('Edit', userData.adminUsers[i].UserName)} title="Edit User Details" style={{ cursor: "pointer" }} href="#"></a>
                        <a className="btn btn-default btn-xs fa fa-retweet" onClick={() => this.detailClick('ResetPassword', userData.adminUsers[i].UserName)} title="Reset Login Password" style={{ cursor: "pointer" }} href="#"></a>
                        <a className="btn btn-default btn-xs fa fa-users" onClick={() => this.detailClick('UserRoles', userData.adminUsers[i].UserName)} title="Manage Roles" style={{ cursor: "pointer" }} href="#"></a>
                        <a className="btn btn-default fa fa-trash" onClick={() => this.detailClick('Delete', userData.adminUsers[i].UserName)} title="Delete User" style={{ cursor: "pointer" }} href="#"></a>
                    </span>
                }
                userArr.push(dataCollection)
            }
        }
        return userArr;
    }

    render() {
        const userInfo = this.getUser(this.props.adminData)
        const headerStyle = {
            backgroundColor: '#1abc9c',
            color: 'white',
            fontSize: 'small',
        }
        const columns = [{
            Header: "User",
            accessor: "User",
            className: "header-class",
            // headerStyle: headerStyle,
            width: 300
        },
        {
            Header: "First Name",
            accessor: "FirstName",
            className: "header-class",
            // headerStyle: headerStyle,
            width: 200
        },
        {
            Header: "Last Name",
            accessor: "LastName",
            className: "header-class",
            // headerStyle: headerStyle,
            width: 200
        },
        {
            Header: "Email",
            accessor: "Email",
            className: "header-class",
            // headerStyle: headerStyle,
            width: 400
        },
        {
            Header: "Phone",
            accessor: "Phone",
            className: "header-class",
            // headerStyle: headerStyle,
            width: 200
        },
        {
            Header: "Status",
            accessor: "Status",
            className: "header-class",
            // headerStyle: headerStyle,
            width: 100
        },
        {
            Header: "Action",
            accessor: "Action",
            className: "header-class",
            // headerStyle: headerStyle,
        }
        ]
        return (
            <>
                <div className='row'>
                    <div className="container-fluid">
                        {/* <Loader isLoading={this.props.adminData.isLoading} /> */}
                        <ReactTable className="-highlight IRTable"
                            columns={columns}
                            data={userInfo}
                            showPagination={false}
                            pageSize={userInfo.length}
                            sortable={false}
                            getTrProps={(state, rowInfo, column, instance) => {
                                return {
                                    style: {
                                        backgroundColor: ""
                                    }
                                }

                            }}
                        />
                    </div>
                </div>
                {this.state.isOpen == true && <AddUserModal isOpen={this.state.isOpen} toggle={this.toggle} modalType={this.state.modalType} user={this.state.user} refreshData={this.refreshData} />}
            </>
        );
    }
}
export default User
