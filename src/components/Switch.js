import React, { Component } from 'react';

export default class Switch extends Component {

    _toggleChecked = (e) => {
        e.preventDefault();
        this.props.toggleChecked();
    }

    _checked = () => {
        return this.props.drawCount === 3;
    }

    render() {
        return (
            <label
              onClick={ this._toggleChecked }
              className="form-switch">
              <input type="checkbox"
                     name={ this.props.name }
                     readOnly={ true }
                     checked={ this.props.drawCount === 3 } />
              <i className="form-icon"></i> { this.props.label }
            </label>
        );
    }
}
