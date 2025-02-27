import {configureStore} from "@reduxjs/toolkit"
import themeSlice from "../features/themeSlice"
import timerSlice from "../features/timerSlice"

export const store = configureStore({
    reducer: {
        theme: themeSlice,
        timer: timerSlice,
    }
})

