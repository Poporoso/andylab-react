import React, {useState} from 'react'
import API from '../store/apiData'

import { useEffect } from "react";
import Loading from '../components/Loading';

const Eventi = ({lang}) => {

    const [ apiDataPage, setApiDataPage ] = useState({})
    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        const link = `/${lang}/eventi/`
        API.get(link).then((response) => {
            setApiDataPage(response.data.resource)
            setIsLoading(false)
        })
    }, [lang])

    return (
        <>
            <Loading status={isLoading} />
            <h1>Eventi: {apiDataPage?.body?.titolo}</h1>
        </>
    )
}

export default Eventi