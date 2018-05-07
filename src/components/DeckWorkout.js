import React, { Component } from 'react';
import Card from './Card';

export default class DeckWorkout extends Component {
    render() {
        console.log(this.props.exercises);
        var id = 0;

        return (
            <div>
              {Object.keys(this.props.exercises).map(suit => {
                  var e = this.props.exercises[suit];
                  id++;
                  return <Card key={ id } suit={ suit } exercise={ e }/>
              })}
            </div>
        );
    }
}
