import React, { PureComponent } from 'react';
import moment from 'moment';

class IncompleteAttendance extends PureComponent {

    renderTableHeader() {
        return (
            <thead>
                <tr className="upcase">
                    <th className="wd-34pc">{'Date'}</th>
                    <th className="wd-33pc">{'In Time'}</th>
                    <th className="wd-33pc">{'Out Time'}</th>
                </tr>
            </thead>
        )
    }

    renderTableBody(items) {
        if (!items) return <tr></tr>;
        return (
            items.map((item, index) => {
                const dateTime = item.DateTime ? moment(item.DateTime).format('LL') : '';
                const inTime = item.InTime ? moment(item.InTime).format('LT') : '';
                const outTime = item.OutTime ? moment(item.OutTime).format('LT') : '';

                return (
                    <tr key={index} className='ir-attendance-warning'>
                        <td style={{paddingLeft: '7px'}}>{dateTime}</td>
                        <td style={{paddingLeft: '7px'}}>{inTime}</td>
                        <td style={{paddingLeft: '7px'}}>{outTime}</td>
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
                            this.renderTableBody(this.props.incompleteAttendance)
                        }
                    </tbody>
                </table>
            </>
        )
    }
}

export default IncompleteAttendance;