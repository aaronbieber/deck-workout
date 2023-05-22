import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    customizingSuit: null
  },
  reducers: {
    customizeSuit: (state, action) => {
      state.customizingSuit = action.payload
    },
    customizeSuitEnd: (state) => {
      state.customizingSuit = null
    }
  }
})

export const { customizeSuit, customizeSuitEnd } = appSlice.actions
export default appSlice.reducer