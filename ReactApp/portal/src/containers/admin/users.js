import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css';
import '../../css/bootstrap.css';
import Loader from '../../components/common/loader'
import { UserModal } from '../../common/addModal'
import { getAdminUser, editUser, resetPassword, userRoles, deleteUser } from '../../actions/adminAction'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

class User extends React.Component {
    constructor() {
        super();
        this.state = {
            item: [],
            user: [],
            isOpen: false,
            modalType: ''
        }
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
    getUser = (userData) => {
        var userArr = [];
        if (userData.adminUsers.length != 0) {
            for (let i = 0; i < userData.adminUsers.length; i++) {
                var datacollection = {
                    User: userData.adminUsers[i].UserName,
                    FirstName: userData.adminUsers[i].FirstName,
                    LastName: userData.adminUsers[i].LastName,
                    Email: userData.adminUsers[i].Email,
                    Phone: userData.adminUsers[i].PhoneNumber,
                    Status: userData.adminUsers[i].Status,
                    Action: <span>
                        <a className="btn btn-default btn-xs fa fa-edit" onClick={() => this.detailClick('Edit', userData.adminUsers[i].UserName)} title="Edit User Details" style={{ cursor: "pointer" }} href="#"></a>
                        <a className="btn btn-default btn-xs fa fa-retweet" onClick={() => this.detailClick('ResetPassword', userData.adminUsers[i].UserName)} title="Reset Login Password" style={{ cursor: "pointer" }} href="#"></a>
                        <a className="btn btn-default btn-xs fa fa-users" onClick={() => this.detailClick('UserRoles', userData.adminUsers[i].UserName)} title="Manage Roles" style={{ cursor: "pointer" }} href="#"></a>
                        <a className="btn btn-default btn-xs fa fa-trash-o" onClick={() => this.detailClick('Delete', userData.adminUsers[i].UserName)} title="Delete User" style={{ cursor: "pointer" }} href="#"></a>
                    </span>
                }
                userArr.push(datacollection)
            }
        }
        if (userData.adminUsers.length == 0) {
            userArr.push({
                User: <span>No Records Found</span>
            })
        }
        return userArr;
    }
    refreshData = () => {
        this.props.getAdminUser()
    }
    addUser = () => {
        this.setState({
            modalType: 'add',
            user: []
        })
        this.toggle();
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
            headerStyle: headerStyle,
            width: 300
        },
        {
            Header: "First Name",
            accessor: "FirstName",
            headerStyle: headerStyle,
            width: 200
        },
        {
            Header: "Last Name",
            accessor: "LastName",
            headerStyle: headerStyle,
            width: 200
        },
        {
            Header: "Email",
            accessor: "Email",
            headerStyle: headerStyle,
            width: 400
        },
        {
            Header: "Phone",
            accessor: "Phone",
            headerStyle: headerStyle,
            width: 200
        },
        {
            Header: "Status",
            accessor: "Status",
            headerStyle: headerStyle,
            width: 100
        },
        {
            Header: "Action",
            accessor: "Action",
            headerStyle: headerStyle,
        }
        ]
        return (
            <>

                <div className="col-sm-12" style={{ marginTop: "9px", marginBottom: "10px" }} >
                <div className="pull-left" style={{ color: "#2e508f" }} ><h3>Users</h3></div>
                    <div id="container" className="pull-right">
                        <div className="btn-toolbar" role="toolbar" aria-label="...">
                            <div className="btn-group" role="group" aria-label="...">
                                <a id="addUser" onClick={this.addUser} className="btn btn-default fa fa-plus fa-adjust" data-toggle="tooltip" data-placement="bottom" title="Create New User"></a>
                            </div>
                            <div className="btn-group" role="group" aria-label="...">
                                <a id="btnRefresh" onClick={this.refreshData} className="btn btn-default fa fa-refresh" data-toggle="tooltip" data-placement="bottom" title="Refresh Users"></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid" style={{ padding: '60px 10px 30px'}}>
                    <Loader isLoading={this.props.adminData.isLoading} />
                    <ReactTable className="-highlight -striped"
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
                {this.state.isOpen == true && <UserModal isOpen={this.state.isOpen} toggle={this.toggle} modalType={this.state.modalType} user={this.state.user} refreshData={this.refreshData} />}
            </>
        )
    }
}
const dispactchstatetoprops = (dispatch) => {
    return bindActionCreators({ getAdminUser }, dispatch)
}
export default connect(null, dispactchstatetoprops)(User)