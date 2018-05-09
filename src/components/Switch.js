import React, { Component } from 'react';

export default class Switch extends Component {
    render() {
        return (
            <label className="form-switch">
              <input type="checkbox"
                     name={ this.props.name }
                     onChange={ this.props.toggleChecked }
                     checked="{ this.props.checked}" />
              <i className="form-icon"></i> { this.props.label }
            </label>
        );
    }
}
