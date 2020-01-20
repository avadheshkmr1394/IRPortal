import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import AppConfig from '../appConfig';
import { connect } from 'react-redux';

class Navbar extends Component {

    active = {
        color: "white"
    };

    render() {
        const userRole = this.props.dashboardData.userRole
        return (
            <>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <a className="navbar-brand" href={AppConfig.baseUrl}><img src={AppConfig.baseUrl + 'Content/Images/logo.png'} /></a>
                    <div className="navbar-collapse collapse" id="navbarSupportedContent">
                        <ul className="nav navbar-nav">
                            <li className={"nav-item"}>
                                <NavLink exact to={AppConfig.baseUrl + 'Home'} className={"nav-link"} activeStyle={this.active}>Home</NavLink>
                            </li>
                            <li className={"nav-item"}>
                                <NavLink to={AppConfig.baseUrl + 'Attendance'} className={"nav-link"} activeStyle={this.active}>Employees</NavLink>
                            </li>
                            {userRole == "Admin" && <li className={"nav-item"}>
                                <NavLink to={AppConfig.baseUrl + 'Account'} className={"nav-link"} activeStyle={this.active}>Admin</NavLink>
                            </li>}
                        </ul>
                    </div>
                </nav>
            </>
        );
    }
}
const mapStateToProps = (state) => {
    console.log("state",state)
    return {
        dashboardData: state.dashboardData
    }
}
export default connect(mapStateToProps)(Navbar);
