import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css';
import AddMapUserModal from '../../../components/modals/addMapUserModal'
import { getForMapUser } from '../../../actions/adminAction'


class MapEmployee extends React.Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
            user: [],
            employeeId: ''
        }
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    refreshData = () => {
        this.props.onPress();
    }

    detailClick = (id) => {
        getForMapUser().then(res => {
            this.setState({
                user: res.data,
                employeeId: id
            })
        })
        this.toggle()
    }

    getMapEmployee = (employeeData) => {
        var employeeArray = []
        if (employeeData.mapEmployeeRecords.length != 0) {
            for (let i = 0; i < employeeData.mapEmployeeRecords.length; i++) {
                const dataCollection = {
                    name: employeeData.mapEmployeeRecords[i].Name,
                    designation: employeeData.mapEmployeeRecords[i].Designation,
                    status: employeeData.mapEmployeeRecords[i].Status,
                    action: <span>{
                        employeeData.mapEmployeeRecords[i].MapStatus == false ?
                            <a className="btn btn-default btn-xs fa fa-edit" onClick={() => this.detailClick(employeeData.mapEmployeeRecords[i].EmployeeId)} data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Employee Map with User"></a> :
                            <a className="btn btn-default btn-xs fa fa-check" disabled data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Employee Map with User"></a>}</span>
                }
                employeeArray.push(dataCollection)
            }
        }
        return employeeArray
    }

    render() {
        const mapEmployee = this.getMapEmployee(this.props.adminData)
        const headerStyle = {
            backgroundColor: '#1abc9c',
            color: 'white',
            fontSize: 'small',
        }
        const columns = [
            {
                Header: "Employee Name",
                accessor: "name",
                // headerStyle: headerStyle,
                className: "header-class",
                width: 300
            },
            {
                Header: "Designation",
                accessor: "designation",
                className: "header-class",
                // headerStyle: headerStyle,
                width: 400
            },
            {
                Header: "Status",
                accessor: "status",
                className: "header-class",
                // headerStyle: headerStyle,
                width: 200
            },
            {
                Header: "Action",
                accessor: "action",
                className: "header-class",
                // headerStyle: headerStyle,
                width: 200
            }
        ]
        return (
            <>
                <div className="row" >
                    <div className="container-fluid">
                        <ReactTable className="-highlight IRTable"
                            columns={columns}
                            data={mapEmployee}
                            showPagination={false}
                            pageSize={mapEmployee.length}
                            getTrProps={(state, rowInfo, column, instance) => {
                                return {
                                    style: {
                                        backgroundColor: ''
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
                {this.state.isOpen == true && <AddMapUserModal isOpen={this.state.isOpen} toggle={this.toggle} modalType={this.state.modalType} refreshData={this.refreshData} user={this.state.user} employeeId={this.state.employeeId} />}
            </>

        )
    }
}
export default MapEmployee