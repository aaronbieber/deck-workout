import { useSelector } from "react-redux";

const ProgressBar = (props) => {
  const drawCount = useSelector((state) => state.workout.drawCount)
  const allCards = useSelector((state) => state.workout.deck)
  const draw = useSelector((state) => state.workout.draw)
  const discard = useSelector((state) => state.workout.discard)

  const totalReps = (cards, start = 0, end = cards.length - 1) => {
    var reps = 0;
    for (var i = start; i <= end; i++) {
      reps += cards[i][1]

      if (cards[i][0].indexOf("joker") > -1) {
        reps += cards[i + 1][1]
      }
    }

    return reps
  }

  var drawnProgressSegment,
    widthDrawn,
    pctDrawn = 0

  var allReps = totalReps(allCards)
  var justDiscardedStartIndex = allCards.length - discard.length

  if (justDiscardedStartIndex > 1 && draw.length > 0) {
    pctDrawn = Math.round((totalReps(allCards,
      justDiscardedStartIndex - drawCount,
      justDiscardedStartIndex - 1) / allReps) * 100)
    widthDrawn = pctDrawn + '%'
    drawnProgressSegment = <div className="progress-progress progress-next" style={{ width: widthDrawn }} />
  }

  if (discard.length) {
    var pctPrevCompleted = 0
    var pctJustCompleted = Math.round((totalReps(allCards,
      justDiscardedStartIndex,
      justDiscardedStartIndex + drawCount - 1) / allReps) * 100)

    // After the first discard, there is no "previous"
    // discard, only the "just" discarded, so we'll go out of
    // bounds if we try to do this; wait till the third draw
    if (discard.length > drawCount) {
      pctPrevCompleted = Math.round((totalReps(allCards,
        justDiscardedStartIndex + drawCount,
        allCards.length - 1
      ) / allReps) * 100)
    }

    // If you're drawing one card at a time, any value less
    // than 6 or 7 rounds to 0%, so just make it 1% so the
    // progress bar slice is visible
    if (pctJustCompleted === 0) {
      pctJustCompleted = 1
    }

    if (pctDrawn === 0) {
      pctDrawn = 1
    }

    // The rounding makes it possible to exceed 100, but CSS
    // doesn't like that
    if (pctJustCompleted + pctPrevCompleted + pctDrawn > 100) {
      pctJustCompleted = 100 - (pctPrevCompleted + pctDrawn)
      pctDrawn = 100 - (pctJustCompleted + pctPrevCompleted)
    }

    if (justDiscardedStartIndex === 1) {
      pctPrevCompleted = 100
      pctJustCompleted = 0
      pctDrawn = 0
    }

    var widthJustCompleted = pctJustCompleted + '%'
    var widthPrevCompleted = pctPrevCompleted + '%'
  }

  return (
    <div className="progress-bar">
      <div className="progress-progress" style={{ width: widthPrevCompleted }} />
      <div className="progress-progress progress-last" style={{ width: widthJustCompleted }} />
      {drawnProgressSegment}
    </div>
  )
}

export default ProgressBar