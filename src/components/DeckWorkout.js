import React, { Component } from 'react'
import VisibleNavBar from '../containers/VisibleNavBar'
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
              <VisibleCardTable />
            </div>
        );
    }
}
