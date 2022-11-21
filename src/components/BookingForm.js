/* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import Select from 'react-select';
import {Container, Row, Col, Label, Button} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { nextStep } from '../store/dataBookingSlice';

import {
    useNavigate
  } from "react-router-dom";

import '../assets/css/booking-form.css'
import "react-datepicker/dist/react-datepicker.css";

const BookingForm = ({lang}) => {

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <button style={{width:'100%'}} className="btn btn-primary" onClick={onClick} ref={ref}>
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

    const mostraStato = () => {
        console.log(dataBooking)
    }

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [dataBooking, setDataBooking] = useState({})

    const handleCambiaData = (dates) => {
        console.log('Cambio data')
        const [start, end] = dates;
        setDataBooking((previousState) => {
            return {
                ...previousState, 
                dateIn: start,
                dateOut: end
            }
        })
    }

    const handleCambiaAdulti = (value) => {
        console.log('Cambio adulti')
        setDataBooking((previousState) => {
            return {
                ...previousState, 
                adulti: value,
            }
        })
    }

    const handleCambiaBambini = (value) => {
        console.log('Cambio bambini')
        setDataBooking((previousState) => {
            return {
                ...previousState, 
                bambini: value,
            }
        })
    }

    const handleSendBooking = () => {
        dispatch (
            nextStep({url: `${lang}/booking/room-list/`, dataJson: dataBooking})
        )
        navigate(`booking/`)
    }

    useEffect(() => {

        let dateIn = new Date();
        let dateOut = new Date();
            dateOut.setDate(dateIn.getDate() + 1)

        let adulti  = numeroOspiti[2].value
        let bambini = numeroOspiti[0].value

        if( soggiorno.checkin ) {
            let date_in  = soggiorno.checkin.split('/')
            let date_out = soggiorno.checkout.split('/')
                dateIn   = new Date(`${date_in[2]}/${date_in[1]}/${date_in[0]}`)
                dateOut  = new Date(`${date_out[2]}/${date_out[1]}/${date_out[0]}`)

            adulti  = soggiorno.adulti
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
        <section style={{backgroundColor: '#f4f6f8'}}>
            <Container>
                <Row style={{paddingTop: '60px', paddingBottom: '60px'}}>
                    <Col>
                        <Label>Seleziona date</Label>
                        <DatePicker
                            dateFormat="dd/MM/yyyy"
                            selected={dataBooking.dateIn}
                            minDate={new Date()}
                            onChange={ handleCambiaData }
                            startDate={dataBooking.dateIn}
                            endDate={dataBooking.dateOut}
                            customInput={<ExampleCustomInput />}
                            selectsRange
                        />   
                    </Col>
                    <Col>
                        <Label>Adulti</Label>
                        <Select isClearable={true} value={numeroOspiti[dataBooking.adulti]} options={numeroOspiti} onChange={ (e) => handleCambiaAdulti(e.value) } />
                    </Col>
                    <Col>
                        <Label>Bambini</Label>
                        <Select isClearable={true} value={numeroOspiti[dataBooking.bambini]} options={numeroOspiti} onChange={ (e) => handleCambiaBambini(e.value) } />
                    </Col>
                    <Col>
                        <Button color={'primary'} type="button" onClick={() => handleSendBooking()}>
                            Invia
                        </Button>
                    </Col>
                    <Col>
                        <Button color={'primary'} type="button" onClick={() => mostraStato()}>
                            Mostra stato
                        </Button>
                    </Col>
                </Row>
            </Container>             
        </section>
 
    )
}

export default BookingForm