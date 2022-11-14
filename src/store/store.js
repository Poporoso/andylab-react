import { configureStore } from "@reduxjs/toolkit"
import getMenuSlice from "./menuSlice"
import getLingueSlice from "./lingueSlice"
import dataPageSlice from "./dataPageSlice"

const store = configureStore({
    reducer: {
        lingueSlice: getLingueSlice,
        menuSlice: getMenuSlice,
        dataSlice: dataPageSlice
    },
})

export default store