import React from 'react'
import ReactTable from 'react-table'
// import 'react-table/react-table.css';
import moment from 'moment';



class Holidays extends React.Component { 
    constructor() {
        super();
        this.state = {
            item: [],
            holidayDate: ''
        }
    }

    dateFormat = (date) => {
        var fullDate = moment().format('dddd') + ", " + moment(date).format('ll');
        return fullDate;
    }

    getHoliday = (holidayData) => {
        const holidayArr = [];
        if (holidayData.holidays.length != 0) {

            for (var i = 0; i < holidayData.holidays.length; i++) {
                var dataCollection = {
                    holidayDate: this.dateFormat(holidayData.holidays[i].HolidayDate),
                    name: holidayData.holidays[i].Name,
                    remarks: holidayData.holidays[i].Remarks
                }
                holidayArr.push(dataCollection);
            }
        }
        if (holidayData.holidays.length == 0) {

            holidayArr.push({
                holidayDate: "No Row Found"
            })
        }
        return holidayArr;
    }

    selectHolidayRow = (selectedDate) => {
        this.setState({ holidayDate: selectedDate })
        this.props.rowSelectionDate(selectedDate)
    }

    render() {
        const holiday = this.getHoliday(this.props.employeeData)
        const headerStyle = {
            backgroundColor: '#1abc9c',
            color: 'white',
            fontSize: 'small',
        }
        const columns = [
            {
                Header: "Holiday Date",
                accessor: "holidayDate",
                // headerStyle: headerStyle,
                className: "header-class",
                width: 200
            },
            {
                Header: "Name",
                accessor: "name",
                className: "header-class",
                // headerStyle: headerStyle,
                width: 200
            },
            {
                Header: "Remarks",
                accessor: "remarks",
                className: "header-class",
                // headerStyle: headerStyle,
            }
        ]
        return (
            <>
                <div className="row">
                    <div className="container-fluid">
                        <ReactTable className="-highlight IRTable"
                            columns={columns}
                            data={holiday}
                            showPagination={false}
                            pageSize={holiday.length}
                            getTrProps={(state, rowInfo, column, instance) => {
                                return {
                                    onClick: () => {
                                        this.selectHolidayRow(rowInfo.original.holidayDate)
                                    },
                                    style: {
                                        backgroundColor: this.props.holidayDate == '' ? '' : (this.state.holidayDate == rowInfo.original.holidayDate) ? '#ffefbb' : ''
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
            </>
        )
    }
}
export default Holidays