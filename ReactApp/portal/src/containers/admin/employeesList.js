import React from 'react'
import moment from 'moment';



class EmployeesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: []
        }
    }
    onEmployeeRowSelect = (employeeId) => {
        this.props.editEmployeeDetails(employeeId)
    }
    render() {
        const employees = this.props.employeeData;
        const _this = this;
        return (
            <>
                <div style={{ overflowY: 'scroll', display: 'block', maxHeight: '800px' }}>
                    {
                        employees.map(function (item, index) {
                            return < ul key={index} className="list-group" id="tblBodyEmployees" >
                                <li className="list-group-item" id={`${item.EmployeeId}`} onClick={() => _this.onEmployeeRowSelect(item.EmployeeId)} style={{ cursor: 'pointer' }}>
                                    <div title={"Employee:" + item.FirstName} style={{ width: '20%', verticalAlign: 'top', paddingTop: '3px', display: 'inline-block', marginRight: '15px' }}>
                                        <img className="circularImage" style={{ height: '60px' }} src='/Content/Images/photos/Default.png' />
                                    </div>
                                    <div style={{ width: '71%', verticalAlign: 'top', paddingTop: '4px', display: 'inline-block' }}>
                                        <div style={{ width: '100%', position: 'relative' }}>
                                            <div className="label label-primary" style={{ fontSize: '13px' }} title={"Employee Name:" + item.FullName}>{item.FullName}</div>
                                            <p className="text-muted" style={{ paddingTop: '5px' }}><i className="fa fa-graduation-cap"></i> <small>softwar Developer</small></p>
                                            {item.Gender == 'M' &&
                                                <p className="text-muted">
                                                    <i className="fa fa-male"></i>&nbsp;<small>Male</small>
                                                    {item.DateOfBirthDocumentorOriginal != '' && <i className="fa fa-birthday-cake"><small> {moment(new Date(item.DateOfBirth)).format('DD-MM-YYYY')}</small></i>}
                                                </p>
                                            }
                                            {item.Gender == 'F' &&
                                                <p className="text-muted">
                                                    <i className="fa fa-female"></i>&nbsp;<small>Female</small>
                                                    {item.DateOfBirthDocumentorOriginal != '' && <i className="fa fa-birthday-cake"><small> {moment(new Date(item.DateOfBirth)).format('DD-MM-YYYY')}</small></i>}
                                                </p>
                                            }
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        })
                    }
                </div>
            </>
        )
    };
}
export default EmployeesList