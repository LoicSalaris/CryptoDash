import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap'

class Error404 extends Component {
    render() {
        return (
            <div className="error404-view">
                <PageHeader>Error <small>404</small></PageHeader>
                <p>Sorry, page was not found!</p>
            </div>
        )
    }
}

export default Error404;