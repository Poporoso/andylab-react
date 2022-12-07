/* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef, useEffect, useState } from 'react'
// import { useContext } from 'react'
import DatePicker from 'react-datepicker'
import Select from 'react-select';
import { Container, Row, Col, Label, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { nextStep } from '../../store/dataBookingSlice';
// import { LoadingContext } from '../../App';

import "react-datepicker/dist/react-datepicker.css";
import '../../assets/css/booking-form.css'

const BookingForm = () => {

    // const loadingContext = useContext(LoadingContext);

    // Recupero la lingua
    const lang = useSelector(store => store.infoSlice.lang)

    const ButtonSend = forwardRef(({ value, onClick }, ref) => (
        <button style={{ width: '100%' }} className="btn btn-primary" onClick={onClick} ref={ref}>
            {value}
        </button>
    ));

    const soggiorno = useSelector(state => state.dataBooking.soggiorno);

    const numeroOspiti = [
        { value: 0, label: 'Nessuno' },
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' },
        { value: 5, label: '5' },
        { value: 6, label: '6' },
        { value: 7, label: '7' },
        { value: 8, label: '8' },
        { value: 8, label: '9' }
    ]

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [dataBooking, setDataBooking] = useState({})
    const [sendButton, setSendButton] = useState(false)

    const handleCambiaData = (dates) => {
        const [start, end] = dates;

        if (start === null || end === null) {
            setSendButton(true)
        } else {
            setSendButton(false)
        }

        setDataBooking((previousState) => {
            return {
                ...previousState,
                dateIn: start,
                dateOut: end
            }
        })
    }
    const handleCambiaAdulti = (value) => {
        setDataBooking((previousState) => {
            return {
                ...previousState,
                adulti: value,
            }
        })
    }
    const handleCambiaBambini = (value) => {
        setDataBooking((previousState) => {
            return {
                ...previousState,
                bambini: value,
            }
        })
    }
    const handleSendBooking = () => {
        // loadingContext.setLoading(true)
        dispatch(
            nextStep({
                url: `${lang}/booking/room-list/`,
                dataJson: dataBooking
            })
        )
        navigate(`/${lang}/booking/camere/`)
    }

    useEffect(() => {

        let dateIn = new Date();
        let dateOut = new Date();
        dateOut.setDate(dateIn.getDate() + 1)

        let adulti = numeroOspiti[2].value
        let bambini = numeroOspiti[0].value

        if (soggiorno.checkin) {
            // let date_in = soggiorno.checkin.split('/')
            // let date_out = soggiorno.checkout.split('/')
            // dateIn = new Date(`${date_in[2]}/${date_in[1]}/${date_in[0]}`)
            // dateOut = new Date(`${date_out[2]}/${date_out[1]}/${date_out[0]}`)

            dateIn = new Date(soggiorno.checkinJs)
            dateOut = new Date(soggiorno.checkoutJs)

            adulti = soggiorno.adulti
            bambini = soggiorno.bambini
        }

        const dataSoggiorno = {
            dateIn: dateIn,
            dateOut: dateOut,
            adulti: adulti,
            bambini: bambini
        }

        setDataBooking(dataSoggiorno)

    }, [soggiorno])

    return (
        <section style={{ backgroundColor: '#F4F6F8' }}>
            <Container>
                <Row style={{ paddingTop: '60px', paddingBottom: '60px' }}>
                    <Col>
                        <Label>Seleziona date</Label>
                        <DatePicker
                            dateFormat="dd/MM/yyyy"
                            selected={dataBooking.dateIn}
                            minDate={new Date()}
                            onChange={handleCambiaData}
                            startDate={dataBooking.dateIn}
                            endDate={dataBooking.dateOut}
                            customInput={<ButtonSend />}
                            selectsRange
                        />
                    </Col>
                    <Col>
                        <Label>Adulti</Label>
                        <Select value={numeroOspiti[dataBooking.adulti]} options={numeroOspiti} onChange={(e) => handleCambiaAdulti(e.value)} />
                    </Col>
                    <Col>
                        <Label>Bambini</Label>
                        <Select value={numeroOspiti[dataBooking.bambini]} options={numeroOspiti} onChange={(e) => handleCambiaBambini(e.value)} />
                    </Col>
                    <Col>
                        <Button color={'primary'} type="button" onClick={() => handleSendBooking()} disabled={sendButton}>
                            Invia
                        </Button>
                    </Col>
                </Row>
            </Container>
        </section>

    )
}

export default BookingForm