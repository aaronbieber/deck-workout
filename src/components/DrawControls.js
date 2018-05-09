import React, { Component } from 'react';
import Switch from './Switch';

export default class DrawControls extends Component {
    render() {
        return (
            <div className="columns controls">
              <div className="column col-11 col-mx-auto">
                <form className="form-horizontal" action="#">
                  <div className="form-group">
                    <div className="col-4 col-ml-1">
                      <button onClick={ this.props.generate } className="btn">Regenerate</button>
                    </div>

                    <div className="col-3 col-ml-1">
                      <button onClick={ this.props.draw } className="btn btn-primary">Draw</button>
                    </div>

                    <div className="col-4">
                      <Switch name="draw3"
                              label="Draw 3" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
        );
    }
}
