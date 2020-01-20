import React from 'react'
import Header from './header'
import EmailTemplet from './emailTemplet'

class Index extends React.Component {
    render() {
        return (
            <>
                <main id="content" className="app__content">
                    <Header />
                    <EmailTemplet />
                </main>
            </>
        )
    }
}
export default Index