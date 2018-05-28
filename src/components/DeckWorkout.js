import React, { Component } from 'react'
import CardRow from './CardRow'
import NavBar from './NavBar'
import VisibleDrawControls from '../containers/VisibleDrawControls'
import VisibleProgressBar from '../containers/VisibleProgressBar'
import VisibleCardTable from '../containers/VisibleCardTable'
import VisibleTimer from '../containers/VisibleTimer'

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

              <VisibleProgressBar />
              <VisibleTimer />
              <VisibleDrawControls />
              <VisibleCardTable />
            </div>
        );
    }
}
