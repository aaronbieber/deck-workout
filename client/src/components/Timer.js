import React, { Component } from 'react';

export default class Timer extends Component {
    tick() {
        this.props.tick()
        this.frameId = requestAnimationFrame(() => this.tick())
    }

    componentDidMount() {
        this.tick()
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.frameId)
    }

    render() {
        var time = this.props.time

        if (this.props.running) {
            return (
                <div className="timer">
                  <span>{ time[1] }</span>:<span>{ time[2] }</span>
                </div>
            )
        }

        return null
    }
}
