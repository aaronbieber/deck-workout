import { useDispatch, useSelector } from "react-redux"
import { timerTick } from "../actions"
import { useEffect, useRef } from "react"

const Timer = (props) => {
  const dispatch = useDispatch()
  const running = useSelector((state) => state.timer.running)
  const time = useSelector((state) => state.timer.time)
  var frameId = useRef(0)

  const tick = () => {
    dispatch(timerTick())
    frameId = requestAnimationFrame(() => tick())
  }

  useEffect(() => {
    tick()
    return () => { 
      cancelAnimationFrame(frameId) 
    }
  }, [])

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