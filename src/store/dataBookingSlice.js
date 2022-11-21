import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const nextStep = createAsyncThunk('nextStep', async ({url, dataJson}) => {
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
            delete state.soggiorno.tariffe[actions.payload[0]][actions.payload[1]]
        },
        selezionaSoggiorno(state, actions) {
            state.soggiorno = actions.payload
        }
    }, 
    extraReducers: (builder) => {
        builder
        .addCase(nextStep.pending, (state) => {
            state.isLoading = true
        })
        .addCase(nextStep.rejected, (state) => {
            state.isLoading = false
        })
        .addCase(nextStep.fulfilled, (state, action) => {
            state.data = action.payload.resource
            state.isLoading = false
        })
    }
})

export const { selezionaSoggiorno, eliminaTariffaSelezionata } = getDataBooking.actions
export default getDataBooking.reducer