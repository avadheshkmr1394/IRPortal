import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import AppConfig from '../../appConfig';
import SecondaryNavbar from './secondaryNavbar';
import { getRelativePath, getMajorMenuName } from '../../common/utils';
import { connect } from 'react-redux';

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            secondaryNavbar: this.showSecondaryNavbar(),
            showSidebarMenu: false
        }
    }

    showSecondaryNavbar() {
        const majorMenu = getMajorMenuName(getRelativePath(this.props.location.pathname));

        switch (majorMenu) {
            case 'admin': return true;
            default: return false;
        }
    }

    active = {
        color: "white"
    };

    LinkClick = (linkName) => e => {
        switch (linkName) {
            case 'admin':
                this.setState({ secondaryNavbar: true });
                break;
            default:
                this.setState({ secondaryNavbar: false });
                this.props.showSidebarMenu(false);

                break;
        }
    };

    render() {
        const { secondaryNavbar } = this.state;
        return (
            <>
                <div id="header" className='header-section dock-menu'>
                    <nav className="navbar navbar-expand-md navbar-dark bg-light ir-navbar fixed-top" style={{ position: 'absolute' }}>
                        <a className="navbar-brand" href={AppConfig.baseUrl}><img alt='Insight Results' src={'http://portal.insightresults.com/app/content/images/logo.png'} /></a>
                        {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button> */}
                        <div className="navbar-collapse collapse" id="navbarSupportedContent">
                            <ul className="nav navbar-nav">
                                <li className={"nav-item"}>
                                    <NavLink exact to={AppConfig.baseUrl + 'Home'} className={"nav-link"} activeStyle={this.active} onClick={this.LinkClick('home')}>Home</NavLink>
                                </li>
                                <li className={"nav-item"}>
                                    <NavLink to={AppConfig.baseUrl + 'Employees'} className={"nav-link"} activeStyle={this.active} onClick={this.LinkClick('employees')}>Employees</NavLink>
                                </li>
                                {this.props.dashboardData.userRole == 'Admin' && <li className={"nav-item"}>
                                    <NavLink to={AppConfig.baseUrl + 'Admin'} className={"nav-link"} activeStyle={this.active} onClick={this.LinkClick('admin')}>Admin</NavLink>
                                </li>}
                            </ul>
                        </div>
                    </nav>
                </div>
                {secondaryNavbar &&
                    <SecondaryNavbar showSidebarMenu={this.props.showSidebarMenu} sidebarMenu={this.props.sidebarMenu}
                        toggleSidebar={this.props.toggleSidebar} />
                }
            </>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        dashboardData: state.dashboardData,
    }
}
export default connect(mapStateToProps)(Navbar);
