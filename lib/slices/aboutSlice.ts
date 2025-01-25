import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface AboutState {
  name: string
  email: string
  phone: string
  address: string
  summary: string
}

const initialState: AboutState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  summary: "",
}

const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {
    updateAbout: (state, action: PayloadAction<Partial<AboutState>>) => {
      return { ...state, ...action.payload }
    },
  },
})

export const { updateAbout } = aboutSlice.actions
export default aboutSlice.reducer
