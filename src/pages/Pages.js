import React from 'react'
import { useParams } from 'react-router-dom'
import { getApiPage } from "../store/dataPageSlice";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from '../components/Loading';

const Pages = (props) => {

    const params = useParams()

    const { lang } = props.target

    const state = useSelector(state => state)
	const dataPage = state.dataSlice.data
	const isLoading = state.dataSlice.isLoading

    const dispatch = useDispatch()

    useEffect(() => {
        const apiUrl = `api/${lang}/${params['*']}`
        console.log(apiUrl)
        dispatch(
            getApiPage(apiUrl)
        )
    }, [params, lang, dispatch])

    return (
        <>
            <Loading status={isLoading} />
            <h1>Pages: {dataPage?.body?.titolo || 'Home Page'}</h1>
        </>
    )
}

export default Pages