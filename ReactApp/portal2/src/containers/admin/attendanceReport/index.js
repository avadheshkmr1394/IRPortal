import React from 'react'
import Header from './header'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AttendanceReport from './attendanceReport'
import { GetAttendanceReport } from '../../../actions/attendanceAction'
import moment from 'moment';



class Index extends React.Component {
    constructor() {
        super();
        this.state = {
            InTime: false,
            OutTime: false,
            TotalTime: true
        }
    }
    
    setAttendance = (inTime, outTime, totalTime) => {
        if (inTime == true) {
            this.setState({ InTime: true, TotalTime: false })
        }
        else {
            this.setState({ InTime: false })
        }
        if (outTime == true) {
            this.setState({ OutTime: true, TotalTime: false })
        }
        else {
            this.setState({ OutTime: false })
        }
        if (totalTime == true) {
            this.setState({ TotalTime: true, InTime: false, OutTime: false })
        }
    }
    componentDidMount() {
        this.props.GetAttendanceReport({ monthStartDate: moment(new Date()).format('MM') + "-01-" + moment(new Date()).format('YYYY') })
    }

    _onPress = (date) => {
        this.props.GetAttendanceReport({ monthStartDate: date })
        this.setState({
            InTime: false,
            OutTime: false,
            TotalTime: true
        })
    }

    render() {
        return (
            <>
                <main id="content" className="app__content">
                    <Header onPress={this._onPress} setAttendance={this.setAttendance} InTime={this.state.InTime} OutTime={this.state.OutTime} TotalTime={this.state.TotalTime} />
                    <AttendanceReport adminData={this.props.adminData} InTime={this.state.InTime} OutTime={this.state.OutTime} TotalTime={this.state.TotalTime} />
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
    return bindActionCreators({ GetAttendanceReport }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Index)
