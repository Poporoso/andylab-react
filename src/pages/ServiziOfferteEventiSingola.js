import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'

import HeaderPage from '../components/header/HeaderPage'
import Articolo from '../components/blog/Articolo.js'
import Loading from '../components/block/Loading'
import Footer from '../components/footer/Footer'
import API from '../store/apiData'

import '../assets/css/seofev.css'

const OffertaSingola = ({ type }) => {

    const params = useParams()
    const lang = params.lang;
    const data = params.data;
    const title = params.title;
    const id = params.id;
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true)
    const [dataPage, setDataPage] = useState({})
    const [dataCall, setDataCall] = useState(0)

    const page = dataPage?.body
    const html = dataPage?.html
    const dettagli = page?.dettagli

    useEffect(() => {
        setIsLoading(true)
        const link = `/${lang}/${type}/${data}/${title}-${id}/`

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
    }, [lang, id])

    useEffect(() => {
        if (dataCall) {
            setIsLoading(false)
        }
        window.scrollTo(0, 0)
    }, [dataCall])

    return (
        <>
            <Loading status={isLoading} />
            <HeaderPage options={{
                title: html?.title,
                subTitle: html?.sub_title,
                urlImage: html?.image_preview
            }} />
            <Container className='py-5'>
                <Row>
                    <Col lg={8}>
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
                    <Col lg={4}>

                        <div className='dettagli-evento'>
                            {
                                dettagli?.prezzo &&
                                <div className='blocco-evento'>
                                    <div className='titolo'>
                                        <i className='ion-social-euro'></i>
                                        <h5>prezzo</h5>
                                    </div>
                                    <span>{dettagli?.prezzo},00</span>
                                </div>
                            }
                            {
                                dettagli?.durata &&
                                <div className='blocco-evento'>
                                    <div className='titolo'>
                                        <i className='ion-ios-calendar-outline'></i>
                                        <h5>durata</h5>
                                    </div>
                                    <span>{dettagli?.durata}</span>
                                </div>
                            }
                            {
                                dettagli?.valida_dal &&
                                <div className='blocco-evento'>
                                    <div className='titolo'>
                                        <i className='ion-android-stopwatch'></i>
                                        <h5>valido dal</h5>
                                    </div>
                                    <span>{dettagli?.valida_dal}</span>
                                </div>
                            }
                            {
                                dettagli?.fino_al &&
                                <div className='blocco-evento'>
                                    <div className='titolo'>
                                        <i className='ion-android-stopwatch'></i>
                                        <h5>fino al </h5>
                                    </div>
                                    <span>{dettagli?.fino_al}</span>
                                </div>
                            }
                        </div>

                    </Col>
                </Row>
            </Container>
            <Footer />
        </>

    )
}

export default OffertaSingola