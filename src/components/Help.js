import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavBar from '../components/NavBar'

class Help extends Component {
    render() {
        return (
            <div>
              <NavBar />
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
