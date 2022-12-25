import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import API from '../store/apiData'

import { useEffect } from "react";
import Loading from '../components/block/Loading';
import HeaderPage from '../components/header/HeaderPage';
import Footer from '../components/footer/Footer';
// import SearchBox from '../components/search/SearchBox';
import NoArticle from '../components/blog/NoArticle';
import Paginazione from '../components/paginazione/Paginazione';
import { renderText } from '../helper/Helper';

import ServiceCardLarge from '../components/services/ServiceCardLarge';
import OfferteCardLarge from '../components/offerte/OfferteCardLarge';
import EventiCardLarge from '../components/eventi/EventiCardLarge';

import ServiceCardSmall from '../components/services/ServiceCardSmall';
import OfferteCardSmall from '../components/offerte/OfferteCardSmall';
import EventiCardSmall from '../components/eventi/EventiCardSmall';

const ServiziOfferteEventi = ({ type }) => {

    const [dataPage, setDataPage] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [dataCall, setDataCall] = useState(0)

    /** Parametri link */
    const params = useParams()
    const sezione = type
    const sectionPage = params.page
    const keyword = params.keyword

    // Recupero la lingua
    const lang = params.lang
    // const urlSearch = `/${lang}/${sezione}/search`

    const resultList = dataPage?.result_list
    const resultPlus = dataPage?.result_plus
    const paginazione = dataPage?.paginazione
    const html = dataPage?.html

    useEffect(() => {
        setIsLoading(true)

        // se manca la lingua mi evito una chiamata api
        if (!lang) {
            return
        }

        let base = `/${lang}/${sezione}`
        let link;

        if (keyword) {
            if (sectionPage === undefined) {
                link = `${base}/search/${keyword}/`
            } else {
                link = `${base}/search/${keyword}/${sectionPage}/`
            }
        } else {
            if (sectionPage === undefined) {
                link = `${base}/`
            } else {
                link = `${base}/${sectionPage}/`
            }
        }

        API.get(link).then((response) => {
            setDataPage(response.data.resource)
            setDataCall(response.data.data_call)
        })

    }, [lang, sectionPage, sezione, keyword])

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
                    <Col lg={8}>
                        <h1>{dataPage?.body?.titolo}</h1>
                        <div>{renderText(dataPage?.body?.testo)}</div>
                        <Row>
                            {
                                resultList ? Object.entries(resultList).map((item, index) => {
                                    let scheda
                                    switch (sezione) {
                                        case 'offerte': scheda = <Col key={index} lg={12}>
                                            <OfferteCardLarge data={item} />
                                        </Col>
                                            break;
                                        case 'servizi': scheda = <Col key={index} lg={6}>
                                            <ServiceCardLarge data={item} />
                                        </Col>
                                            break;
                                        case 'eventi': scheda = <Col key={index} lg={12}>
                                            <EventiCardLarge data={item} />
                                        </Col>
                                            break;
                                        default: break;
                                    }
                                    return (
                                        scheda
                                    )
                                }) : <NoArticle />
                            }
                        </Row>
                        <Row>
                            <Col lg={12}>
                                <Paginazione data={paginazione} />
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={3}>
                        <h5>In evidenza</h5>
                        {
                            resultPlus ? Object.entries(resultPlus).map((item, index) => {
                                let schedaSmall
                                switch (sezione) {
                                    case 'offerte': schedaSmall = <OfferteCardSmall key={index} data={item} />
                                        break;
                                    case 'servizi': schedaSmall = <ServiceCardSmall key={index} data={item} />
                                        break;
                                    case 'eventi': schedaSmall = <EventiCardSmall key={index} data={item} />
                                        break;
                                    default: break;
                                }
                                return (
                                    schedaSmall
                                )
                            }) : <NoArticle />
                        }
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default ServiziOfferteEventi