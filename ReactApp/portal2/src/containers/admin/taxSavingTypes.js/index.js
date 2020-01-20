import React from 'react'
import Header from './header'
import TaxSavingType from './taxSavingType'
import { connect } from 'react-redux';
import { getAllTaxSavingType } from '../../../actions/employeeActions'
import { bindActionCreators } from 'redux'

class Index extends React.Component {
    constructor() {
        super();
        this.state = {
            taxSavingType: '',
        }
    }

    componentDidMount() {
        this.props.getAllTaxSavingType()
    }

    _onPress = (value) => {
        this.props.getAllTaxSavingType()
        this.setState({ taxSavingType: '' })
    }

    rowSelectionTaxSavingType = (taxSavingType) => {
        this.setState({ taxSavingType: taxSavingType })
    }

    render() {

        return (
            <>
                <main id="content" className="app__content">
                    <Header adminData={this.props.adminData} onPress={this._onPress} taxSavingType={this.state.taxSavingType} />
                    <TaxSavingType adminData={this.props.adminData} onPress={this._onPress} rowSelectionTaxSavingType={this.rowSelectionTaxSavingType} taxSavingType={this.state.taxSavingType} />
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
    return bindActionCreators({ getAllTaxSavingType }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)