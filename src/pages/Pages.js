import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'

import API, { callStoreApi } from '../store/apiData'
import Articolo from '../components/blog/Articolo.js'
import HeaderPage from '../components/header/HeaderPage'
import Loading from '../components/block/Loading'
import Footer from '../components/footer/Footer';

const Pages = () => {

    const params = useParams()
    const stringPage = params['*'];
    const lang = params.lang;
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true)
    const [dataPage, setDataPage] = useState({})
    const [dataCall, setDataCall] = useState(0)

    const page = dataPage?.body
    const html = dataPage?.html

    useEffect(() => {

        setIsLoading(true)
        const link = `/${lang}/${stringPage}`

        API.get(link).then((response) => {
            const status = response.data.status
            if (status === 404) {
                navigate(`/${lang}/404/`)
            }
            if (status === 204) {
                navigate(`/${lang}/manutenzione/`)
            }
            const protetta = response.data.resource.body.protected
            if (protetta) {
                navigate(`/${lang}/users/login/`)
            }
            setDataPage(response.data.resource)
            setDataCall(response.data.data_call)
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lang, stringPage])

    useEffect(() => {
        if (dataCall) {
            setIsLoading(false)
        }
        window.scrollTo(0, 0)
    }, [dataCall])

    return (
        dataPage &&
        <>
            <Loading status={isLoading} />
            <HeaderPage options={{
                title: html?.title,
                subTitle: html?.sub_title,
                urlImage: html?.image_preview
            }} />
            <Container className='py-5'>
                <Row>
                    <Col>
                        {
                            page &&
                            <Articolo
                                data={page}
                                display={{
                                    title: false,
                                    image: false
                                }}
                            />
                        }
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default Pages