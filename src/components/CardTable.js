import React, { Component } from 'react';

export default class CardTable extends Component {
    cardFile = (suit, num) => {

        if (this.props.draw.length === 0) {
            return '/cards/2x/back-navy.png';
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
        var src, idx;
        var images = [];

        if (cards.length === 0) {
            return [this.cardImageTag('/cards/2x/back-navy.png')];
        }

        for (var i=1; i<=this.props.drawCount; i++) {
            idx = cards.length - i;
            src = this.cardFile(cards[idx][0], cards[idx][1]);
            images.unshift(
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
        console.log(this.props.draw);

        var cardTableClass = "drawn-cards";
        if (this.props.drawCount === 1) {
            cardTableClass += " draw-one";
        }

        return (
            <div className={ cardTableClass }>
              {this.cardImages(this.props.draw)}
            </div>
        );
    };
}
