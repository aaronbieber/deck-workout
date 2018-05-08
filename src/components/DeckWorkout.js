import React, { Component } from 'react';
import CardRow from './CardRow';
import NavBar from './NavBar';
import DrawControls from './DrawControls';

export default class DeckWorkout extends Component {
    render() {
        return (
            <div>
              <NavBar />

              <div className="cards">
                {Object.keys(this.props.exercises).map(suit => {
                    var e = this.props.exercises[suit];
                    var key = 'card-' + suit;
                    return <CardRow key={ key } suit={ suit } exercise={ e }/>
                })}
              </div>

              <DrawControls />
            </div>
        );
    }
}
