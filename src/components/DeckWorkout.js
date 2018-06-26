import React, { Component } from 'react'
import CardRow from './CardRow'
import VisibleNavBar from '../containers/VisibleNavBar'
import VisibleDrawControls from '../containers/VisibleDrawControls'
import VisibleProgressBar from '../containers/VisibleProgressBar'
import VisibleCardTable from '../containers/VisibleCardTable'
import VisibleTimer from '../containers/VisibleTimer'
import VisibleCards from '../containers/VisibleCards'

export default class DeckWorkout extends Component {
    render() {
        return (
            <div>
              <VisibleNavBar />
              <VisibleCards exercises={ this.props.exercises }/>
              <VisibleProgressBar />
              <VisibleTimer />
              <VisibleDrawControls />
              <VisibleCardTable />
            </div>
        );
    }
}
