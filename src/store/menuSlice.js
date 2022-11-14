import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const getApiMenu = createAsyncThunk('getApiMenu', async (endpoint) => {
    const { data } = await axios.get(`${process.env.REACT_APP_URL_DOMAIN}/${endpoint}`)
    return data.resource
})

const initialState = {
    isLoading: true,
    data: []
}

const getMenuSlice = createSlice({
    name: 'getMenuSlice',
    initialState,
    reducers: {}, 
    extraReducers: (builder) => {
        builder
        .addCase(getApiMenu.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getApiMenu.rejected, (state) => {
            state.isLoading = false
        })
        .addCase(getApiMenu.fulfilled, (state, action) => {
            state.data = action.payload
            state.isLoading = false
        })
    }
})

export const { getMenu } = getMenuSlice.actions
export default getMenuSlice.reducer