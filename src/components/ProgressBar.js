import React, { Component } from 'react';

export default class ProgressBar extends Component {
    render() {
        var percentComplete = Math.ceil((this.props.discard.length/54)*100)
        var width = percentComplete + '%';
        return (
            <div className="progress-bar">
              <div className="progress-progress" style={{ width: width }}/>
            </div>
        )
    }
}
