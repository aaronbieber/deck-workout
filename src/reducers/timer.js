import { createSlice } from '@reduxjs/toolkit';

const pad = (n, z) => {
  var width = 2
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const computeTime = (start, now) => {
  if (start) {
    var delta = now - start

    if (delta > 0) {
      var remainder
      var hours = 0,
        minutes = 0,
        seconds = 0

      hours = Math.floor(delta / 3600)
      remainder = delta % 3600
      if (remainder > 0) {
        minutes = Math.floor(remainder / 60)
        remainder = remainder % 60
      }
      if (remainder > 0) {
        seconds = remainder
      }

      return [
        pad(hours),
        pad(minutes),
        pad(seconds)
      ]
    }
  }
  return ['00', '00', '00']
}

const now = () => {
  return Math.floor(new Date().getTime() / 1000)
}

const initialState = {
  start: null,
  running: false,
  time: ['00', '00', '00'],
  inc: 0
}

const timerSlice = createSlice({
  name: 'timer',
  initialState: initialState,
  reducers: {
    timerStart: (state) => {
      state.start = now()
      state.running = true
      state.inc = 0
    },

    timerRestart: (state) => {
      state.running = true
    },

    timerStop: (state) => {
      state.running = false
    },

    timerReset: (state) => {
      state.start = now()
      state.inc = 0
    },

    timerTick: (state) => {
      if (state.running === true && state.start !== now()) {
        state.time = computeTime(state.start, now())
        state.inc += 1
      }
    }
  }
})

export const { timerStart, timerRestart, timerStop, timerReset, timerTick } = timerSlice.actions
export default timerSlice.reducer