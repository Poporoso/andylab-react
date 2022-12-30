import React, { useState } from 'react'
import API from '../../store/apiData'

import { useEffect } from "react";
import Loading from '../../components/block/Loading';
import { Col, Container, Row } from 'reactstrap';
import ProdottoCard from '../../components/prodotti/ProdottoCard';
import Footer from '../../components/footer/Footer'
import MenuCategorie from '../../components/prodotti/sidebar/MenuCategorie';
import { useNavigate, useParams } from 'react-router-dom';
import { renderText } from '../../helper/Helper.js'
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs'
import Paginazione from '../../components/paginazione/Paginazione'
import NoProdotto from '../../components/prodotti/NoProdotto';
import ProdottiSearch from '../../components/prodotti/sidebar/ProdottiSearch';

const CatalogoCategory = () => {

    const [dataPage, setDataPage] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [dataCall, setDataCall] = useState(0)

    const navigate = useNavigate();

    /** Parametri link */
    const params = useParams()
    const lang = params.lang
    const category = params.category
    const page = params.page

    const body = dataPage?.body
    const prodotti_list = dataPage?.prodotti_list
    const paginazione = dataPage?.paginazione
    const all_category = dataPage?.all_category
    const breadcrumps = dataPage?.html?.breadcrumps

    // console.log(params)

    useEffect(() => {
        setIsLoading(true)
        const pageLink = page ? `${page}/` : ``
        const link = `/${lang}/catalogo/category/${category}/${pageLink}`
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
    }, [lang, category, page])

    useEffect(() => {
        if (dataCall) {
            setIsLoading(false)
        }
        window.scrollTo(0, 0)
    }, [dataCall])

    return (
        <>
            <Loading status={isLoading} />
            <Container className='py-5'>
                {
                    body &&
                    <Row>
                        <Col sm={12}>
                            <Breadcrumbs data={breadcrumps} />
                        </Col>
                        <Col lg={9}>
                            <Row>
                                <Col sm={12}>
                                    <h1>{body.nome_categoria}</h1>
                                    <p>{renderText(body.descrizione_categoria)}</p>
                                </Col>
                            </Row>
                            <Row>
                                {
                                    prodotti_list ?
                                        prodotti_list.map((item, index) => {
                                            return (
                                                <Col key={index} lg={12}>
                                                    <ProdottoCard baseUrl={`/${lang}/catalogo/prodotti/scheda/`} classType={`large`} data={item} />
                                                </Col>
                                            )
                                        }) : <NoProdotto />
                                }
                            </Row>
                            <Row>
                                <Col lg={12}>
                                    <Paginazione data={paginazione} />
                                </Col>
                            </Row>
                        </Col>
                        <Col md={3}>
                            <ProdottiSearch />
                            <MenuCategorie category={all_category} />
                        </Col>
                    </Row>
                }

            </Container>
            <Footer />
        </>
    )
}

export default CatalogoCategory