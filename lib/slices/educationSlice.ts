import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface EducationItem {
  id: string
  institution: string
  degree: string
  fieldOfStudy: string
  startDate: string
  endDate: string
  location: string
}

const initialState: EducationItem[] = []

const educationSlice = createSlice({
  name: "education",
  initialState,
  reducers: {
    addEducation: (state, action: PayloadAction<EducationItem>) => {
      state.push(action.payload)
    },
    updateEducation: (state, action: PayloadAction<EducationItem>) => {
      const index = state.findIndex((item) => item.id === action.payload.id)
      if (index !== -1) {
        state[index] = action.payload
      }
    },
    removeEducation: (state, action: PayloadAction<string>) => {
      return state.filter((item) => item.id !== action.payload)
    },
  },
})

export const { addEducation, updateEducation, removeEducation } = educationSlice.actions
export default educationSlice.reducer
