import React, { Component } from 'react'

export default class Toast extends Component {
    render() {
        var toastClass = this.props.toast ? 'toast-on' : 'toast-off'
        return <div id="toast" className={ toastClass }>Copied to clipboard!</div>
    }
}
