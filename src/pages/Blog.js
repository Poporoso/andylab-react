import React from 'react'
import { getApiPage } from "../store/dataPageSlice";
import Loading from '../components/Loading';

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Blog = (props) => {

    const { lang } = props.target

    const state = useSelector(state => state)
	const dataPage = state.dataSlice.data
	const isLoading = state.dataSlice.isLoading

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(
            getApiPage(`api/${lang}/blog/`)
        )
    }, [lang, dispatch])

    return (
        <>
            <Loading status={isLoading} />
            <h1>Blog: {dataPage?.body?.titolo || 'Home Page'}</h1>
        </>
    )
}

export default Blog