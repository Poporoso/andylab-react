import { configureStore } from "@reduxjs/toolkit"
import dataBookingSlice from "./dataBookingSlice"
import dataInfoSlice from "./dataInfoSlice"
import dataAnnunciSlice from "./dataAnnunciSlice"

const store = configureStore({
    reducer: {
        dataAnnunci: dataAnnunciSlice,
        dataBooking: dataBookingSlice,
        infoSlice: dataInfoSlice
    },
})

export default store