import debounce from 'lodash/debounce'
import { share } from '../actions'
import { useDispatch, useSelector } from 'react-redux'

const DoneCard = (props) => {
  const dispatch = useDispatch()
  const time = useSelector((state) => state.timer.time)

  const getTimeString = () => {
    return time[0] +
      ':' +
      time[1] +
      ':' +
      time[2]
  }

  return (
    <div className="card-done">
      <span>{getTimeString()}</span>
      <img
        alt="Done!"
        src="/done.webp" />
      <button onClick={() => dispatch(share(getTimeString()))}>Share <span className="material-icons">share</span></button>
    </div>
  )
}

export default DoneCard