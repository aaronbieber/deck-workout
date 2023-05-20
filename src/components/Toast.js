import { useSelector } from "react-redux"

const Toast = (props) => {
  const toast = useSelector((state) => state.workout.toast)

  var toastClass = toast ? 'toast-on' : 'toast-off'
  return <div id="toast" className={toastClass}>Copied to clipboard!</div>
}

export default Toast