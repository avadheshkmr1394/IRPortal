import React from 'react'

class Dropdown extends React.Component {

    render() {
        return (
            <select className="form-control" name={this.props.name} value={this.props.value} onChange={this.props.onChange}  >
                {
                    this.props.data.map(function (item, index) {
                        return <option key={index} value={item.value} >{item.text}</option>
                    })
                }
            </select>
        )
    }
}
export default Dropdown