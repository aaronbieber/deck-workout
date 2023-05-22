import { createSlice, current } from '@reduxjs/toolkit'
import data from '../data/exercises'
import { cloneObject } from '../utils'
import seedrandom from 'seedrandom'
import { customizeSuitEnd } from './app'
const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

const getAllExercises = () => {
  var allExercises = []
  for (const group of Object.keys(data)) {
    allExercises = [...allExercises, ...data[group]["exercises"].map(e => e.name)]
  }
  return allExercises
}

const encodeExercise = (exercise) => {
  return chars.charAt(getAllExercises().indexOf(exercise))
}

const generateSeed = (exercises) => {
  var str =
    encodeExercise(exercises.hearts) +
    encodeExercise(exercises.diamonds) +
    encodeExercise(exercises.clubs) +
    encodeExercise(exercises.spades)

  for (let i = 0; i < 6; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return str
}

const seedWithExercises = (seed, exercises) => {
  return encodeExercise(exercises.hearts) +
    encodeExercise(exercises.diamonds) +
    encodeExercise(exercises.clubs) +
    encodeExercise(exercises.spades) +
    seed.substring(4)
}

const decodeExercise = (key) => {
  return getAllExercises()[chars.indexOf(key)]
}

const randomExercise = (group) => {
  if (group === "") {
    var allExercises = getAllExercises()
    return allExercises[Math.floor(Math.random() * allExercises.length)]
  }

  return data[group]["exercises"][Math.floor(Math.random() * data[group]["exercises"].length)]["name"]
}

const getRandomExercises = () => {
  return {
    hearts: randomExercise("upper"),
    diamonds: randomExercise("lower"),
    clubs: randomExercise("core"),
    spades: randomExercise("")
  }
}

const buildDeck = () => {
  var deck = [];
  ['hearts', 'diamonds', 'clubs', 'spades'].forEach(suit => {
    for (var i = 2; i <= 14; i++) {
      deck.push([suit, i]);
    }
  });

  deck.push(['red_joker', 0]);
  deck.push(['black_joker', 0]);

  return deck;
}

const generateSeededDeck = (hash) => {
  var seed = hash.substring(4)
  var rando = seedrandom(seed + '\0')

  // Reshuffle until we get a deck that doesn't begin with a joker
  do {
    var sortedDeck = buildDeck();
    var shuffledDeck = [];

    // Shuffle deck
    while (sortedDeck.length > 0) {
      shuffledDeck.push(
        sortedDeck.splice(Math.floor(rando() * sortedDeck.length), 1)[0]
      )
    }
  } while (shuffledDeck[shuffledDeck.length - 1][0] === 'red_joker'
    || shuffledDeck[shuffledDeck.length - 1][0] === 'black_joker')

  shuffledDeck.unshift(["done", 0])

  return shuffledDeck
}

const buildCardPiles = (state) => {
  if (state["drawIndex"] !== null) {
    if (state["drawIndex"] === 0) {
      state["draw"] = state["deck"].slice(0, 1)
      state["discard"] = state["deck"].slice(1)
    } else {
      state["draw"] = state["deck"].slice(state["drawIndex"],
        state["drawIndex"] + state["drawCount"]).reverse()
      state["discard"] = state["deck"].slice(state["drawIndex"] + state["drawCount"])
    }
  } else {
    state["draw"] = []
    state["discard"] = []
  }

  return state
}

export const changeSuitExerciseAndEnd = (suit, exercise) => {
  return dispatch => {
    dispatch(changeSuitExercise({ suit, exercise }))
    dispatch(customizeSuitEnd())
  }
}

const initialExercises = getRandomExercises()
const initialState = {
  drawCount: 3,
  exercises: initialExercises,
  deck: [],
  drawIndex: null,
  discardIndex: null,
  draw: [],
  discard: [],
  toast: false,
  seed: generateSeed(initialExercises)
};

const workoutSlice = createSlice({
  name: 'workout',
  initialState: initialState,
  reducers: {
    setSeed: (state, action) => {
      const seed = action.payload

      state.exercises = {
        hearts: decodeExercise(seed[0]),
        diamonds: decodeExercise(seed[1]),
        clubs: decodeExercise(seed[2]),
        spades: decodeExercise(seed[3])
      }
      state.seed = seed
      state.deck = generateSeededDeck(seed)
    },

    randomize: (state) => {
      state.exercises = getRandomExercises()
      state.seed = seedWithExercises(state.seed, state.exercises)
    },

    generate: (state) => {
      state.deck = generateSeededDeck(state.seed)
    },

    draw: (state) => {
      if (state["drawIndex"] === null) {
        state["drawIndex"] = state["deck"].length - state["drawCount"]
      } else {
        state["drawIndex"] = Math.max(state["drawIndex"] - state["drawCount"], 0)
      }

      const newState = buildCardPiles(state)
      state.draw = newState.draw
    },

    share: (state, action) => {
      var shareString = "WEDNESDAY PROJECT\n" +
        "🏆 " + action.payload + " 🏆\n\n" +
        "♥ " + state.exercises.hearts + "\n" +
        "♦ " + state.exercises.diamonds + "\n" +
        "♣ " + state.exercises.clubs + "\n" +
        "♠ " + state.exercises.spades + "\n\n" +
        "deck.aaronbieber.com/#" + state.seed

      navigator.clipboard.writeText(shareString)
      state.toast = true
    },

    toggleDrawThree: (state) => {
      state.drawCount = (state.drawCount === 1) ? 3 : 1

      // If the draw count is changed from one to three with fewer than three
      // cards discarded, we'll attempt to read beyond the end of the deck array,
      // so just move the draw index exactly three cards from the end.
      if (state.drawCount === 3 && state.drawIndex > state.deck.length - state.drawCount) {
        state.drawIndex = state.deck.length - state.drawCount
      }
      const cardPiles = buildCardPiles(state)
      state.draw = cardPiles.draw
      state.discard = cardPiles.discard
    },

    undo: (state) => {
      if (state["drawIndex"] >= state["deck"].length - state["drawCount"]) {
        state["drawIndex"] = null
      } else if (state["drawIndex"] === 0) {
        state["drawIndex"] = 1
      } else {
        state["drawIndex"] = Math.min(state["drawIndex"] + state["drawCount"],
          state["deck"].length - state["drawCount"])
      }

      state = buildCardPiles(state)
    },

    changeSuitExercise: (state, action) => {
      const { suit, exercise } = action.payload
      state.exercises[suit] = exercise
      state.seed = seedWithExercises(state.seed, current(state.exercises))
    }
  }
})

export const {
  setSeed,
  randomize,
  generate,
  draw,
  share,
  toggleDrawThree,
  undo,
  changeSuitExercise
} = workoutSlice.actions

export default workoutSlice.reducer