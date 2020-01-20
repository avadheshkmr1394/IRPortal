import React from 'react';
import Modal from 'react-modal';
import { Link, BrowserRouter, Route, Redirect } from 'react-router-dom'
import LeaveApply from '../../containers/dashboard/leaveApply'
import LeaveStatus from '../../containers/dashboard/leaveStatus'
import { getDashboardData } from '../../actions/dashboardActions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AppConfig from '../../appConfig';

class DailyEvent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false, currentDate: '', status: 1, divhideclass: 'hide', divcolorclass: 'rbc-day-bg', editresponse: ''
        };
    }
    changeLink = () => {
        return <Redirect to={AppConfig.baseUrl + 'Home'} />
    }
    toggleModal = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }
    getDetails = async (value) => {
        await this.setState({ currentDate: value });
        this.toggleModal();

    }
    hideModel = () => {
        this.setState({ isOpen: false });
        this.props.getDashboardData();
    }
    cancelModal = () => {
        this.toggleModal()
    }
    render() {
        return (
            <div className={this.props.children.props.className} >
                <div className={(this.props.children.props.className === 'rbc-day-bg rbc-off-day-bg rbc-off-range-bg' || this.props.children.props.className === 'rbc-day-bg rbc-off-range-bg' || this.props.children.props.className === 'rbc-day-bg rbc-off-day-bg') ? 'hidediv' : ''} style={{ position: 'absolute', top: -6, right: 0, zIndex: 5 }} >
                    <Link to={AppConfig.baseUrl + 'Home'} onClick={() => this.getDetails(this.props.value)} style={{ fontWeight: 'bold' }} >...</Link>&nbsp;
                    {/* <a href={AppConfig.baseUrl + 'Home'} onClick={() => this.getDetails(this.props.value)} style={{ fontWeight: 'bold' }}  >...</a>&nbsp; */}
                    <Modal isOpen={this.state.isOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.toggleModal} ariaHideApp={false} className='modal-style' contentLabel="">
                        <div id='addTaxSavingTypeModal' className={'v-modal-transparet-header'}>
                            <div className={'modal fade-in'} style={{ display: 'block' }}>
                                <div className={'modal-dialog modal-wd95pc-mwd-618'} style={{ margin: '8.75rem 48.75rem' }}>
                                    <div className="modal-content delete-modal">
                                        <div className="modal-body">
                                            <div className="modal-header">
                                                <Link to={AppConfig.baseUrl + 'Home'} className="close-button" onClick={this.hideModel}>X</Link>
                                            </div>
                                            <div className="form-horizontal">
                                                <div className='model-popup' >
                                                    <BrowserRouter>
                                                        <div>
                                                            <div className='modal-manu' >
                                                                {this.state.editresponse === '' && <span> <Link to={AppConfig.baseUrl + 'Home'} onClick={this.changeLink} className="link-apply-color" >Leave Apply</Link> | </span>}
                                                                {this.state.editresponse !== '' && <span> <Link to={AppConfig.baseUrl + 'editleave'} className="link-edit-color" >Edit Leave</Link> | </span>}
                                                                <span><Link to={AppConfig.baseUrl + 'leavestatus'} className='link-Leave-color' > Leaves</Link> | </span>
                                                            </div>
                                                            <Route path={AppConfig.baseUrl + 'Home'} exact strict render={() => { return (<LeaveApply currentDate={this.state.currentDate} status={this.state.status} cancelModal={this.cancelModal} />) }} />
                                                            <Route path={AppConfig.baseUrl + 'editleave'} exact strict render={() => { return (<LeaveApply />) }} />
                                                            <Route path={AppConfig.baseUrl + 'leavestatus'} exact strict render={() => { return (<LeaveStatus status={this.state.status} />) }} />
                                                        </div>
                                                    </BrowserRouter>
                                                </div>
                                            </div>
                                            {this.state.currentDate === '' && <div className="modal-footer"></div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getDashboardData }, dispatch);
}
export default connect(null, mapDispatchToProps)(DailyEvent);

