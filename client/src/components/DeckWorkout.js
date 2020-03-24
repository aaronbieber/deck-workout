import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import NavBar from '../components/NavBar'
import VisibleProgressBar from '../containers/VisibleProgressBar'
import VisibleCardTable from '../containers/VisibleCardTable'
import VisibleTimer from '../containers/VisibleTimer'
import VisibleCards from '../containers/VisibleCards'
import VisibleSummary from '../containers/VisibleSummary'

export default class DeckWorkout extends Component {
  componentDidMount = () => {
    if ('workoutId' in this.props.match.params) {
      this.props.load(this.props.match.params.workoutId)
    }
  }

  render() {
    var saved = this.props.saved

    if (!('workoutId' in this.props.match.params) && saved) {
      console.log('this is a saved workout')
      return (<Redirect to={"/w/" + this.props.saved} />)
    }

    return (
      <div>
        <NavBar noUndo={ saved } />
        <VisibleCards exercises={ this.props.exercises }/>
        <VisibleProgressBar />
        <VisibleTimer />
        <VisibleCardTable />
        <VisibleSummary />
      </div>
    );
  }
}
