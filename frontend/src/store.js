import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {},
})

      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes