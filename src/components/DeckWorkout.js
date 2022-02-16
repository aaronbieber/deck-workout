import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { setSeed } from '../actions/index.js'
import NavBar from '../components/NavBar'
import VisibleProgressBar from '../containers/VisibleProgressBar'
import VisibleCardTable from '../containers/VisibleCardTable'
import VisibleTimer from '../containers/VisibleTimer'
import VisibleCards from '../containers/VisibleCards'
import VisibleToast from '../containers/VisibleToast'

const DeckWorkout = (props) => {
    const stateSeed = useSelector((state) => state.workout.seed)
    const { seed } = useParams()
    const exercises = useSelector((state) => state.workout.exercises)
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        if (seed === undefined) {
            dispatch(setSeed(stateSeed))
            history.replace('/' + stateSeed)
        } else if (seed !== stateSeed) {
            dispatch(setSeed(seed))
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
