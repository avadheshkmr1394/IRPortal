import React, { PureComponent } from 'react';
import BarLoader from 'react-spinners/BarLoader';

class Loader extends PureComponent {

    render() {
        return (
            <div className='react-spinner'>
                <BarLoader color={'#36D7B7'} loading={this.props.isLoading} />
            </div>
        )
    }
}


export default Loader;
