import React from 'react'
import EmployeeList from './employeeList'
import { editEmployee, createEmployee } from '../../../actions/adminAction'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
// import '../../css/react-datepicker.css';


class Employee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            EmployeeId: '',
            FirstName: '',
            MiddleName: '',
            LastName: '',
            Designation: '',
            Gender: '',
            FatherName: '',
            DateOfBirth: '',
            OrignalDateOfBirth: '',
            DateOfJoining: '',
            DateOfRelieving: '',
            BankDetail: '',
            showEmployeeForm: '',
        }
        this.dateOfBirthCertificate = this.dateOfBirthCertificate.bind(this)
        this.dateOfBirthOriginal = this.dateOfBirthOriginal.bind(this);
        this.dateOfJoining = this.dateOfJoining.bind(this);
        this.dateOfRelieving = this.dateOfRelieving.bind(this)
    }

    dateOfBirthCertificate(date) {
        this.setState({
            DateOfBirth: date
        });
    }


    dateOfBirthOriginal(date) {
        this.setState({
            OrignalDateOfBirth: date
        });
    }

    dateOfJoining(date) {
        this.setState({
            DateOfJoining: date
        });
    }

    dateOfRelieving(date) {
        this.setState({
            DateOfRelieving: date
        });
    }

    createNewEmployee = () => {
        this.setState({
            showEmployeeForm: 'show',
            EmployeeId: '',
            FirstName: '',
            MiddleName: '',
            LastName: '',
            Designation: '',
            Gender: '',
            FatherName: '',
            DateOfBirth: '',
            OrignalDateOfBirth: '',
            DateOfJoining: '',
            DateOfRelieving: '',
            BankDetail: '',
        })
    }

    editEmployeeDetails = (employeeId) => {
        editEmployee({ employeeId: employeeId }).then((res) => {
            this.setState({
                EmployeeId: res.data[0].EmployeeId,
                FirstName: res.data[0].FirstName,
                MiddleName: res.data[0].MiddleName == null ? '' : res.data[0].MiddleName,
                LastName: res.data[0].LastName == null ? '' : res.data[0].LastName,
                Designation: res.data[0].Designation == null ? '' : res.data[0].Designation,
                Gender: res.data[0].Gender == null ? '' : res.data[0].Gender,
                FatherName: res.data[0].FatherName == null ? '' : res.data[0].FatherName,
                DateOfBirth: res.data[0].DateOfBirth == null ? '' : new Date(res.data[0].DateOfBirth),
                OrignalDateOfBirth: res.data[0].OrignalDateOfBirth == null ? '' : new Date(res.data[0].OrignalDateOfBirth),
                DateOfJoining: res.data[0].DateOfJoining == null ? '' : new Date(res.data[0].DateOfJoining),
                DateOfRelieving: res.data[0].DateOfRelieving == null ? '' : new Date(res.data[0].DateOfRelieving),
                BankDetail: res.data[0].BankDetail == null ? '' : res.data[0].BankDetail,
                showEmployeeForm: 'show'
            })
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        createEmployee(this.state)
        this.setState({ showEmployeeForm: '' })
        this.refreshData();
    }

    refreshData = () => {
        this.props.onPress();
    }

    render() {
        const employeeData = this.props.employeeData.getEmployeeData
        return (
            <>
                <div className="row" style={{ marginTop: "9px", marginBottom: "10px" }} >
                    <div className="pull-left col-md-3" style={{ color: "#2e508f" }} >
                        <a href='#' onClick={this.createNewEmployee}  ><h6>Create New Employee</h6></a>
                        <EmployeeList employeeData={employeeData} editEmployeeDetails={this.editEmployeeDetails} />
                    </div>
                    {this.state.showEmployeeForm == 'show' && <div className="col-md-9">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-horizontal">
                                {this.state.EmployeeId != '' && <div className="page-header modal-header-colored" id="hdrEmployee"><i className="fa fa-edit fa-fw"></i> Edit Employee</div>}
                                {this.state.EmployeeId == '' && <div className="page-header modal-header-colored" id="hdrEmployee"><i className="fa fa-plus fa-fw"></i> Add Employee</div>}
                                <br />
                                <div className="row">
                                    <label className="col-md-2">First Name</label>
                                    <div className="col-md-10">
                                        <input type="text" onChange={this.handleChange} name="FirstName" value={this.state.FirstName} className="form-control" />
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <label className="col-md-2 col-lg-2 col-sm-2"> Middle Name</label>
                                    <div className="col-md-10 col-lg-10 col-sm-10">
                                        <input type="text" name="MiddleName" onChange={this.handleChange} value={this.state.MiddleName} className="form-control" />
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <label className="col-md-2 col-lg-2 col-sm-2">Last Name</label>
                                    <div className="col-md-10 col-lg-10 col-sm-10">
                                        <input type="text" name="LastName" onChange={this.handleChange} value={this.state.LastName} className="form-control" />
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <label className="col-md-2 col-lg-2 col-sm-2">Designation</label>
                                    <div className="col-md-10 col-lg-10 col-sm-10">
                                        <input type="text" name="Designation" onChange={this.handleChange} value={this.state.Designation} className="form-control" />
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <label className="col-md-2 col-lg-2 col-sm-2">Gender</label>
                                    <div className="col-md-10 col-lg-10 col-sm-10">
                                        <select className="form-control" name='Gender' value='this.state.Gender' onChange={this.handleChange}  >
                                            <option value='M' >Male</option>
                                            <option value='F' >Female</option>
                                        </select>

                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <label className="col-md-2 col-lg-2 col-sm-2">Father's Name</label>
                                    <div className="col-md-10 col-lg-10 col-sm-10">
                                        <input type="text" onChange={this.handleChange} name="FatherName" value={this.state.FatherName} className="form-control" />
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <label className="col-md-2 col-lg-2 col-sm-2">DOB(Certificate)</label>
                                    <div className="col-md-10 col-lg-10 col-sm-10">
                                        <DatePicker name='DateOfBirth' onChange={this.dateOfBirthCertificate} selected={this.state.DateOfBirth} placeholderText="dd/mm/yyyy" className="form-control date-picker" />
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <label className="col-md-2 col-lg-2 col-sm-2">DOB(Original)</label>
                                    <div className="col-md-10 col-lg-10 col-sm-10">
                                        <DatePicker name='OrignalDateOfBirth' onChange={this.dateOfBirthOriginal} selected={this.state.OrignalDateOfBirth} placeholderText="dd/mm/yyyy" className="form-control date-picker" />
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <label className="col-md-2 col-lg-2 col-sm-2">DOJ</label>
                                    <div className="col-md-10 col-lg-10 col-sm-10">
                                        <DatePicker name='DateOfJoining' onChange={this.dateOfJoining} selected={this.state.DateOfJoining} placeholderText="dd/mm/yyyy" className="form-control date-picker" />
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <label className="col-md-2 col-lg-2 col-sm-2">DOR</label>
                                    <div className="col-md-10 col-lg-10 col-sm-10">
                                        <DatePicker name='DateOfRelieving' onChange={this.dateOfRelieving} selected={this.state.DateOfRelieving} placeholderText="dd/mm/yyyy" className="form-control date-picker" />
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <label className="col-md-2 col-lg-2 col-sm-2=">Bank Detail</label>
                                    <div className="col-md-10 col-lg-10 col-sm-10">
                                        <input type="text" onChange={this.handleChange} name="BankDetail" value={this.state.BankDetail} className="form-control" />
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <label className="col-md-2 col-lg-2 col-sm-2="></label>
                                    <div className="col-md-10 col-lg-10 col-sm-10">
                                        <input id="btnSaveCreate" type="submit" value="Save" className="btn btn-default" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    }

                </div>
            </>
        );
    }
}
export default Employee
