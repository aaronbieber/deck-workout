import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import VisibleProgressBar from '../containers/VisibleProgressBar'
import VisibleCardTable from '../containers/VisibleCardTable'
import VisibleTimer from '../containers/VisibleTimer'
import VisibleCards from '../containers/VisibleCards'
import VisibleSummary from '../containers/VisibleSummary'

export default class DeckWorkout extends Component {
    render() {
        return (
            <div>
              <NavBar />
              <VisibleCards exercises={ this.props.exercises }/>
              <VisibleProgressBar />
              <VisibleTimer />
              <VisibleCardTable />
              <VisibleSummary />
            </div>
        );
    }
}
