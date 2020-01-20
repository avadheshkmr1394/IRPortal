import React from 'react'
import PermissionHeader from './permissionHeader'
import ReactTable from 'react-table'
import 'react-table/react-table.css';


class Permission extends React.Component {

    getpermission = () => {
        var permissionArray = []
        if (permissionArray.length != 0) {
            const dataCollection = {
                users: 'permission Table'
            }
            permissionArray.push(dataCollection)
        }
        else {
            permissionArray.push({ users: 'No Records Found' })
        }
        return permissionArray
    }

    render() {
        const permission = this.getpermission()
        const columns = [{
            Header: 'Users',
            accessor: 'users',
            className: "header-class"
        }]
        return (
            <>
                <div className="col-md-3">
                    <div className='float-right'>
                        <div className="pull-right">
                            <PermissionHeader />
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
                                style: {
                                    backgroundColor: ''
                                }
                            }
                        }}
                    />
                </div>
            </>
        )
    }
}
export default Permission

