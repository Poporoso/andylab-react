import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const getApiInfo = createAsyncThunk('getApiInfo', async (endpoint) => {
    const { data } = await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/${endpoint}`)
    return data.resource
})

const initialState = {
    isLoading: false,
    data: []
}

const getInfoPage = createSlice({
    name: 'getDataInfo',
    initialState,
    reducers: {}, 
    extraReducers: (builder) => {
        builder
        .addCase(getApiInfo.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getApiInfo.rejected, (state) => {
            state.isLoading = false
        })
        .addCase(getApiInfo.fulfilled, (state, action) => {
            state.data = action.payload
            state.isLoading = false
        })
    }
})

export default getInfoPage.reducer