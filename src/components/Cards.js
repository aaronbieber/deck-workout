import React, { Component } from "react"
import CardRow from "./CardRow";

export default class Cards extends Component {
    render() {
        return (
            <div className="cards">
              {Object.keys(this.props.exercises).map(suit => {
                  var e = this.props.exercises[suit];
                  var key = 'card-' + suit;
                  return <CardRow key={ key } suit={ suit } exercise={ e } edit={ this.props.edit } />
              })}
            </div>
        )
    }
}
