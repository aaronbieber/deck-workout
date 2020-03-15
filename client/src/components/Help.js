import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavBar from '../components/NavBar'

class Help extends Component {
    render() {
        return (
            <div>
              <NavBar noUndo={ true } />

              <div className="padbox">
                <h3>What Is This?</h3>

                <p>
                  This app will help you do a classic Wednesday
                  Project workout using a deck of playing cards.  The
                  concept is simple: each suit represents an
                  exercise. As you draw cards from the deck, you
                  complete reps of that exercise equivalent to the
                  card's number.
                </p>

                <p>
                  For example, if hearts represents "push-ups," and
                  you draw a seven of hearts, complete seven push-ups.
                </p>

                <p>
                  Aces are high, so an ace is 14 reps.
                </p>

                <p>
                  There are two jokers in the deck. When you draw a
                  joker, it is suggested that you complete the
                  previous card's value worth of burpees. Feel free to
                  substitute burpees for whatever exercise is best for
                  you, but it helps if it's something hard.
                </p>

                <p>
                  A timer runs so that you can keep track of your
                  time. As you continue to draw cards, a progress bar
                  will show you how many reps you've completed in
                  yellow, the reps you completed in the last draw in
                  green, and the reps you're about to complete in a
                  green outline.
                </p>

                <p>
                  Tap the settings gear icon in the top right to
                  randomize all exercises and reshuffle the deck,
                  choose whether to draw one or three cards each time,
                  and customize the exercises manually if you wish.
                </p>
              </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Help)
