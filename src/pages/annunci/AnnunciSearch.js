import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';

import AnnuncioCard from '../../components/annunci/AnnuncioCard';
import SearchVerticale from '../../components/annunci/moduli/SearchVerticale';
import Paginazione from '../../components/block/Paginazione';
import { setSearch } from '../../store/dataAnnunciSlice'
import Loading from '../../components/block/Loading';
import Footer from '../../components/footer/Footer';
import HeaderPage from '../../components/header/HeaderPage.js'
import API from '../../store/apiData'

const Annunci = () => {

    const [dataPage, setDataPage] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [dataCall, setDataCall] = useState(0)

    const dataSearch = useSelector(store => store)
    const searchSaved = dataSearch.dataAnnunci.search
    const navigate = useNavigate();

    /** Parametri link */
    const params = useParams()
    const dispatch = useDispatch();

    // Recupero la lingua
    const lang = params.lang
    const page = params.page

    // Valore per aggiornare il loading
    const listeSearch = dataPage?.liste_search
    const listaAnnunci = dataPage?.lista_annunci
    const paginazione = dataPage?.paginazione
    const html = dataPage?.html

    const callApiSearch = (valore) => {
        setIsLoading(true)

        dispatch(
            setSearch(valore)
        )
        let link;
        if (!page) {
            // console.log('Sono probabilmente la home')
            link = `/${lang}/annunci/search/`
        } else {
            // console.log('Sono dentro una pagina numerata')
            link = `/${lang}/annunci/search/${page}/`
        }
        window.scrollTo(0, 0)
        API.post(
            link,
            valore,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        ).then((response) => {
            setDataPage(response.data.resource)
            setDataCall(response.data.data_call)
        })
    }

    useEffect(() => {
        callApiSearch(searchSaved)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchSaved])

    useEffect(() => {
        callApiSearch(searchSaved)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    const sendSearch = (valore) => {
        if (page) {
            // console.log('sono in un nuomero di pagina, devo trasferirrmi alla pagina 0 salvando i dati')
            dispatch(
                setSearch(valore)
            )
            navigate(`/${lang}/annunci/search/`)
            return;
        }
        callApiSearch(valore)
    }

    useEffect(() => {
        if (dataCall) {
            setIsLoading(false)
        }
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
                    <Col xs={12}>
                        <h2>Risultato ricerca</h2>
                    </Col>
                    <Col lg={8}>
                        <Row>
                            {
                                listaAnnunci && listaAnnunci.map((item, index) => {
                                    return (
                                        <Col key={index} lg={6}>
                                            <AnnuncioCard lang={lang} data={item} />
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                        <Row>
                            <Col lg={12}>
                                {
                                    paginazione &&
                                    <Paginazione data={paginazione} />
                                }
                            </Col>
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