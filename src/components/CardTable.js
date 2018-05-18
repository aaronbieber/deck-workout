import React, { Component } from 'react';

export default class CardTable extends Component {
    render() {
        if (this.props.cards.length) {
            console.log(this.props.cards);
            var card = this.props.cards[this.props.cards.length-1];
            return (
                <div>
                  <span>{ card[1] }</span>
                  <span style={{ fontWeight: 'bold' }}>{ card[0] }</span>
                </div>
            );
        }

        return null;
    };
}
