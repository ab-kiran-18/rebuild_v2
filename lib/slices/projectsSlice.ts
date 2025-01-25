import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface ProjectItem {
  id: string
  name: string
  description: string
  technologies: string[]
  link: string
}

const initialState: ProjectItem[] = []

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<ProjectItem>) => {
      state.push(action.payload)
    },
    updateProject: (state, action: PayloadAction<ProjectItem>) => {
      const index = state.findIndex((item) => item.id === action.payload.id)
      if (index !== -1) {
        state[index] = action.payload
      }
    },
    removeProject: (state, action: PayloadAction<string>) => {
      return state.filter((item) => item.id !== action.payload)
    },
  },
})

export const { addProject, updateProject, removeProject } = projectsSlice.actions
export default projectsSlice.reducer
