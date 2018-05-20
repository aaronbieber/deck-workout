import React, { Component } from 'react';

export default class CardTable extends Component {
    cardFile = (suit, num) => {

        if (this.props.draw.length === 0) {
            return '/cards/2x/back-navy.png';
        }

        if (suit.indexOf("joker") > -1) {
            return '/cards/2x/' + suit + '.png';
        }

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

        return '/cards/2x/' + num + '_' + suitToSuit[suit] + '.png';
    }

    cardImageTag = (src) => {
        return <img onClick={ this._drawClick } key={ src } src={ src } alt="playing card" />
    }

    cardImages = (cards) => {
        var suit, num, src;
        var images = [];

        if (cards.length === 0) {
            return [this.cardImageTag('/cards/2x/back-navy.png')];
        }

        // If the first card in the draw is a joker, we
        // display the last card of the previous draw for
        // reference.
        if (cards[0][0].indexOf('joker') > -1) {
            cards.unshift(this.props.discard[this.props.discard.length-1]);
        }

        for (var i=0; i<this.props.draw.length; i++) {
            suit = cards[i][0]
            num = cards[i][1]

            src = this.cardFile(suit, num);
            images.push(
                <img onClick={ this._drawClick } key={ src } src={ src } alt="playing card" />
            );
        }

        return images;
    }

    _drawClick = (e) => {
        if (this.props.deck.length > 0) {
            this.props.drawClick();
        }
    }

    render() {
        var cardTableClass = "drawn-cards",
            cardImages = this.cardImages(this.props.draw);

        if (this.props.drawCount === 1) {
            cardTableClass += " draw-one";
        }

        if (cardImages.length === 4) {
            cardTableClass += " first-joker";
        }

        return (
            <div className={ cardTableClass }>
              {cardImages}
            </div>
        );
    };
}
