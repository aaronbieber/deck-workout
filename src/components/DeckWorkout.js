import React, { Component } from 'react';
import Card from './Card';

export default class DeckWorkout extends Component {
    render() {
        return (
            <Card suit="hearts" exercise="Whatever" />
        );
    }
}
