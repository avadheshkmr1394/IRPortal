import React from 'react'
import ProjectHeader from './projectHeader'
import ReactTable from 'react-table'
import 'react-table/react-table.css';


class Project extends React.Component {

    getProject = () => {
        var projectArray = []
        if (projectArray.length != 0) {
            const dataCollection = {
                name: '',
                client: '',
                code: ''
            }
            projectArray.push(dataCollection)
        }
        else {
            projectArray.push({ name: 'No Records Found' })
        }
        return projectArray
    }

    render() {
        const project = this.getProject()
        const columns = [
            {
                Header: 'Name',
                accessor: 'name',
                className: "header-class",
            },
            {
                Header: 'Client',
                accessor: 'client',
                className: "header-class",
            },
            {
                Header: 'Code',
                accessor: 'code',
                className: "header-class",
            }
        ]
        return (
            <>
                <div className="col-md-6">
                    <div className='float-right'>
                        <div className="pull-right">
                            <ProjectHeader />
                        </div>
                    </div>
                    <br /><br />
                    <ReactTable className="-highlight IRTable"
                        columns={columns}
                        data={project}
                        showPagination={false}
                        pageSize={project.length}
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
export default Project

