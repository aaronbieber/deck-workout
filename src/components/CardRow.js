import { useDispatch, useSelector } from 'react-redux';
import { customizeSuit } from '../actions';

const CardRow = (props) => {
  const dispatch = useDispatch()
  const customizingSuit = useSelector((state) => state.app.customizingSuit)

  const suitSymbols = {
    "hearts": {
      "symbol": "♥",
      "color": "red"
    },
    "diamonds": {
      "symbol": "♦",
      "color": "red"
    },
    "clubs": {
      "symbol": "♣",
      "color": "black"
    },
    "spades": {
      "symbol": "♠",
      "color": "black"
    }
  };

  var suitSymbol = suitSymbols[props.suit]["symbol"];
  var suitColor = suitSymbols[props.suit]["color"];
  var suitClass = "suit-" + suitColor;
  var classes = "material-icons" + (props.suit === customizingSuit ? " edit" : "");

  return (
    <div className="columns">
      <div className="playing-card column col-4 col-md-12 col-mx-auto">
        {props.edit
          ? <i className={classes} onClick={() => dispatch(customizeSuit(props.suit))}>edit</i>
          : null
        }
        <span className={suitClass}>{suitSymbol}</span> {props.exercise}
      </div>
    </div>
  )
}

export default CardRow