import { useDispatch, useSelector } from "react-redux"
import { timerRestart, timerStop, timerTick } from "../reducers/timer"
import { useEffect, useRef } from "react"

const Timer = (props) => {
  const dispatch = useDispatch()
  const running = useSelector((state) => state.timer.running)
  const time = useSelector((state) => state.timer.time)
  const drawIndex = useSelector((state) => state.workout.drawIndex)
  var frameId = useRef(0)

  const tick = () => {
    dispatch(timerTick())
    frameId = requestAnimationFrame(() => tick())
  }

  useEffect(() => {
    if (running) {
      tick()
    } else {
      cancelAnimationFrame(frameId)
    }
  }, [running])

  useEffect(() => {
    // Stop the timer on the initial (un-drawn) card and the done card.
    if (drawIndex === null || drawIndex === 0) {
      dispatch(timerStop())
    } else if (!running) {
      dispatch(timerRestart())
    }
  }, [drawIndex])

  if (running) {
    return (
      <div className="timer">
        <span>{time[0]}</span>:<span>{time[1]}</span>:<span>{time[2]}</span>
      </div>
    )
  }

  return null
}

export default Timer