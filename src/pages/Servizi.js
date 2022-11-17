import React, {useState} from 'react'
import API from '../store/apiData'

import { useEffect } from "react";
import Loading from '../components/Loading';

const Servizi = ({lang}) => {

    const [ apiDataPage, setApiDataPage ] = useState({})
    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        const link = `/${lang}/servizi/`
        API.get(link).then((response) => {
            setApiDataPage(response.data.resource)
            setIsLoading(false)
        })
    }, [lang])

    return (
        <>
            <Loading status={isLoading} />
            <h1>Servizi: {apiDataPage?.body?.titolo}</h1>
        </>
    )
}

export default Servizi