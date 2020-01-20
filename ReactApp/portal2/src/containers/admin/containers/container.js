import React from 'react'
import ContainerHeader from './containerHeader'
import ReactTable from 'react-table'
import 'react-table/react-table.css';


class Container extends React.Component {

    getContainer = (item) => {
        var containerArray = []
        if (item.containers.length != 0) {
            for (let i = 0; i < item.containers.length; i++) {
                const dataCollection = {
                    containerId: item.containers[i].ContainerId,
                    name: item.containers[i].Name
                }
                containerArray.push(dataCollection)
            }
        }
        else {
            containerArray.push({ containerName: 'No Records Found' })
        }
        return containerArray
    }
    selectContainerRow = (containerId) => {
        this.props.selectContainerIdRow(containerId)
    }

    render() {
        const container = this.getContainer(this.props.adminData)

        const columns = [{
            Header: 'Container Name',
            accessor: 'name',
            className: "header-class",
        }]
        return (
            <>
                <div className="col-md-6">
                    <div className='float-right'>
                        <div className="pull-right">
                            <ContainerHeader onPressContainer={this.props.onPressContainer} containerId={this.props.containerId} />
                        </div>
                    </div>
                    <br /><br />
                    <ReactTable className="-highlight IRTable"
                        columns={columns}
                        data={container}
                        showPagination={false}
                        pageSize={container.length}
                        getTrProps={(state, rowInfo, column, instance) => {
                            return {
                                onClick: () => {
                                    this.selectContainerRow(rowInfo.original.containerId)
                                },
                                style: {
                                    backgroundColor: this.props.containerId === rowInfo.original.containerId ? '#d0e9c6' : ''
                                }
                            }
                        }}
                    />
                </div>
            </>
        )
    }
}
export default Container


