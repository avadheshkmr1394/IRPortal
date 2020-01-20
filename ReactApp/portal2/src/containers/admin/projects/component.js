import React from 'react'
import ComponetHeader from './componetHeader'
import ReactTable from 'react-table'
import 'react-table/react-table.css';


class Componet extends React.Component {

    getComponent = () => {
        var componentArray = []
        if (componentArray.length != 0) {
            const dataCollection = {
                name: '',
            }
            componentArray.push(dataCollection)
        }
        else {
            componentArray.push({ name: 'No Records Found' })
        }
        return componentArray
    }

    render() {
        const component = this.getComponent()
        const columns = [
            {
                Header: 'Name',
                accessor: 'name',
                className: "header-class",
            }
        ]
        return (
            <>
                <div className="col-md-3">
                    <div className='float-right'>
                        <div className="pull-right">
                            <ComponetHeader />
                        </div>
                    </div>
                    <br /><br />
                    <ReactTable className="-highlight IRTable"
                        columns={columns}
                        data={component}
                        showPagination={false}
                        pageSize={component.length}
                        getTrProps={(state, rowInfo, column, instance) => {
                            return {
                                style: {
                                    backgroundColor: ''
                                }
                            }
                        }}
                    />
                </div>
            </>
        )
    }
}
export default Componet

