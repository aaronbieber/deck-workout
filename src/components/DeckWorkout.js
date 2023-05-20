import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { setSeed } from '../actions/index.js'
import NavBar from '../components/NavBar'
import ProgressBar from '../components/ProgressBar'
import CardTable from '../components/CardTable'
import Timer from './Timer'
import Cards from './Cards'
import VisibleToast from '../containers/VisibleToast'

const DeckWorkout = (props) => {
    const stateSeed = useSelector((state) => state.workout.seed)
    const exercises = useSelector((state) => state.workout.exercises)
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        var hash = window.location.hash
        var seed = /^#[a-zA-Z0-9]{10}/.test(hash) ? hash.substring(1) : false

        if (seed === false) {
            history.replace('/#' + stateSeed)
        } else if (seed !== stateSeed) {
            dispatch(setSeed(seed))
        }
    }, [window.location.hash])

    return (
        <div>
          <NavBar home={true} />
          <Cards exercises={ exercises }/>
          <ProgressBar />
          <Timer />
          <CardTable />
          <VisibleToast/>
        </div>
    )
}

export default DeckWorkout
