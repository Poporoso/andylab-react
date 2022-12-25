import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import AnnuncioCard from '../../components/annunci/AnnuncioCard';
import SearchVerticale from '../../components/annunci/moduli/SearchVerticale';
import { setSearch } from '../../store/dataAnnunciSlice'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'

import { renderText } from '../../helper/Helper'
import HeaderPage from '../../components/header/HeaderPage.js'
import Loading from '../../components/block/Loading';
import Footer from '../../components/footer/Footer';
import API from '../../store/apiData'

const Annunci = () => {

    const [dataPage, setDataPage] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [dataCall, setDataCall] = useState(0)

    const dispatch = useDispatch();

    const navigate = useNavigate();

    /** Parametri link */
    const params = useParams()

    // Recupero la lingua
    const lang = params.lang
    const search = params.search

    // Valore per aggiornare il loading
    const affitti = dataPage?.annunci_list?.affitti
    const vendita = dataPage?.annunci_list?.vendita
    const terreni = dataPage?.annunci_list?.terreni
    const listeSearch = dataPage?.liste_search
    const html = dataPage?.html

    useEffect(() => {
        setIsLoading(true)
        if (!search) {
            API.get(`/${lang}/annunci/`).then((response) => {
                setDataPage(response.data.resource)
                setDataCall(response.data.data_call)
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lang])

    const sendSearch = (valore) => {
        dispatch(
            setSearch(valore)
        )
        navigate(`/${lang}/annunci/search/`)
    }

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
                        <Row>
                            <Col>
                                <h1>{dataPage?.body?.titolo}</h1>
                                <p>{renderText(dataPage?.body?.testo)}</p>
                            </Col>
                        </Row>
                        <h2>Affitti</h2>
                        <Row>
                            {
                                affitti && affitti.map((item, index) => {
                                    return (
                                        <Col key={index} lg={6}>
                                            <AnnuncioCard lang={lang} data={item} />
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                        <h2>Vendita</h2>
                        <Row>
                            {
                                vendita && vendita.map((item, index) => {
                                    return (
                                        <Col key={index} lg={6}>
                                            <AnnuncioCard lang={lang} data={item} />
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                        <h2>Terreni</h2>
                        <Row>
                            {
                                terreni && terreni.map((item, index) => {
                                    return (
                                        <Col key={index} lg={6}>
                                            <AnnuncioCard lang={lang} data={item} />
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </Col>
                    <Col lg={4}>
                        {
                            listeSearch &&
                            <SearchVerticale
                                sendSearch={sendSearch}
                                data={listeSearch}
                            />
                        }
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default Annunci