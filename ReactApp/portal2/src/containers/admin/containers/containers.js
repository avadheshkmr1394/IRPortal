import React from 'react'
import Container from './container'
import UserPermissions from './userPermissions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUserContainerPermission, getContainers } from '../../../actions/adminAction'




class Containers extends React.Component {
    constructor() {
        super();
        this.state = {
            containerId: '',
            status: 0
        }
    }
    componentDidMount() {
        this.props.getUserContainerPermission()
    }

    selectContainerIdRow = async (containerId) => {
        this.setState({ containerId: containerId })
        localStorage.setItem('status', '1')
        await this.props.getUserContainerPermission({ containerId: containerId })
    }

    onPressUser = () => {
        this.setState({ status: 1, })
        localStorage.setItem('status', '1')
    }

    onPressContainer = async () => {
        this.setState({ containerId: '' })
        localStorage.setItem('status', '1')
        await this.props.getUserContainerPermission({ containerId: '' })
        await this.props.getContainers()
    }

    render() {
        return (
            <>
                <div className='row'>
                    <Container adminData={this.props.adminData} selectContainerIdRow={this.selectContainerIdRow} containerId={this.state.containerId} onPressContainer={this.onPressContainer} />
                    <UserPermissions adminData={this.props.adminData} onPressUser={this.onPressUser} containerId={this.state.containerId} />
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        adminData: state.adminData
    };
}

const mapDispatchToProps =  (dispatch) => {
    return  bindActionCreators({ getUserContainerPermission, getContainers }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Containers)


