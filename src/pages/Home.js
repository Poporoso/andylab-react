import React from 'react'
import { useParams } from 'react-router-dom'
import { getApiPage } from "../store/dataPageSlice";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from '../components/Loading';

const Home = () => {
    const params = useParams()

    const state = useSelector(state => state)
	const dataPage = state.dataSlice.data
	const isLoading = state.dataSlice.isLoading

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(
            getApiPage(`api/it/${params['*']}`)
        )
    }, [params, dispatch])

    return (
        <>
            <Loading status={isLoading} />
            <h1>Home page</h1>
        </>
    )
}

export default Home