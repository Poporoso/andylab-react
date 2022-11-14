import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const getApiLingue= createAsyncThunk('getApiLingue', async (endpoint) => {
    const { data } = await axios.get(`${process.env.REACT_APP_URL_DOMAIN}/${endpoint}`)
    return data.resource
})

const initialState = {
    isLoading: true,
    data: []
}

const getMenuSlice = createSlice({
    name: 'getLingueSlice',
    initialState,
    reducers: {}, 
    extraReducers: (builder) => {
        builder
        .addCase(getApiLingue.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getApiLingue.rejected, (state) => {
            state.isLoading = false
        })
        .addCase(getApiLingue.fulfilled, (state, action) => {
            state.data = action.payload
            state.isLoading = false
        })
    }
})

export const { getMenu } = getMenuSlice.actions
export default getMenuSlice.reducer