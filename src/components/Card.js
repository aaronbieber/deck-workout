import React, { Component } from 'react';

export default class Card extends Component {
    render() {
        var suitSymbols = {
            "hearts": {
                "symbol": "♥",
                "color": "red"
            },
            "diamonds": {
                "symbol": "♦",
                "color": "red"
            },
            "clubs": {
                "symbol": "♣",
                "color": "black"
            },
            "spades": {
                "symbol": "♠",
                "color": "black"
            }
        };

        var suitSymbol = suitSymbols[this.props.suit]["symbol"];
        var suitColor  = suitSymbols[this.props.suit]["color"];
        var suitClass  = "col-2 suit-" + suitColor;

        return (
            <div className="columns">
              <div className="col-3" />
              <div className={ suitClass }>{ suitSymbol }</div>
              <div className="col-4">{ this.props.exercise }</div>
              <div className="col-3" />
            </div>
        );
    }
}
