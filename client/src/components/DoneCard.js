import React, { Component } from 'react';

export default class DoneCard extends Component {
    render() {
        var timeString = this.props.time[0] +
            ':' +
            this.props.time[1] +
            ':' +
            this.props.time[2]

        return (
            <div className="card-done">
              <span>{ timeString }</span>
              <img
                alt="Done!"
                src="/done.webp" />
            </div>
        )
    }
}
