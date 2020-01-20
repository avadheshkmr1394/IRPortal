import React from 'react'
import moment from 'moment'


class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            fullDate: moment().format('MMM, YYYY'),
            month: '',
            year: '',
            startMonthDate: '',
            chkTotal: true,
            chkIn: false,
            chkOut: false
        }
    }

    prevMonth = async () => {
        const date = new Date();
        const month = date.getMonth();
        const year = date.getFullYear();
        if (this.state.month == '') {
            await this.setState({
                month: month == 0 ? 12 : month,
                year: month == 0 ? year - 1 : year
            })
        }
        else {
            await this.setState({
                month: this.state.month == 1 ? 12 : this.state.month - 1,
                year: this.state.month == 1 ? this.state.year - 1 : this.state.year
            })
        }
        const fullDate = this.state.month + "-" + "0" + 1 + "-" + this.state.year
        const fd = new Date(fullDate);
        this.setState({
            fullDate: moment(fd).format('MMM, YYYY'),
            startMonthDate: fullDate
        })
        this.props.onPress(this.state.startMonthDate)
    }

    nextMonth = async () => {
        const date = new Date();
        const month = date.getMonth();
        const year = date.getFullYear();
        if (this.state.month == '') {
            await this.setState({
                month: month == 11 ? 1 : month + 2,
                year: month == 11 ? year + 1 : year
            })
        }
        else {
            await this.setState({
                month: this.state.month == 12 ? 1 : this.state.month + 1,
                year: this.state.month == 12 ? this.state.year + 1 : this.state.year
            })
        }
        const fullDate = this.state.month + "-" + "0" + 1 + "-" + this.state.year
        const fd = new Date(fullDate);
        this.setState({
            fullDate: moment(fd).format('MMM, YYYY'),
            startMonthDate: fullDate
        })
        this.props.onPress(this.state.startMonthDate)
    }

    handleChange = async ({ target }) => {
        let isChecked = target.checked;
        switch (target.id) {
            case 'chkTotal':
                this.setState({ chkTotal: !this.state.chkTotal });
                if (isChecked) {
                    this.setState({ chkIn: false, chkOut: false });
                } else {
                    this.setState({ chkIn: true, chkOut: true });
                }
                break;
            case 'chkIn':
                this.setState({ chkIn: !this.state.chkIn });
                if (isChecked) {
                    this.setState({ chkTotal: false });
                }
                if (!this.state.chkOut) {
                    this.setState({ chkTotal: !this.state.chkTotal });
                }
                break;
            case 'chkOut':
                this.setState({ chkOut: !this.state.chkOut });
                if (isChecked) {
                    this.setState({ chkTotal: false });
                }
                if (!this.state.chkIn) {
                    this.setState({ chkTotal: !this.state.chkTotal });
                }
                break;
            default: break;
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            this.props.setAttendance(this.state.chkIn, this.state.chkOut, this.state.chkTotal)
        }
    }
    render() {

        return (
            <div className='row'>
                <div className="col-md-6">
                    <div className="pull-left" ><h3>Attendance Report</h3></div>
                </div>
                <div id="container" className="col-md-6"  >
                    <div className="float-right">
                        <div className="pull-right">
                            <div className="btn-group" role="group" aria-label="...">
                                <div style={{ marginRight: 50 }}>
                                    <input id='chkIn' onChange={this.handleChange} checked={this.state.chkIn} type='checkbox' />InTime
                                    &nbsp;<input id='chkOut' onChange={this.handleChange} checked={this.state.chkOut} type='checkbox' />OutTime
                                </div>
                                <div style={{ marginRight: 10 }}>
                                    <input id='chkTotal' onChange={this.handleChange} checked={this.state.chkTotal} type='checkbox' />TotalTime
                                </div>
                            </div>
                            <div className="btn-group" role="group" aria-label="...">
                                <button id="btnPrev" onClick={this.prevMonth} className="btn btn-default  ir-btn-neutral-outline wd35" data-toggle="tooltip" data-placement="bottom" title="Previous Month">
                                    <i className="fa fa-angle-left fa-fw"></i>
                                </button>
                                <button id="btnTitleDate" className="btn btn-default ir-btn-neutral-outline hidden-sm hidden-xs" style={{ fontWeight: "bold", width: "120px" }} value={this.state.fullDate}>{this.state.fullDate}</button>
                                <button id="btnNext" onClick={this.nextMonth} className="btn btn-default  ir-btn-neutral-outline wd35" data-toggle="tooltip" data-placement="bottom" title="Next Month">
                                    <i className="fa fa-angle-right fa-fw"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Header
