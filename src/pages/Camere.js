import React, {useState} from 'react'
import API from '../store/apiData'

import { useEffect } from "react";
import Loading from '../components/Loading';

const Camere = ({lang}) => {

    const [ apiDataPage, setApiDataPage ] = useState({})
    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        const link = `/${lang}/camere/`
        API.get(link).then((response) => {
            setApiDataPage(response.data.resource)
            setIsLoading(false)
        })
    }, [lang])

    return (
        <>
            <Loading status={isLoading} />
            <h1>Camere: {apiDataPage?.body?.titolo}</h1>
        </>
    )
}

export default Camere