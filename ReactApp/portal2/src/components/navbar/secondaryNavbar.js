import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

class SecondaryNavbar extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            activeTab: 100
        }
    }

    isActive(activeTab, value) {
        return (value === activeTab) ? ' active' : '';
    }

    onLinkClick = (value) => e => {
        this.setState({ activeTab: value });
        let sidebarMenu = false;
        switch (value) {
            case 101: sidebarMenu = true; break;
            default: sidebarMenu = false; break;
        }
        this.props.showSidebarMenu(sidebarMenu);
    }

    // toggleSidebar = () => e => {
    //     this.props.toggleSidebar();
    // }

    render() {
        const { activeTab } = this.state;
        const sidebarMenu = this.props.sidebarMenu;

        return (
            <>
                {/* <div  className='header-section dock-menu secondary-navbar'>
                <nav className=" navbar navbar-expand navbar-light" > */}
                {/* <div className="navbar-title">Views</div> */}
                {/* {sidebarMenu &&
                        <button type="button" className={"btn btn-info"} onClick={this.props.toggleSidebar}> */}
                {/* id="sidebarCollapse" */}
                {/* <span className="navbar-toggler-icon"></span>
                        </button> */}

                {/* {!sidebarMenu &&
                        <button type="button" className={"btn btn-info disabled"} >
                            {/* id="sidebarCollapse" */}
                {/* <span className="navbar-toggler-icon"></span>
                        </button> */}


                {/* <ul className="navbar-nav">
                        <li className={"nav-item" + this.isActive(activeTab, 100)}>
                            <Link className="nav-link" to="#" onClick={this.onLinkClick(100)}>Home</Link>
                        </li>
                        <li className={"nav-item" + this.isActive(activeTab, 101)}>
                            <Link className="nav-link" to="#" onClick={this.onLinkClick(101)}>Menu with Side Bar</Link>
                        </li>
                        <li className={"nav-item" + this.isActive(activeTab, 102)}>
                            <Link className="nav-link" to="#" onClick={this.onLinkClick(102)}>Pricing</Link>
                        </li>
                    </ul> */}
                {/* </nav>
            </div> */}
            </>
        )
    }
}

export default SecondaryNavbar;