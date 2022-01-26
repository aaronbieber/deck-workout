import React, { Component } from 'react'
import debounce from 'lodash/debounce'

export default class DoneCard extends Component {

    getTimeString = () => {
        return this.props.time[0] +
            ':' +
            this.props.time[1] +
            ':' +
            this.props.time[2]
    }

    _shareClick = debounce((e) => {
        this.props.shareClick(this.getTimeString())
    }, 200)

    render() {
        return (
            <div className="card-done">
              <span>{ this.getTimeString() }</span>
              <img
                alt="Done!"
                src="/done.webp" />
              <button onClick={this._shareClick}>Share <img
                                                         alt="share icon"
                                                         src="/images/share.png" /></button>
            </div>
        )
    }
}
