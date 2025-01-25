import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface ExperienceItem {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  location: string
  description: string[]
}

const initialState: ExperienceItem[] = []

const experienceSlice = createSlice({
  name: "experience",
  initialState,
  reducers: {
    addExperience: (state, action: PayloadAction<ExperienceItem>) => {
      state.push(action.payload)
    },
    updateExperience: (state, action: PayloadAction<ExperienceItem>) => {
      const index = state.findIndex((item) => item.id === action.payload.id)
      if (index !== -1) {
        state[index] = action.payload
      }
    },
    removeExperience: (state, action: PayloadAction<string>) => {
      return state.filter((item) => item.id !== action.payload)
    },
  },
})

export const { addExperience, updateExperience, removeExperience } = experienceSlice.actions
export default experienceSlice.reducer
