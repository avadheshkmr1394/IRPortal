import React from 'react'
import Header from './header'
import User from './users'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAdminUser } from '../../../actions/adminAction'

class Index extends React.Component {
    componentDidMount() {
        this.props.getAdminUser();
    }

    _onPress = () => {
        this.props.getAdminUser();
    }

    render() {
        return (
            <>
                <main id="content" className="app__content">
                    <Header onPress={this._onPress} />
                    <User adminData={this.props.adminData} onPress={this._onPress} />
                </main>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        adminData: state.adminData,
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getAdminUser }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Index)
