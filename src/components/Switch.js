import { useDispatch, useSelector } from "react-redux";
import { toggleDrawThree } from "../reducers/workout";

const Switch = (props) => {
  const dispatch = useDispatch()
  const drawCount = useSelector((state) => state.workout.drawCount)

  return (
    <label
      className="form-switch">
      <input type="checkbox"
        onClick={() => dispatch(toggleDrawThree())}
        name={props.name}
        readOnly={true}
        checked={drawCount === 3} />
      <i className="form-icon"></i> {props.label}
    </label>
  );
}

export default Switch