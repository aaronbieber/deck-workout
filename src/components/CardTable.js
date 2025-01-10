import { useEffect, useState } from 'react'
import { cloneObject } from '../utils'
import DoneCard from './DoneCard'
import debounce from 'lodash/debounce'
import { useDispatch, useSelector } from 'react-redux'
import { draw as drawAction } from '../reducers/workout'
import { timerStart, timerStop } from '../reducers/timer'

const CardTable = (props) => {
  const dispatch = useDispatch()
  const drawCount = useSelector((state) => state.workout.drawCount)
  const draw = useSelector((state) => state.workout.draw)
  const drawIndex = useSelector((state) => state.workout.drawIndex)
  const deck = useSelector((state) => state.workout.deck)
  const discard = useSelector((state) => state.workout.discard)

  // Local component state tracks image preload status,
  // just so we don't try to preload multiple times.
  const [imagesLoaded, setImagesLoaded] = useState(false)

  useEffect(() => {
    if (deck.length > 0 && !imagesLoaded) {
      for (const card of deck) {
        if (card[0] === 'done') continue
        new Image().src = cardFile(card[0], card[1])
      }
      setImagesLoaded(true)
    }
  }, [deck])

  const cardFile = (suit, num) => {
    if (suit.indexOf("joker") > -1) {
      return '/cards/2x/' + suit + '.png'
    }

    var numToName = {
      14: '1',
      11: 'jack',
      12: 'queen',
      13: 'king'
    }

    var suitToSuit = {
      hearts: 'heart',
      diamonds: 'diamond',
      clubs: 'club',
      spades: 'spade'
    }

    if (num in numToName) {
      num = numToName[num]
    }

    return '/cards/2x/' + num + '_' + suitToSuit[suit] + '.png'
  }

  const cardImageTag = (src, className) => {
    return (
      <img onMouseUp={_drawClick}
        className={className}
        key={src}
        src={src}
        alt="playing card" />
    )
  }

  const generateCardImages = (draw) => {
    var suit, num, src
    var images = []
    var cards = cloneObject(draw)
    var imageClass = ''

    if (cards.length === 0) {
      return [cardImageTag('/cards/2x/back-navy.png')]
    }

    // If the first card in the draw is a joker, we
    // display the last card of the previous draw for
    // reference.
    if (cards[0][0].indexOf('joker') > -1) {
      cards.unshift(discard[drawCount - 1])
    }

    for (var i = 0; i < cards.length; i++) {
      if (cards[i][0] === "done") {
        images.push(<DoneCard key="card-done" />)
      } else {
        suit = cards[i][0]
        num = cards[i][1]
        src = cardFile(suit, num)

        images.push(cardImageTag(src, imageClass))
      }

    }

    return images
  }

  const _drawClick = debounce((e) => {
    if (drawIndex === null) {
      dispatch(timerStart())
    }

    if (drawIndex === 1) {
      dispatch(timerStop())
    }

    dispatch(drawAction())
  }, 200)

  var cardTableClass = "drawn-cards"
  const cardImages = generateCardImages(draw)

  if (drawCount === 1) {
    cardTableClass += " draw-one"
  }

  // Right now, this will only happen when a joker is drawn on a
  // draw-one, or drawn as the first of a draw-three, otherwise
  // the length of cardImages will always be 1 or 3.
  if (cardImages.length === 2 ||
    cardImages.length === 4) {
    cardTableClass += " first-joker"
  }

  return (
    <div className={cardTableClass}>
      {cardImages}
    </div>
  )
}

export default CardTable
