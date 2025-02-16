import { configureStore } from '@reduxjs/toolkit'
import notesReducer from './redux/noteSlice'

export const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
})