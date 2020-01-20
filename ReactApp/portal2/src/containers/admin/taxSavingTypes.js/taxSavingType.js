import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css';


class TaxSavingType extends React.Component {
    constructor() {
        super();
        this.state = {
            item: [],
            taxSavingType: ''
        }
    }


    getTaxSavingType = (TaxSavingTypeData) => {
        const taxSavingTypeArray = [];
        if (TaxSavingTypeData.taxSavingType != null) {

            for (var i = 0; i < TaxSavingTypeData.taxSavingType.length; i++) {
                var dataCollection = {
                    taxSavingType: TaxSavingTypeData.taxSavingType[i].TaxSavingType,
                    taxSavingTypeName: TaxSavingTypeData.taxSavingType[i].TaxSavingTypeName,
                    taxCategoryCode: TaxSavingTypeData.taxSavingType[i].TaxCategoryCode
                }
                taxSavingTypeArray.push(dataCollection);
            }
        }
        return taxSavingTypeArray;
    }

    selectTaxSavingTypeRow = (selectTaxSavingType) => {
        this.setState({ taxSavingType: selectTaxSavingType })
        this.props.rowSelectionTaxSavingType(selectTaxSavingType)
    }

    render() {
        const taxSavingType = this.getTaxSavingType(this.props.adminData)
        const headerStyle = {
            backgroundColor: '#1abc9c',
            color: 'white',
            fontSize: 'small',
        }
        const columns = [
            {
                Header: "Tax SavingType Name",
                accessor: "taxSavingTypeName",
                // headerStyle: headerStyle,
                className: "header-class",
                width: 200
            },

            {
                Header: "Tax Category Code",
                accessor: "taxCategoryCode",
                className: "header-class",
                // headerStyle: headerStyle,
                width: 200
            }
        ]
        return (
            <>
                <div className="row">
                    <div className="container-fluid">
                        <ReactTable className="-highlight IRTable"
                            columns={columns}
                            data={taxSavingType}
                            showPagination={false}
                            pageSize={taxSavingType.length}
                            getTrProps={(state, rowInfo, column, instance) => {
                                return {
                                    onClick: () => {
                                        this.selectTaxSavingTypeRow(rowInfo.original.taxSavingType)
                                    },
                                    style: {
                                        backgroundColor: this.props.taxSavingType == '' ? '' : (this.state.taxSavingType == rowInfo.original.taxSavingType) ? '#ffefbb' : ''
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
            </>
        )
    }
}
export default TaxSavingType