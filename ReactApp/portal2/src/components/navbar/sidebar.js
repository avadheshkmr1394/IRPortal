import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends PureComponent {

    render() {
        return (
            //     <ul className="sideBarMenu">
            //     <li className="sideBarMenu__item"><Link to="/Admin">Home</Link></li>
            //     <li className="sideBarMenu__item"><Link to="/Admin">About</Link></li>
            //     <li className="sideBarMenu__item"><Link to="/Admin">Contact</Link></li>
            // </ul>

            <nav id="sidebar" className={this.props.className}>
                {/* <div className="sidebar-header">
                    <h6>Bootstrap Sidebar</h6>
                </div> */}

                <ul className="list-unstyled">
                    <li className="active">
                        <a href="#">
                            <i className="fas fa-home"></i>
                            Home
                    </a>

                    </li>
                    <li>
                        <a href="#">
                            <i className="fas fa-briefcase"></i>
                            About
                    </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="fas fa-image"></i>
                            Portfolio
                    </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="fas fa-question"></i>
                            FAQ
                    </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="fas fa-paper-plane"></i>
                            Contact
                    </a>
                    </li>
                </ul>

            </nav>

        )
    }
}

export default Sidebar;
