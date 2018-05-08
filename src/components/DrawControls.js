import React, { Component } from 'react';
import * as actions from '../actions';

export default class DrawControls extends Component {
    render() {
        return (
            <div className="columns controls">
              <div className="column col-11 col-mx-auto">
                <form className="form-horizontal" action="#">
                  <div className="form-group">
                    <div className="col-4 col-ml-1">
                      <button onClick={actions.generate} className="btn">Regenerate</button>
                    </div>

                    <div className="col-3 col-ml-1">
                      <button className="btn btn-primary">Draw</button>
                    </div>

                    <div className="col-4">
                      <label className="form-switch">
                        <input type="checkbox" name="draw3" />
                        <i className="form-icon"></i> Draw 3
                      </label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
        );
    }
}
