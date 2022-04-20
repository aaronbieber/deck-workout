import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { setSeed } from '../actions/index.js'
import NavBar from '../components/NavBar'
import VisibleProgressBar from '../containers/VisibleProgressBar'
import VisibleCardTable from '../containers/VisibleCardTable'
import VisibleTimer from '../containers/VisibleTimer'
import VisibleCards from '../containers/VisibleCards'
import VisibleToast from '../containers/VisibleToast'

const DeckWorkout = (props) => {
    const stateSeed = useSelector((state) => state.workout.seed)
    const location = useLocation()
    const exercises = useSelector((state) => state.workout.exercises)
    const history = useHistory()
    const dispatch = useDispatch()

    const getSeed = () => {
        var hash = location.hash
        if (/^#[a-zA-Z0-9]{10}/.test(hash)) {
            return hash.substring(1)
        }
        return false
    }

    useEffect(() => {
        if (getSeed() === false) {
            history.replace('/#' + stateSeed)
        } else if (getSeed() !== stateSeed) {
            dispatch(setSeed(getSeed()))
        }
    })

    return (
        <div>
          <NavBar home={true} />
          <VisibleCards exercises={ exercises }/>
          <VisibleProgressBar />
          <VisibleTimer />
          <VisibleCardTable />
          <VisibleToast/>
        </div>
    )
}

export default DeckWorkout
