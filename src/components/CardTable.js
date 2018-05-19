import React, { Component } from 'react';

export default class CardTable extends Component {
    cardFile = (suit, num) => {
        var numToName = {
            14: '1',
            11: 'jack',
            12: 'queen',
            13: 'king'
        };

        var suitToSuit = {
            hearts: 'heart',
            diamonds: 'diamond',
            clubs: 'club',
            spades: 'spade'
        };

        if (num in numToName) {
            num = numToName[num];
        }

        return '/cards/1x/' + num + '_' + suitToSuit[suit] + '.png';
    }

    render() {
        if (this.props.cards.length) {
            console.log(this.props.cards);

            var cards = this.props.cards;
            var images = [];
            var fn;
            for (var i=0; i<cards.length; i++) {
                fn = this.cardFile(cards[i][0], cards[i][1]);
                images.push(
                    <img key={ fn } src={ fn } alt="playing card" />
                );
            }

            return (
                <div className="drawn-cards">
                  {images}
                </div>
            );
        }

        return null;
    };
}
