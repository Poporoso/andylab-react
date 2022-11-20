import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const getApiBooking = createAsyncThunk('getApiBooking', async ({url, dataJson}) => {
    const { data } = await axios.post(`${process.env.REACT_APP_DOMAIN_URL}/${url}`, dataJson, 
    { 
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded' 
        }
    })
    return data
})

const initialState = {
    isLoading: false,
    data: [],
    soggiorno: {}
}

const getDataBooking = createSlice({
    name: 'getBooking',
    initialState,
    reducers: {
        eliminaTariffaSelezionata(state, actions) {
            delete state.soggiorno.tariffe[actions.payload]
        },
        selezionaSoggiorno(state, actions) {
            state.soggiorno = actions.payload
        }
    }, 
    extraReducers: (builder) => {
        builder
        .addCase(getApiBooking.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getApiBooking.rejected, (state) => {
            state.isLoading = false
        })
        .addCase(getApiBooking.fulfilled, (state, action) => {
            state.data = action.payload.resource
            state.isLoading = false
        })
    }
})

export const { selezionaSoggiorno, eliminaTariffaSelezionata } = getDataBooking.actions
export default getDataBooking.reducer