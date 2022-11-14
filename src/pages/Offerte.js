import React from 'react'
import { getApiPage } from "../store/dataPageSlice";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from '../components/Loading';

const Offerte = (props) => {

    const { lang } = props.target

    const state = useSelector(state => state)
	const dataPage = state.dataSlice.data
	const isLoading = state.dataSlice.isLoading

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(
            getApiPage(`api/${lang}/offerte/`)
        )
    }, [lang, dispatch])

    return (
        <>
            <Loading status={isLoading} />
            <h1>Offerte: {dataPage?.body?.titolo || 'Home Page'}</h1>
        </>
    )
}

export default Offerte