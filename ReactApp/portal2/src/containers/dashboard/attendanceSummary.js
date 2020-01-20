import React, { PureComponent } from 'react';

class AttendanceSummary extends PureComponent {
   

    renderTableHeader() { 

        return (
            <thead>
                <tr className="upcase">
                    <th>{'Name'}</th>
                    <th>{'Attendance'}</th>
                    <th>{'In Time'}</th>
                    <th>{'Out Time'}</th>
                    <th>{'Total Time'}</th>
                </tr>
            </thead>
        )
    }

    renderTableBody(items) {
      if (!items) return <tr></tr>;
        return (
           
            items.map((item, index) => {
                const EmployeeName = item.EmployeeName;
                const Attendance = item.Attendance;
                const inTime = item.InTime; 
                const outTime = item.OutTime;
                const TotalTime = item.TotalTime;

                return (
                    <tr key={index} className='ir-attendance-warning' style={{backgroundColor:item.ColorCode}}>
                        <td style={{paddingLeft: '7px'}} >{EmployeeName}</td>
                        <td style={{paddingLeft: '7px'}} >{Attendance}</td>
                        <td style={{paddingLeft: '7px'}} >{inTime}</td>
                        <td style={{paddingLeft: '7px'}} >{outTime}</td>
                        <td style={{paddingLeft: '7px'}} >{TotalTime}</td>
                    </tr>
                )
            })
        );
    }

    render() {
        return (
            <>
                <table className="v-table" >
                    {this.renderTableHeader()}
                    <tbody>
                        {
                            this.renderTableBody(this.props.employeeAttedanceSummary)
                        }
                    </tbody>
                </table>
            </>
        )
    }
}

export default AttendanceSummary;
