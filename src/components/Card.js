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
        var suitClass  = "suit-" + suitColor;

        return (
            <div>
              <div className={ suitClass }>{ suitSymbol }</div>
              <div>{ this.props.exercise }</div>
            </div>
        );
    }
}
