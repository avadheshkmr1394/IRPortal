import React from 'react'

class Header extends React.Component {
    render() {
        return (
            <>
                <div className='row'>
                    <div className="col-md-6">
                        <div className="pull-left" ><h3> Email Templates</h3></div>
                    </div>
                    <div id="container" className="col-md-6"  >
                        <div className="float-right">
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default Header