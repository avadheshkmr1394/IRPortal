import React, { PureComponent } from 'react';
import { approveEmployeeLeave, deleteLeave } from '../../actions/leaveAction'
import { getDashboardData } from '../../actions/dashboardActions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class EventComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      EmployeeId: '',
      LeaveId: '',
      year: '',
      showMenu: false,
      classactive: 'dropdown'
    }
    this.toggleModal = this.toggleModal.bind(this);
  }
  toggleModal = () => {
    this.setState({ showMenu: !this.state.showMenu });
  }
  onClickDialog = async (e, leaveId, employeeId, EventDate) => {
    e.stopPropagation();
    var year = new Date(EventDate).getFullYear();
    await this.setState({ EmployeeId: employeeId, LeaveId: leaveId, year: year })
    this.toggleModal();
  }
  approveLeave = async (e) => {
    await approveEmployeeLeave({ LeaveId: this.state.LeaveId, employeeId: this.state.EmployeeId, IsApproved: true, year: this.state.year });
    this.props.getDashboardData();
    this.setState({
      showMenu: false
    })
  }
  deleteLeave = async (e) => {
    await deleteLeave({ LeaveId: this.state.LeaveId });
    this.props.getDashboardData();
    this.setState({
      showMenu: false
    })

  }
  renderEvent(event) {
    const eventType = event.EventType;
    const name = event.Name;
    const isApproved = event.IsApproved === 1 ? 'approved' : 'unapproved';
    switch (eventType) {
      case 'Birthday': return (<div className='birthday' title={eventType}>
        <i className="fas fa-birthday-cake" ></i>&nbsp;{name}
      </div>);
      case 'FullDay': return (<div className={`fullday ${isApproved}`} title='Leave' >

        <i className="fas fa-umbrella-beach" ></i>&nbsp;{name}
        {this.props.userRole === 'Admin' && event.IsApproved === 0 &&
          <a href='#' onClick={(e) => this.onClickDialog(e, event.LeaveId, event.EmployeeId, event.EventDate)} className='rotatepoint' >...</a>}

        <i style={{ position: 'absolute' }} >  {
          this.state.showMenu ? (
            <div>
              <div className='showmenu' >
                {<a href='#' onClick={this.approveLeave} style={{ color: '#000000', fontStyle: 'initial' }} >Approve</a>}<br></br>
                <a href='#' style={{ color: '#000000', fontStyle: 'initial' }} onClick={this.deleteLeave} >Delete</a>
                <hr style={{ height: '2px', marginTop: '4px', marginBottom: '4px' }}></hr>
                <a href='#' style={{ color: '#000000', fontStyle: 'initial' }} onClick={this.toggleModal}>Cancel</a>
              </div>
            </div>
          )
            : (
              null
            )
        }
        </i>
      </div>
      );
      case '1stHalf':
        return (
          <div className={`first-half-${isApproved}`} title='Leave'>
            <i className="fas fa-umbrella-beach"></i>&nbsp;{name}
            {this.props.userRole == 'Admin' && event.IsApproved === 0 &&
              <a href='#' onClick={(e) => this.onClickDialog(e, event.LeaveId, event.EmployeeId, event.EventDate)} className='rotatepoint'  >...</a>}
            <i style={{ position: 'absolute' }}>  {
              this.state.showMenu
                ? (<div className='showmenu'>
                  {<a onClick={this.approveLeave} className='approveleave' style={{ color: '#000000', fontStyle: 'initial' }} >Approve</a>}<br></br>

                  <a style={{ color: '#000000', fontStyle: 'initial' }} onClick={this.deleteLeave} >Delete</a>
                  <hr style={{ height: '2px', marginTop: '4px', marginBottom: '4px' }}></hr>
                  <a style={{ color: '#000000', fontStyle: 'initial' }} onClick={this.toggleModal}>Cancel</a>
                </div>
                )
                : (null)
            }
            </i>
          </div>
        );
      case '2ndHalf':
        return (
          <div className={`second-half-${isApproved}`} title='Leave'>
            <i className="fas fa-umbrella-beach"></i>&nbsp;{name}
            {this.props.userRole == 'Admin' && event.IsApproved === 0 &&
              <a href='#' onClick={(e) => this.onClickDialog(e, event.LeaveId, event.EmployeeId, event.EventDate)} className='rotatepoint'  >...</a>}
            <i style={{ position: 'absolute' }}>  {
              this.state.showMenu
                ? (<div className='showmenu'>
                  {<a onClick={this.approveLeave} className='approveleave' style={{ color: '#000000', fontStyle: 'initial' }} >Approve</a>}<br></br>

                  <a style={{ color: '#000000', fontStyle: 'initial' }} onClick={this.deleteLeave} >Delete</a>
                  <hr style={{ height: '2px', marginTop: '4px', marginBottom: '4px' }}></hr>
                  <a style={{ color: '#000000', fontStyle: 'initial' }} onClick={this.toggleModal}>Cancel</a>
                </div>
                )
                : (null)
            }
            </i>
          </div>
        );
      case 'Holiday': return (<div className='holiday' title={eventType}>
        <i className="fas fa-snowman" ></i>&nbsp;{name}
      </div>);
      default: return (<div>{eventType}:&nbsp;{name}</div>);
    }
  }
  render() {
    return (
      this.renderEvent(this.props.event)
    )
  }
}
const mapStateToProps = (state) => {
  return {
    userRole: state.dashboardData.userRole,
    empId: state.empId
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getDashboardData }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(EventComponent);
