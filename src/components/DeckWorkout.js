import React, { Component } from 'react';
import Card from './Card';
import data from '../data/exercises';

export default class DeckWorkout extends Component {
    render() {
        var suits = ["hearts", "diamonds", "clubs", "spades"];
        var exercises = {
            "hearts": data["upper"][Math.floor(Math.random() * data["upper"].length)],
            "diamonds": data["lower"][Math.floor(Math.random() * data["lower"].length)],
            "clubs": data["core"][Math.floor(Math.random() * data["core"].length)],
            "spades": data["core"][Math.floor(Math.random() * data["core"].length)]
        };

        return (
            <div>
              {suits.map(suit => {
                  var e = exercises[suit];
                  return <Card suit={ suit } exercise={ e }/>
              })}
            </div>
        );
    }
}
