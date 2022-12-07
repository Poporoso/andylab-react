import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BookingCardService from './BookingCardService';
import { useNavigate } from 'react-router-dom';
import {
    setPrezzoSoggiorno,
    selezionaServizo
} from '../../store/dataBookingSlice'
import { nextStep } from '../../store/dataBookingSlice';

import Loading from '../../components/Loading'

import { Col, Row } from 'reactstrap';

const BookingServiceList = () => {

    // Recupero la lingua
    const lang = useSelector(store => store.infoSlice.lang)

    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [statoLocaleServizi, setStatoLocaleServizi] = useState([])
    const [prezzoServizi, setPrezzoServizi] = useState([])


    //const dispatch = useDispatch()
    const store = useSelector(state => state.dataBooking)
    const dataDay = store.soggiorno
    const serviceList = store.data?.data_book?.data_service

    const aggiornaPrezzo = (servizio) => {
        setPrezzoServizi((previousState) => {
            return {
                ...previousState, [servizio.nome]: { prezzo: servizio.prezzo }
            }
        })
    }

    const setStore = (nomeServizio, services) => {

        if (Object.keys(services[nomeServizio]).length < 1) {

            setStatoLocaleServizi((current) => {
                const copy = { ...current }
                delete copy[nomeServizio]
                return copy
            })

            return
        }

        if (!nomeServizio) {
            return
        }

        setStatoLocaleServizi(previusState => ({
            ...previusState, [nomeServizio]: services[[nomeServizio]]
        }))
    }

    useEffect(() => {
        dispatch(
            selezionaServizo(statoLocaleServizi)
        )
    }, [statoLocaleServizi, dispatch])

    const mostraLocalService = () => {
        console.log('Stato locale servizi: ', statoLocaleServizi)
    }
    const mostraGlobalService = () => {
        console.log('Stato globale servizi: ', dataDay.servizi)
    }

    useEffect(() => {

        // Devo calcolare il prezzo totale
        let prezzoFinale = 0
        Object.entries(prezzoServizi).map((item) => {
            return (
                prezzoFinale += item[1].prezzo
            )
        })

        dispatch(
            setPrezzoSoggiorno({
                prezzo: prezzoFinale,
                tipo: 'services'
            })
        )
    }, [prezzoServizi, dispatch])

    useEffect(() => {
        if (serviceList) {
            setIsLoading(false)
        }
    }, [serviceList])

    window.onpopstate = () => {
        dispatch(
            nextStep({
                url: `${lang}/booking/room-list/`,
                dataJson: {
                    dateIn: dataDay.checkinJs,
                    dateOut: dataDay.checkoutJs,
                    adulti: dataDay.adulti,
                    bambini: dataDay.bambini
                }
            })
        )
        navigate(`/${lang}/booking/camere/`)
    }

    return (
        <>
            <Loading status={isLoading} />
            <div>Lista servizi</div>
            <button className='btn btn-danger' onClick={() => mostraGlobalService()}>
                Stato globale servizi
            </button>
            <button className='btn btn-danger m-2' onClick={() => mostraLocalService()}>
                Stato locale servizi
            </button>
            prezzo servizi generali: { }
            <Row>
                {
                    serviceList && serviceList.map((item) => {
                        return (
                            <Col lg={12} key={item.id} className="mb-4">
                                <BookingCardService setStore={setStore} aggiornaPrezzo={aggiornaPrezzo} dataDay={dataDay} dataService={item} />
                            </Col>
                        )
                    })
                }
            </Row>
        </>

    )
}

export default BookingServiceList