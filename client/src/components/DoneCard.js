import React, { Component } from 'react';
import { connect } from 'react-redux'

class DoneCard extends Component {
  render() {
    var timeString = this.props.time[0] +
        ':' +
        this.props.time[1] +
        ':' +
        this.props.time[2]

    if (parseInt(this.props.time[0]) === 0 &&
        parseInt(this.props.time[1]) === 0 &&
        parseInt(this.props.time[2]) === 0) {
      return ''
    } else {
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
}

const mapStateToProps = state => {
  return {
    time: state.timer.time
  };
};

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DoneCard)
