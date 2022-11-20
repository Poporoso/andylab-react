import { configureStore } from "@reduxjs/toolkit"
// import getMenuSlice from "./menuSlice"
// import getLingueSlice from "./lingueSlice"
// import dataPageSlice from "./dataPageSlice"
import dataBookingSlice from "./dataBookingSlice"
import dataInfoSlice from "./dataInfoSlice"

const store = configureStore({
    reducer: {
        // lingueSlice: getLingueSlice,
        // menuSlice: getMenuSlice,
        // dataSlice: dataPageSlice,
        dataBooking: dataBookingSlice,
        infoSlice: dataInfoSlice
    },
})

export default store