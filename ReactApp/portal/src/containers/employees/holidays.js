import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css';
import '../../css/bootstrap.css';
import moment from 'moment';
import { connect } from 'react-redux';



class Holiday extends React.Component {
    constructor() {
        super();
        this.state = {
            item: []
        }
    }
    dateFormat = (date) => {
        var fullDate = moment().format('dddd') + ", " + moment(date).format('ll');
        return fullDate;
    }
    getHoliday = (holidayData) => {
        const holidayArr = [];
        if (holidayData.holidays != null) {
            for (var i = 0; i < holidayData.holidays.length; i++) {
                var datacollection = {
                    holidayDate: this.dateFormat(holidayData.holidays[i].HolidayDate),
                    name: holidayData.holidays[i].Name,
                    remarks: holidayData.holidays[i].Remarks
                }
                holidayArr.push(datacollection);
            }
        }
        return holidayArr;
    }
    render() {
        const holiday = this.getHoliday(this.props.employeeData)
        const userRole = this.props.dashboardData.userRole
        const headerStyle = {
            backgroundColor: '#1abc9c',
            color: 'white',
            fontSize: 'small',
        }
        const columns = [
            {
                Header: "Holiday Date",
                accessor: "holidayDate",
                headerStyle: headerStyle,
                width: 200
            },
            {
                Header: "Name",
                accessor: "name",
                headerStyle: headerStyle,
                width: 200
            },
            {
                Header: "Remarks",
                accessor: "remarks",
                headerStyle: headerStyle,
            }
        ]
        return (
            <>
                <div className="col-md-12" style={{ marginTop: "9px", marginBottom: "10px" }} >
                    {userRole != "Admin" && <div className="col-md-4" style={{ color: "#2e508f", paddingTop: "8px", marginLeft: "-13px" }} ><h3>Holidays</h3></div>}
                    {userRole == "Admin" && <div className="col-md-4 pull-left" style={{ color: "#2e508f", paddingTop: "8px", marginLeft: "-13px" }} ><h3>Holidays</h3></div>}
                    {userRole == "Admin" && <div id="container" className="row ei-page-title">
                        <div className="col-md-12">
                            <div className="pull-right">
                                <div className="btn-toolbar" role="toolbar" aria-label="...">
                                    <div className="btn-group hidden-sm hidden-xs" role="group" aria-label="...">
                                        <div className="btn-group" role="group" aria-label="...">
                                            <button id="btnHolidayDetailEdit" className="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Edit Holiday Detail">
                                                <i className="fa fa-edit"></i>
                                            </button>
                                        </div>
                                        <div className="btn-group" role="group" aria-label="...">
                                            <button id="btnHolidayDetailAdd" className="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Add Holiday Detail">
                                                <i className="fa fa-plus"></i>
                                            </button>
                                        </div>
                                        <div className="btn-group" role="group" aria-label="...">
                                            <button id="btnHolidayDetailDelete" className="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Delete Holiday Detail">
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </div>
                                        <div className="btn-group" role="group" aria-label="...">
                                            <button id="btnHolidayDetailRefresh" className="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Refresh Data">
                                                <i className="fa fa-refresh"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
                </div>
                <div className="container-fluid" style={{ padding: '20px 10px 30px' }}>
                    <ReactTable className="-highlight -striped"
                        columns={columns}
                        data={holiday}
                        showPagination={false}
                        pageSize={holiday.length}
                        sortable={false}
                    // getTrProps={(state, rowInfo, column, instance) => {
                    //     // console.log("rowinfo", rowInfo)


                    // }}

                    />
                </div>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        employeeData: state.employeeData,
        dashboardData: state.dashboardData
    }
}
export default connect(mapStateToProps)(Holiday);
