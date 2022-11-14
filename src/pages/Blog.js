import React from 'react'
import { useParams } from 'react-router-dom'
import { getApiPage } from "../store/dataPageSlice";
import Loading from '../components/Loading';

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Blog = () => {
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
            <h1>Pages: {dataPage?.body?.titolo || 'Home Page'}</h1>
        </>
    )
}

export default Blog