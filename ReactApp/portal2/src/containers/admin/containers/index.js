import React from 'react'
import Header from './header'
import Containers from './containers'



class Index extends React.Component {
    render() {
        return (
            <>
                <main id="content" className="app__content">
                    <Header />
                    <Containers adminData={this.props.adminData} />
                </main>
            </>
        )
    }
}

export default Index