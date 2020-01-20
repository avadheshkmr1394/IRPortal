import React from 'react'
import Header from './header'
import MapEmployee from './mapEmployee'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getMapEmployee } from '../../../actions/employeeActions'


class Index extends React.Component {

    componentDidMount() {
        this.props.getMapEmployee()

    }

    _onPress = (value) => {
        this.props.getMapEmployee()
    }
    render() {
        return (
            <>
                <main id="content" className="app__content">
                    <Header onPress={this._onPress} />
                    <MapEmployee adminData={this.props.adminData} onPress={this._onPress} />
                </main>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        adminData: state.adminData,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getMapEmployee }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)