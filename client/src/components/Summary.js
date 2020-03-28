import React, { Component } from 'react';
import suitSymbols from '../data/suitSymbols'

export default class Summary extends Component {
  render() {
    if (!this.props.done) {
      return ''
    } else {
      var runs = this.props.stats.runs
      var jokers = this.props.stats.jokers

      return (
        <div className="summary-wrap">
          <h3>Longest runs</h3>
          <div>
            {Object.keys(runs).map(k => {
              return (
                <div key={k}>
                  <span className={"suit suit-"+suitSymbols[k]["color"]}>{suitSymbols[k]["symbol"]}</span>
                  <span>{runs[k]}</span>
                </div>
              )
            })}
          </div>

          <h3>Jokers</h3>
          <div>Black joker, {jokers['black_joker']}</div>
          <div>Red joker, {jokers['red_joker']}</div>
        </div>
      )
    }
  }
}
