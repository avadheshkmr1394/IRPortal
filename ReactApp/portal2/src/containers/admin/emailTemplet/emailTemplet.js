import React from 'react'

class EmailTemplet extends React.Component {
    render() {
        return (
            <>
                <div className="row" style={{ marginTop: "9px", marginBottom: "10px" }} >
                    <div className="pull-left col-md-3" style={{ color: "#2e508f" }} >
                        <a href='#' onClick={this.createNewEmployee}  ><h6>Email Template</h6></a>
                    </div>
                    <div className="col-md-9">
                        <div className="form-horizontal">
                            <div className="page-header modal-header-colored" id="hdrEmployee"> Email Template Details</div>
                            <br />
                            <div className="row">
                                <label className="col-md-2">From Email Id:</label>
                                <div className="col-md-10">
                                    <input id="emailFrom" type="text" className="form-control" />
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <label className="col-md-2">To Email Id:</label>
                                <div className="col-md-10">
                                    <input id="emailTo" type="text" className="form-control" />
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <label className="col-md-2">CC Email Id:</label>
                                <div className="col-md-10">
                                    <input id="emailCC" type="text" className="form-control" />
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <label className="col-md-2">Subject</label>
                                <div className="col-md-10">
                                    <input id="emailSub" type="text" className="form-control" />
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <label className="col-md-2">Body</label>
                                <div className="col-md-10">
                                    <textarea id="editor" className="form-control"></textarea>
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <label className="col-md-2"></label>
                                <div className="col-md-10">
                                    <button type="submit" className="btn btn-success" id="addEmailTemplet">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default EmailTemplet