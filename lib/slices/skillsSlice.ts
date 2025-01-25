import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

const initialState: string[] = []

const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    addSkill: (state, action: PayloadAction<string>) => {
      state.push(action.payload)
    },
    removeSkill: (state, action: PayloadAction<string>) => {
      return state.filter((skill) => skill !== action.payload)
    },
    updateSkills: (state, action: PayloadAction<string[]>) => {
      return action.payload
    },
  },
})

export const { addSkill, removeSkill, updateSkills } = skillsSlice.actions
export default skillsSlice.reducer
