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

    now() {
        return Math.floor(new Date().getTime() / 1000)
    }

    pad(n, z) {
        var width = 2
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

    computeTime() {
        if (this.props.start) {
            var delta = this.now() - this.props.start

            if (delta > 0) {
                var remainder
                var hours = 0,
                    minutes = 0,
                    seconds = 0

                hours = Math.floor(delta / 3600)
                remainder = delta % 3600
                if (remainder > 0) {
                    minutes = Math.floor(remainder / 60)
                    remainder = remainder % 60
                }
                if (remainder > 0) {
                    seconds = remainder
                }

                return [
                    this.pad(hours),
                    this.pad(minutes),
                    this.pad(seconds)
                ]
            }
        }
        return ['00', '00', '00']
    }

    render() {
        console.log('rendering timer')

        var time = this.computeTime()

        return (
            <div className="timer">
              <span>{ time[0] }</span>:<span>{ time[1] }</span>:<span>{ time[2] }</span>
            </div>
        )
    }
}
