import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import AppConfig from '../appConfig';
import '../css/common.css';
import '../css/main.css';
import '../css/react-spinner.css';
import '../css/ir-navbar.css';
import '../css/sec-navbar.css';
import '../css/sidebar.css';
import '../css/buttons.css';
import 'react-table/react-table.css';
import '../css/react-table.css';
import '../css/react-modal.css';
import '../css/pageTitleBar.css';
import '../css/table.css';
import '../css/attendance.css';
import '../css/leave.css';
import '../css/admin.css';
import '../css/fonts.css';



import DashboardPage from '../pages/dashboard/index';
import EmployeePage from '../pages/employees/index';
import AdminPage from '../pages/admin/index';
import Navbar from './navbar/index';
import Sidebar from './navbar/sidebar';

const NavbarWithRouter = withRouter(props => <Navbar {...props} />);
const SidebarWithRouter = withRouter(props => <Sidebar {...props} />);

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sidebarMenu: false,
            toggleSidebarMenu: false
        }
        this.showSidebarMenu = this.showSidebarMenu.bind(this);
        this.toggleSidebar = this.toggleSidebar.bind(this);
    }

    showSidebarMenu(value) {
        this.setState({ sidebarMenu: value })
    }

    toggleSidebar() {
        this.setState({ toggleSidebarMenu: !this.state.toggleSidebarMenu })
    }

    render() {
        const { sidebarMenu, toggleSidebarMenu } = this.state;
        return (
            <BrowserRouter>
                <div>
                    <div >
                        <NavbarWithRouter {...this.props} showSidebarMenu={this.showSidebarMenu} sidebarMenu={sidebarMenu} toggleSidebar={this.toggleSidebar} />
                    </div>
                    <div className="wrapper">
                        {sidebarMenu &&
                            <div className="sidebar" >
                                <SidebarWithRouter sidebarMenu={sidebarMenu} className={toggleSidebarMenu ? "active" : ""} />
                            </div>
                        }
                        {/* <main id="content" className="app__content"> */}
                            <Switch>
                                <Route path={AppConfig.baseUrl + 'Employees'} component={EmployeePage} />
                                <Route path={AppConfig.baseUrl + 'Admin'} component={AdminPage} />
                                <Route path={AppConfig.baseUrl + 'Home'} component={DashboardPage} />
                                <Route exact path={AppConfig.baseUrl} component={DashboardPage} />
                            </Switch>
                        {/* </main> */}
                    </div>
                </div>
                {/* <div className='col-lg-12 col-sm-12 col-md-12'>
                    <div style={{ display: "flex" }} id="header"
                        className='header-section dock-menu'>
                        <NavbarWithRouter {...this.props} />
                    </div>
                    <div style={{ padding: "10px", width: "20%", background: "#f0f0f0" }} className='float-left'>
                        <Sidebar />
                    </div>
                    <div style={{ width: "80%" }} className="float-right d-flex p-2" >
                        <Switch>
                            <Route exact path={AppConfig.baseUrl} component={DashboardPage} />
                            <Route path={AppConfig.baseUrl + 'Home'} component={DashboardPage} />
                        </Switch>
                    </div>
                </div> */}
            </BrowserRouter>
        );
    }
}
export default App;


