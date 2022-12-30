import React, { useEffect, useState } from 'react'
import { Badge, Col, Container, Row } from 'reactstrap'

import Slider from '../../components/widget/components/slider/Slider'
import Loading from '../../components/block/Loading';
import { renderText, base64Decode } from '../../helper/Helper';
import API from '../../store/apiData'
import Footer from '../../components/footer/Footer'

import '../../assets/css/pagina-prodotto.css'
import { useNavigate, useParams } from 'react-router-dom';
import ProdottoCard from '../../components/prodotti/ProdottoCard';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';

const ProdottoPage = () => {

    const [dataPage, setDataPage] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [dataCall, setDataCall] = useState(0)

    const navigate = useNavigate();

    /** Parametri link */
    const params = useParams()
    const lang = params.lang
    const name = params.name
    const id = params.id

    const immagini = dataPage?.images_list
    const correlati = dataPage?.correlati_list
    const prodotto = dataPage?.body
    const proprieta = prodotto?.proprieta
    const categorie = prodotto?.categorie
    const breadcrumps = dataPage?.html?.breadcrumps

    useEffect(() => {
        setIsLoading(true)
        const link = `/${lang}/catalogo/prodotti/scheda/${name}-${id}/`
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
    }, [name, id])

    useEffect(() => {
        if (dataCall) {
            setIsLoading(false)
        }
        window.scrollTo(0, 0)
    }, [dataCall])

    return (
        <>
            <Loading status={isLoading} />
            {
                prodotto &&
                <>
                    <section style={{
                        background: 'rgb(248 248 248)',
                        padding: '18px 0',
                        marginBottom: '28px'
                    }}>
                        <Container>
                            <Row>
                                <Col sm={12}>
                                    <Breadcrumbs data={breadcrumps} />
                                </Col>
                            </Row>
                        </Container>
                    </section>
                    <Container className='mb-5 pt-4'>
                        <Row>
                            <Col xs={5} className="product-image">
                                <Slider
                                    images={immagini}
                                    options={{ description: false, arrows: false }}
                                />
                            </Col>
                            <Col>

                                <div class="product-description">
                                    <span>Headphones</span>
                                    <h1>{prodotto.nome_prodotto}</h1>
                                    <div className='description'>
                                        {renderText(prodotto.descrizione_prodotto)}
                                    </div>
                                </div>

                                <div class="product-configuration">

                                    <div class="product-color my-4">
                                        <h4>Caratteristiche</h4>
                                        {
                                            proprieta &&
                                            <table class="table table-hover">
                                                <tbody>
                                                    {
                                                        proprieta.map((item, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{base64Decode(item.nome)}</td>
                                                                    <td>{base64Decode(item.valore)}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        }
                                    </div>

                                    <h4>Categorie</h4>
                                    <div class="category-badge mb-3">
                                        {
                                            categorie &&
                                            categorie.map((item, index) => {
                                                return (
                                                    <Badge color="primary" key={index}>
                                                        {item.nome_categoria}
                                                    </Badge>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <h2 className='mt-5 mb-3'>Prodotti correlati</h2>
                            </Col>
                            {
                                correlati &&
                                correlati.map((item, index) => {
                                    return (
                                        <Col key={index} lg={3}>
                                            <ProdottoCard classType={`small`} baseUrl={`/${lang}/catalogo/prodotti/scheda/`} data={item} />
                                        </Col>
                                    )
                                })
                            }
                            <Col></Col>
                        </Row>
                    </Container>
                </>

            }
            <Footer />
        </>

    )
}

export default ProdottoPage