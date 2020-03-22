import * as types from '../actions/actionTypes'
import data from '../data/exercises'
import { cloneObject } from '../utils'

const initialState = {
  drawCount: 3,
  exercises: {
    hearts: '...',
    diamonds: '...',
    clubs: '...',
    spades: '...'
  },
  deck: [],
  drawIndex: null,
  discardIndex: null,
  draw: [],
  discard: [],
  done: false,
  stats: {
    runs: {
      hearts: 0,
      diamonds: 0,
      clubs: 0,
      spades: 0
    },
    jokers: {
      red_joker: 0,
      black_joker: 0
    }
  }
};

// This will come in handy when we support the UI to choose a fast workout
// const filterExercises = (data, fast) => {
//     return data.filter(ex => ex.fast == fast)
// }

// FOR DEBUG PURPOSES
const drawAll = (state) => {
  var newState = cloneObject(state)

  newState["drawIndex"] = 0
  newState = buildCardPiles(newState)

  return newState
}

const buildDeck = () => {
  var deck = [];
  ['hearts', 'diamonds', 'clubs', 'spades'].forEach(suit => {
    for (var i=2; i<=14; i++) {
      deck.push([suit, i]);
    }
  });

  deck.push(['red_joker', 0]);
  deck.push(['black_joker', 0]);

  return deck;
}

const spliceExercise = exercises => {
  return exercises.splice(Math.floor(Math.random() * exercises.length), 1)[0];
}

const longestRuns = (exercises, deck) => {
  if (deck.length < 1) return {}

  var runs = {}
  var suits = Object.keys(exercises)
  for (let i=0; i<suits.length; i++) {
    var suit = suits[i]
    runs[suit] = [0]
  }

  var currentSuit = deck[1][0]
  for (let i=1; i<deck.length; i++) {
    var card = deck[i]
    if (card[0] === 'red_joker' || card[0] === 'black_joker') {
      continue
    }

    if (card[0] !== 'done' && card[0] === currentSuit) {
      runs[card[0]][runs[card[0]].length-1] += card[1]
    } else {
      runs[card[0]].push(card[1])
    }
    currentSuit = card[0]
  }

  for (let k in runs) {
    runs[k] = runs[k].sort((a,b) => a-b)
    runs[k] = runs[k][runs[k].length-1]
  }

  return runs
}

const jokerValues = (deck) => {
  var jokers = {}
  for (let i=0; i<deck.length-1; i++) {
    var card = deck[i]
    if (card[0] === 'red_joker' || card[0] === 'black_joker') {
      jokers[card[0]] = deck[i+1][1]
    }
  }

  return jokers
}

const generate = (state) => {
  var groups = Object.keys(data);
  var randGroup = groups[Math.floor(Math.random() * groups.length)];
  var localData = {};

  localData = cloneObject(data)

  var newExercises = {
    hearts:   spliceExercise(localData["upper"]["exercises"])["name"],
    diamonds: spliceExercise(localData["lower"]["exercises"])["name"],
    clubs:    spliceExercise(localData["core"]["exercises"])["name"],
    spades:   spliceExercise(localData[randGroup]["exercises"])["name"]
  };

  // Reshuffle until we get a deck that doesn't begin with a joker
  do {
    var sortedDeck = buildDeck();
    var shuffledDeck = [];

    // Shuffle deck
    while (sortedDeck.length > 0) {
      shuffledDeck.push(
        sortedDeck.splice(Math.floor(Math.random() * sortedDeck.length), 1)[0]
      )
    }
  } while (   shuffledDeck[shuffledDeck.length-1][0] === 'red_joker'
              || shuffledDeck[shuffledDeck.length-1][0] === 'black_joker')

  shuffledDeck.unshift(["done", 0])

  return Object.assign({}, state, {
    exercises: newExercises,
    deck: shuffledDeck,
    draw: [],
    drawIndex: null,
    discardIndex: null,
    discard: [],
    stats: {
      runs: longestRuns(state.exercises, shuffledDeck),
      jokers: jokerValues(shuffledDeck)
    }
  });
}

const buildCardPiles = (state) => {
  if (state["drawIndex"] !== null) {
    if (state["drawIndex"] === 0) {
      state["draw"] = state["deck"].slice(0,1)
      state["discard"] = state["deck"].slice(1)
    } else {
      state["draw"] = state["deck"].slice(state["drawIndex"],
                                          state["drawIndex"] + state["drawCount"])
      state["discard"] = state["deck"].slice(state["drawIndex"] + state["drawCount"])
    }
  } else {
    state["draw"] = []
    state["discard"] = []
  }

  state["done"] = (state.deck.length > 0 &&
                   state.drawIndex !== null &&
                   state.deck[state.drawIndex][0] === "done")

  return state
}

const draw = (state, drawCountPref) => {
  var newState = cloneObject(state);

  if (state["drawIndex"] === null) {
    newState["drawIndex"] = state["deck"].length - state["drawCount"]
  } else {
    newState["drawIndex"] = Math.max(state["drawIndex"] - state["drawCount"], 0)
  }

  newState = buildCardPiles(newState)
  return newState;
}

const undo = (state) => {
  var newState = cloneObject(state);

  if(state["drawIndex"] >= state["deck"].length - state["drawCount"]) {
    newState["drawIndex"] = null
  } else if(state["drawIndex"] === 0) {
    // The very end of the deck
    newState["drawIndex"] = 1
  } else {
    newState["drawIndex"] = Math.min(state["drawIndex"] + state["drawCount"],
                                     state["deck"].length - state["drawCount"])
  }

  newState = buildCardPiles(newState)
  return newState
}

const drawThree = (state) => {
  var newState = cloneObject(state)
  newState.drawCount = (newState.drawCount === 1) ? 3 : 1
  newState = buildCardPiles(newState)
  return newState;
}

const setSuitExercise = (state, suit, exercise) => {
  var newState = cloneObject(state)
  newState.exercises[suit] = exercise
  return newState
}

export default function workout(state = initialState, action) {
  switch (action.type) {
  case types.GENERATE:
    return generate(state);

  case types.DRAW:
    return draw(state, state.drawCount);

  case types.TOGGLE_DRAW_THREE:
    return drawThree(state);

  case types.UNDO:
    return undo(state);

  case types.CHANGE_SUIT_EXERCISE:
    return setSuitExercise(state, action.suit, action.exercise);

  case 'DRAW_ALL':
    return drawAll(state)

  default:
    return state;
  }
}
