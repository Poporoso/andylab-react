import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Col, Form, FormGroup, Label, Row } from 'reactstrap'
import API from '../../store/apiData'
import { confirmAlert } from 'react-confirm-alert';
import { nextStep } from '../../store/dataBookingSlice';

import Loading from '../../components/block/Loading'

import 'react-confirm-alert/src/react-confirm-alert.css';

const BookingSendForm = () => {

    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // Recupero la lingua
    const lang = useSelector(store => store.infoSlice.lang)

    // Recupero store
    const store = useSelector(state => state.dataBooking)
    const soggiorno = store.soggiorno
    const { occupazione, informazioni } = store.informazioni

    const sendForm = () => {
        setIsLoading(true)
        API.post(
            `${lang}/booking/preventivo/`,
            store,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        ).then((response) => {
            const redirectPage = response.data.resource.page_redirect
            navigate(`/${lang}/${redirectPage}`)
        })
    }

    const sendBookingEmail = () => {

        confirmAlert({
            title: 'Inviare richiesta',
            message: 'Stai per inviare una richiesta di prenotazione, continuare?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => sendForm()

                },
                {
                    label: 'No'
                }
            ]
        });
    }

    useEffect(() => {
        if (store.informazioni) {
            setIsLoading(false)
        }
    }, [store.informazioni])

    window.onpopstate = () => {
        dispatch(
            nextStep({
                url: `${lang}/booking/room-list/`,
                dataJson: {
                    dateIn: soggiorno.checkinJs,
                    dateOut: soggiorno.checkoutJs,
                    adulti: soggiorno.adulti,
                    bambini: soggiorno.bambini
                }
            })
        )
        navigate(`/${lang}/booking/camere/`)
    }

    return (
        <>
            <Loading status={isLoading} />
            <Form>
                <FormGroup className="form-booking">
                    <h2>Informazioni</h2>
                    <Row>
                        <Col lg={2}>
                            <Label>
                                Titolo
                            </Label>
                            <span className='text-box'>
                                {informazioni.titolo}
                            </span>
                        </Col>
                        <Col lg={5}>
                            <Label>
                                Nome
                            </Label>
                            <span className='text-box'>
                                {informazioni.nome}
                            </span>
                        </Col>
                        <Col lg={5}>
                            <Label>
                                Cognome
                            </Label>
                            <span className='text-box'>
                                {informazioni.cognome}
                            </span>
                        </Col>
                        <Col lg={7}>
                            <Label>
                                Email
                            </Label>
                            <span className='text-box'>
                                {informazioni.email}
                            </span>
                        </Col>
                        <Col lg={5}>
                            <Label>
                                Numero di telefono *
                            </Label>
                            <span className='text-box'>
                                {informazioni.telefono}
                            </span>
                        </Col>
                        <Col lg={12}>
                            <Label>
                                Note per lo staff
                            </Label>
                            <span className='text-box'>
                                {informazioni.nota}
                            </span>
                        </Col>
                    </Row>

                </FormGroup>

                <FormGroup>
                    <Row>
                        <h2 className='w-100 mt-2 mb-4'>
                            Disposizione camere
                        </h2>
                        {
                            occupazione && Object.entries(occupazione).map((item, index) => {
                                const room = item[1]
                                return (
                                    <div className="col-6" key={index}>
                                        <div className="booking-form-room">
                                            <div>
                                                <strong className="titolo">
                                                    {room.nomeTipologia}
                                                </strong>
                                                <span>
                                                    Tariffa
                                                    <i className="arrow ion-android-arrow-dropright" aria-hidden="true"></i>
                                                    {room.nomeTariffa}
                                                </span>
                                                <ul className="form-container">
                                                    <li>
                                                        <label>
                                                            Ospiti:
                                                            <span style={{ marginLeft: '8px' }}>
                                                                {room.ospiti}
                                                            </span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label>
                                                            Nome:
                                                            <span style={{ marginLeft: '8px' }}>
                                                                {room.nome}
                                                            </span>
                                                        </label>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Row>
                </FormGroup>
            </Form>
            <button className='btn btn-warning' onClick={() => sendBookingEmail()}>
                Invia Email
            </button>
        </>

    )
}

export default BookingSendForm