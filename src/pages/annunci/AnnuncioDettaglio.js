import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import { useDispatch } from 'react-redux';
import ReactPlayer from 'react-player/youtube'
import { useParams, useNavigate } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { renderText } from '../../helper/Helper'
import SearchVerticale from '../../components/annunci/moduli/SearchVerticale'
import Footer from '../../components/footer/Footer';
import { setSearch } from '../../store/dataAnnunciSlice'
import API from '../../store/apiData'
import Loading from '../../components/block/Loading';
import Maps from '../../components/widget/components/maps/Maps'
import Slider from '../../components/widget/components/slider/Slider'
import FormContatti from '../../components/annunci/moduli/FormContatti';
import Disponibilita from '../../components/annunci/moduli/Disponibilita';

import 'react-tabs/style/react-tabs.css';

const AnnuncioDettaglio = () => {

    const [apiDataPage, setApiDataPage] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [dataCall, setDataCall] = useState(0)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const dataCall = apiDataPage?.data_call
    const dataPage = apiDataPage?.body
    const listeSearch = apiDataPage?.liste_search
    const accessori = apiDataPage?.body?.accessori
    const dettagli = apiDataPage?.body?.dettagli
    const descrizioni = apiDataPage?.body?.descrizioni

    const periodi = apiDataPage?.presenze?.periodi
    const disponibilita = apiDataPage?.presenze?.disponibilita

    /** Parametri link */
    const params = useParams()
    const lang = params.lang
    const tipo = params.tipo
    const nome = params.nome
    const id = params.id

    const sendSearch = (valore) => {
        dispatch(
            setSearch(valore)
        )
        navigate(`/${lang}/annunci/search/`)
    }

    const setTabs = (lingue, tipo) => {
        return (
            Object.entries(lingue).map((item, index) => {
                return (
                    tipo === 'TabList' ? <Tab key={index}>{item[0]}</Tab> : <TabPanel key={index}>{renderText(item[1])}</TabPanel>
                )
            })
        )
    }

    const getCe = () => {
        if (listeSearch.ce) {
            const ce = listeSearch.ce.filter(item => {
                return item.id_ce === dataPage.id_ce
            })
            return renderText(`${ce[0].icon} ${ce[0].nome_ce}`)
        }
        else {
            return null
        }
    }

    const setPrezzo = (prezzo) => {
        if (dataPage.tipo_scheda !== 'Affitto') {
            return (
                <tr>
                    <td>
                        <strong>Prezzo</strong>
                    </td>
                    <td>
                        {prezzo ? `€ ${prezzo}` : 'Trattativa riservata'}
                    </td>
                </tr>
            )
        }
        return null
    }

    useEffect(() => {
        setIsLoading(true)
        const link = `/${lang}/annunci/${tipo}/${nome}-${id}/`
        API.get(link).then((response) => {
            setApiDataPage(response.data.resource)
            setDataCall(response.data.data_call)
        })
    }, [lang, tipo, nome, id])

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
            <Container className='py-5 annuncio'>
                <Row>
                    <Col lg={8}>
                        <h1>{dataPage.titolo}</h1>
                        {
                            dataPage.mostra_foto ?
                                <Slider
                                    images={dataPage.image_list}
                                /> : null
                        }
                        {
                            descrizioni &&
                            <Tabs className="mt-4">
                                <TabList>
                                    {setTabs(descrizioni, 'TabList')}
                                </TabList>
                                {setTabs(descrizioni, 'TabPanel')}
                            </Tabs>
                        }
                        {
                            dataPage.id_tipo_annuncio !== 3 &&
                            <>
                                <h4 className='mt-4'>Dati principali</h4>
                                <table className="table table-striped">
                                    <tbody>
                                        {setPrezzo(dataPage.prezzo)}
                                        <tr>
                                            <td>Riferimento</td>
                                            <td>{dataPage.riferimento}</td>
                                        </tr>
                                        <tr>
                                            <td>Contratto</td>
                                            <td>
                                                <span className="tipo-annuncio">
                                                    {dataPage.tipo_annuncio}
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Superficie</td>
                                            <td>{dataPage.mq} m²</td>
                                        </tr>
                                        <tr>
                                            <td>Tipologia</td>
                                            <td>{dataPage.tipo_immobile}</td>
                                        </tr>
                                        <tr>
                                            <td>Locali</td>
                                            <td>{dataPage.numero_locali}</td>
                                        </tr>
                                        <tr>
                                            <td>Piano</td>
                                            <td>{dataPage.piano}</td>
                                        </tr>
                                        <tr>
                                            <td>Classe energetica</td>
                                            <td>{getCe()}</td>
                                        </tr>
                                        <tr>
                                            <td>Zona</td>
                                            <td>{dataPage.zona}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <h4 className='mt-4'>Dettagli</h4>
                                {
                                    dettagli &&
                                    dettagli.map((item, index) => {
                                        return (
                                            <span key={index} className="badge bg-primary me-2">
                                                <h6 className='m-0'>
                                                    {item.nome_dettagli}
                                                </h6>
                                            </span>
                                        )
                                    })
                                }
                                <h4 className='mt-4'>Accessori</h4>
                                {
                                    accessori &&
                                    accessori.map((item, index) => {
                                        return (
                                            <span key={index} className="badge bg-primary me-2">
                                                <h6 className='m-0'>
                                                    {item.nome_accessori}
                                                </h6>
                                            </span>
                                        )
                                    })
                                }
                            </>
                        }
                        {
                            dataPage.id_tipo_annuncio === 2 &&
                            <Disponibilita
                                periodi={periodi}
                                disponibilita={disponibilita}
                                lang={lang}
                                idScheda={id}
                            />
                        }
                        {
                            dataPage.mostra_mappa ?
                                <Maps data={{
                                    type: 'maps',
                                    result: {
                                        titolo: 'Mappa',
                                    },
                                    var: {
                                        lat: dataPage.asse_x,
                                        lng: dataPage.asse_y,
                                        zoom: dataPage.asse_z,
                                        icona: "marker.png",
                                        w: "100%",
                                        h: "480px"
                                    }
                                }} /> : null
                        }
                        {
                            dataPage.video && dataPage.mostra_video ?
                                <>
                                    <h4 className='mt-4'>Video</h4>
                                    <ReactPlayer className='video-player' style={{}} url={dataPage.video} />
                                </> : null
                        }
                    </Col>
                    <Col lg={4}>
                        <FormContatti riferimento={dataPage.riferimento} />
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

export default AnnuncioDettaglio