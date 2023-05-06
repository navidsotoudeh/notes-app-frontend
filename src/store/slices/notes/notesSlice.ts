import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState } from '@/store/store'

const notesSlice = createSlice({
  name: 'notes',
  initialState: { allNotes: null },
  reducers: {
    setAllNotes: (state: any, action) => {
      state.allNotes = action.payload
    },
  },
})

export const { setAllNotes } = notesSlice.actions

export const selectAllNotes = (state: AppState) => state.notes.allNotes

export default notesSlice.reducer
