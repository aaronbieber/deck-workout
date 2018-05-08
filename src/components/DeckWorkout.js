import React, { Component } from 'react';
import Card from './Card';
import NavBar from './NavBar';

export default class DeckWorkout extends Component {
    render() {
        return (
            <div>
              <NavBar />

              <div className="cards">
                {Object.keys(this.props.exercises).map(suit => {
                    var e = this.props.exercises[suit];
                    var key = 'card-' + suit;
                    return <Card key={ key } suit={ suit } exercise={ e }/>
                })}
              </div>
            </div>
        );
    }
}
