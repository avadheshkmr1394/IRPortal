import React from 'react'

class Header extends React.Component {
    render() {
        return (
            <>
                <div className='row'>
                    <div className="col-md-6">
                        <div className="pull-left" ><h3>Employee</h3></div>
                    </div>
                    <div id="container" className="col-md-6"  >
                    </div>
                </div>
            </>
        );
    }
}
export default Header
