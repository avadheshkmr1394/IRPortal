import React from 'react'
import Header from './header'
import Employee from './employee'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getEmployeeData } from '../../../actions/leaveAction';

class Index extends React.Component {


    componentDidMount() {
        this.props.getEmployeeData()
    }
    _onPress = () => {
        this.props.getEmployeeData()
    }

    render() {
        return (
            <>
                <main id="content" className="app__content">
                    <Header />
                    <Employee employeeData={this.props.employeeData} onPress={this._onPress} adminData={this.props.adminData} />
                </main>
            </>
        );
    }

}

const mapStateToProps = (state) => {
    return {

        employeeData: state.employeeData,
        adminData: state.adminData,
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getEmployeeData }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Index)
