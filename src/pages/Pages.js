import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../store/apiData'

import { useEffect } from "react";
import Loading from '../components/Loading'
import { Container, Row, Col } from 'reactstrap'
import Articolo from '../components/Articolo'
import HeaderPage from '../components/HeaderPage'

const Pages = ({lang}) => {

    const params = useParams()
    const stringPage = params['*'];

    const [ apiDataPage, setApiDataPage ] = useState({})
    const [ isLoading, setIsLoading ] = useState(true)

	const dataPage = apiDataPage.body
	const dataTemplate = apiDataPage.template

    useEffect(() => {
        setIsLoading(true)
        const link = `/${lang}/${stringPage}`
        API.get(link).then((response) => {
            setApiDataPage(response.data.resource)
            setIsLoading(false)
        })
    }, [lang, stringPage])

    return (
        <React.Fragment>
            <Loading status={isLoading} />
            <HeaderPage data={dataTemplate} /> 
            <Container>
                <Row>
                    <Col>
                        { dataPage && <Articolo data={dataPage} /> }
                    </Col>
                    <Col md={4}>
                        ***
                    </Col>
                </Row>
            </Container>
        </React.Fragment>

    )
}

export default Pages