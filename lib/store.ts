import { configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { combineReducers } from "redux"
import aboutReducer from "./slices/aboutSlice"
import educationReducer from "./slices/educationSlice"
import experienceReducer from "./slices/experienceSlice"
import projectsReducer from "./slices/projectsSlice"
import skillsReducer from "./slices/skillsSlice"

const persistConfig = {
  key: "root",
  storage,
}

const rootReducer = combineReducers({
  about: aboutReducer,
  education: educationReducer,
  experience: experienceReducer,
  projects: projectsReducer,
  skills: skillsReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
