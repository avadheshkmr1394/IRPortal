import React from 'react'
import moment from 'moment';
var md5 = require('md5');

class EmployeeList extends React.Component {
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
                <div className="employee-card-container">
                    {
                        employees.map(function (item, index) {
                            let gravatar = md5(`${item.LoginName}@insightresults.com`);
                            return <li id={`${item.EmployeeId}`} class="employee-card" onClick={() => _this.onEmployeeRowSelect(item.EmployeeId)} style={{ cursor: 'pointer' }}>
                                    <div className="employee-card-inner">
                                        <div title={"Employee:" + item.FirstName} className="emp-photo">
                                            <img className="circularImage" style={{ height:60, width:60, borderRadius:60 }} src={`https://secure.gravatar.com/avatar/${gravatar}?s=80&d=identicon`}  />
                                        </div>
                                        <div style={{ verticalAlign: 'top', paddingTop: '4px', display: 'inline-block', width: '100%' }}>
                                            <div style={{ width: '100%', position: 'relative' }}>
                                                <div className="emp-card-title" title={"Employee Name:" + item.FullName}>{item.FullName}</div>
                                                <p style={{ paddingTop: '5px', textAlign:'center' }}><i className="fa fa-graduation-cap"></i> <small>{item.Designation}</small></p>
                                                {item.Gender === 'M' &&
                                                    <p style={{ paddingTop: '5px', textAlign:'center' }}>
                                                        <i className="fa fa-male"></i>&nbsp;<small>Male</small>
                                                        {item.DateOfBirthDocumentorOriginal !== '' && <i className="fa fa-birthday-cake mgL20"><small> {moment(new Date(item.DateOfBirth)).format('DD-MM-YYYY')}</small></i>}
                                                    </p>
                                                }
                                                {item.Gender === 'F' &&
                                                    <p style={{ paddingTop: '5px', textAlign:'center' }}>
                                                        <i className="fa fa-female"></i>&nbsp;<small>Female</small>
                                                        {item.DateOfBirthDocumentorOriginal !== '' && <i className="fa fa-birthday-cake mgL20"><small> {moment(new Date(item.DateOfBirth)).format('DD-MM-YYYY')}</small></i>}
                                                    </p>
                                                }
                                            </div>
                            
                                    </div>
                                </div>
                            </li>
                        })
                    }
                </div>
            </>
        )
    }
}
export default EmployeeList
