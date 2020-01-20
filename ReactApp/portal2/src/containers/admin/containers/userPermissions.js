import React from 'react'
import UserPermissionsHeader from './userPermissionsHeader'
import ReactTable from 'react-table'
import 'react-table/react-table.css';


class UserPermissions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: []
        }
    }

    componentDidUpdate() {
        var status = localStorage.getItem('status')
        if (status == '1') {
            if (this.props.adminData.userContainerPermission.length != 0) {
                for (let i = 0; i < this.props.adminData.userContainerPermission.length; i++) {
                    if (this.props.adminData.userContainerPermission[i].Permission == true) {
                        document.getElementById(`${this.props.adminData.userContainerPermission[i].UserId}`).checked = true;
                    }
                    else {
                        document.getElementById(`${this.props.adminData.userContainerPermission[i].UserId}`).checked = false;
                    }
                }
            }
        }
    }

    getPermission = (item) => {
        var permissionArray = []
        if (item.userContainerPermission.length != 0) {
            for (let i = 0; i < item.userContainerPermission.length; i++) {
                const dataCollection = {
                    action: <span>{<input type="checkbox" name="rowSelectCheckBox" id={`${item.userContainerPermission[i].UserId}`} value={item.userContainerPermission[i].UserId} onClick={() => this.singleCheckUncheckCheckbox(item.userContainerPermission[i].UserId)} />}</span>,
                    permission: item.userContainerPermission[i].Permission,
                    name: item.userContainerPermission[i].Name,
                    userId: item.userContainerPermission[i].UserId
                }
                permissionArray.push(dataCollection)
            }
        }
        else {
            permissionArray.push({ userPermission: 'No Records Found' })
        }
        return permissionArray
    }

    checkUncheckCheckbox = () => {
        var arrayCollection = []
        var selectAllCheckbox = document.getElementById("checkUncheckAll");
        if (selectAllCheckbox.checked == true) {
            var checkboxes = document.getElementsByName("rowSelectCheckBox");
            for (var i = 0, n = checkboxes.length; i < n; i++) {
                if (i != 0) {
                    arrayCollection.push({ UserId: checkboxes[i].value })
                }
                checkboxes[i].checked = true;
            }
            localStorage.setItem('status', '0')
            this.setState({
                userId: arrayCollection,
            })

        } else if (selectAllCheckbox.checked == false) {
            var checkboxes = document.getElementsByName("rowSelectCheckBox");
            for (var i = 0, n = checkboxes.length; i < n; i++) {
                checkboxes[i].checked = false;
            }
            localStorage.setItem('status', '0')
            this.setState({
                userId: [],
            })
        }
    }

    singleCheckUncheckCheckbox = (userId) => {
        var arrayCollection = []
        var checkboxes = document.getElementsByName("rowSelectCheckBox");
        for (var i = 0, n = checkboxes.length; i < n; i++) {
            if (checkboxes[i].checked == true) {
                if (userId == checkboxes[i].value) {
                    checkboxes[i].checked = false;
                }
                else {
                    checkboxes[i].checked = true;
                    arrayCollection.push({ UserId: checkboxes[i].value })
                }
            }
            else if (checkboxes[i].checked == false) {
                if (userId == checkboxes[i].value) {
                    checkboxes[i].checked = true;
                    arrayCollection.push({ UserId: checkboxes[i].value })
                }
                else {
                    checkboxes[i].checked = false;
                }
            }
        }
        localStorage.setItem('status', '0')
        this.setState({
            userId: arrayCollection,
        })
    }

    checkPermission = (permission, userId) => {
        var result = false;
        if (this.state.userId != "" && localStorage.getItem('status') == '0') {
            this.state.userId.forEach(item => {
                if (item.UserId == userId) {
                    result = true;
                }
            })
        }
        else {
            if (permission == true && localStorage.getItem('status') == '1') {
                result = true
            }
        }
        return result;
    }

    render() {
        const permission = this.getPermission(this.props.adminData)
        const columns = [{
            Header: <span><input name="rowSelectCheckBox" id="checkUncheckAll" onClick={() => this.checkUncheckCheckbox()} type="checkbox" /></span>,
            accessor: 'action',
            className: "header-class",
            width: 40
        },
        {
            Header: 'User Permissions',
            accessor: 'name',
            className: "header-class"
        }
        ]
        return (
            <>
                <div className="col-md-6">
                    <div className="float-right">
                        <div className="pull-right">
                            <UserPermissionsHeader onPressUser={this.props.onPressUser} containerId={this.props.containerId} userId={this.state.userId} adminData={this.props.adminData} />
                        </div>
                    </div>
                    <br /><br />
                    <ReactTable className="-highlight IRTable"
                        columns={columns}
                        data={permission}
                        showPagination={false}
                        pageSize={permission.length}
                        getTrProps={(state, rowInfo, column, instance) => {
                            return {
                                onClick: () => {
                                    this.singleCheckUncheckCheckbox(rowInfo.original.userId)
                                },
                                style: {
                                    backgroundColor: this.checkPermission(rowInfo.original.permission, rowInfo.original.userId) == true ? '#d0e9c6' : this.checkPermission(rowInfo.original.permission, rowInfo.original.userId) == true ? '#d0e9c6' : ''
                                }
                            }
                        }}
                    />
                </div>
            </>
        )
    }
}
export default UserPermissions