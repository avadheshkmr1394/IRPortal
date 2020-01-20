import React from 'react'
import Header from './header'
import TaxSaving from './taxSavings'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTaxSavingReceipt, getSavingTypes, } from '../../../actions/employeeActions'



class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taxSavingId: '',
            employeeId: '',
            rowBackgroundColor: ''
        }
    }
    componentDidMount() {
        this.props.getSavingTypes()
    }

    _onPress = () => {
        this.getTaxSavingReceipt(document.getElementById('inputUserId').value, new Date().getFullYear())
        this.setState({
            taxSavingId: '',
            employeeId: '',
            rowBackgroundColor: ""
        })
    }

    getTaxSavingReceipt = (userId, financialYear) => {
        userId = userId != '' ? document.getElementById('inputUserId').value : this.props.dashboardData.employeeId;
        financialYear = financialYear != '' ? document.getElementById('inputFinancialYear').value : new Date().getFullYear();
        this.props.getTaxSavingReceipt({ employeeId: userId, financialYear: financialYear })
    }

    selectTaxSavingRowData = (taxsavingId, employeeId) => {
        this.setState({
            taxSavingId: taxsavingId,
            employeeId: employeeId,
            rowBackgroundColor: "#ffefbb"
        })
    }

    render() {
        return (
            <>
                <main id="content" className="app__content">
                    <Header employeeData={this.props.employeeData} dashboardData={this.props.dashboardData} onPress={this._onPress} getTaxSavingReceipt={this.getTaxSavingReceipt} taxSavingId={this.state.taxSavingId} employeeId={this.state.employeeId} rowBackgroundColor={this.state.rowBackgroundColor} />
                    <TaxSaving employeeData={this.props.employeeData} dashboardData={this.props.dashboardData} selectTaxSavingRowData={this.selectTaxSavingRowData} taxSavingId={this.state.taxSavingId} employeeId={this.state.employeeId} rowBackgroundColor={this.state.rowBackgroundColor} />
                </main>
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getTaxSavingReceipt, getSavingTypes }, dispatch)
}
export default connect(null, mapDispatchToProps)(Index)