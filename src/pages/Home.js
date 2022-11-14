import React from 'react'
import { getApiPage } from "../store/dataPageSlice";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from '../components/Loading';

const Home = (props) => {

    const { lang } = props.target

    const state = useSelector(state => state)
	const isLoading = state.dataSlice.isLoading
	// const dataPage = state.dataSlice.data

    const dispatch = useDispatch()

    useEffect(() => {
        if(lang) {
            dispatch(
                getApiPage(`api/${lang}/home`)
            )
        }
    }, [lang, dispatch])

    return (
        <>
            <Loading status={isLoading} />
            <h1>Home page</h1>
        </>
    )
}

export default Home