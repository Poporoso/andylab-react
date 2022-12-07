import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import API from '../store/apiData'

import { Container, Row, Col } from 'reactstrap'
import Articolo from '../components/Articolo.js'
import HeaderPage from '../components/HeaderPage'
import Loading from '../components/Loading'

const Pages = ({ lang }) => {

    const params = useParams()
    const stringPage = params['*'];

    const [isLoading, setIsLoading] = useState(true)
    const [apiDataPage, setApiDataPage] = useState({})

    const dataPage = apiDataPage.resource?.body
    const dataTemplate = apiDataPage.resource?.template

    useEffect(() => {
        const link = `/${lang}/${stringPage}`
        API.get(link).then((response) => {
            setApiDataPage(response.data)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lang, stringPage])

    useEffect(() => {
        if (apiDataPage.status) {
            setIsLoading(false)
        }
    }, [apiDataPage])

    useEffect(() => {
        setIsLoading(true)
    }, [stringPage])

    return (
        <>
            <Loading status={isLoading} />
            <HeaderPage data={dataTemplate} />
            <Container>
                <Row>
                    <Col>
                        {dataPage && <Articolo data={dataPage} />}
                    </Col>
                    <Col md={4}>
                        ***
                    </Col>
                </Row>
            </Container>
        </>

    )
}

export default Pages