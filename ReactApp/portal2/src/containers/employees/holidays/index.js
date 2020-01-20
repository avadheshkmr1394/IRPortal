import React from 'react'
import Header from './header'
import Holidays from './holidays'
import { connect } from 'react-redux';
import { getHolidays } from '../../../actions/employeeActions'
import { bindActionCreators } from 'redux'



class Index extends React.Component {
    constructor() {
        super();
        this.state = {
            holidayDate: '',
        }
    }

    _onPress = () => {
        this.props.getHolidays();
        this.setState({ holidayDate: '' })
    }

    rowSelectionDate = (holidayDate) => {
        this.setState({ holidayDate: holidayDate })
    }

    render() {
        return (
            <>
                <main id="content" className="app__content">
                    <Header onPress={this._onPress} holidayDate={this.state.holidayDate} dashboardData={this.props.dashboardData} action={this.props.action} />
                    <Holidays employeeData={this.props.employeeData} onPress={this._onPress} rowSelectionDate={this.rowSelectionDate} holidayDate={this.state.holidayDate} />
                </main>
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getHolidays }, dispatch)
}
export default connect(null, mapDispatchToProps)(Index)



