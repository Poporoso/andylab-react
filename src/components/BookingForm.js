import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import Select from 'react-select';
import {Container, Row, Col, Label, Button} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { getApiBooking } from '../store/dataBookingSlice';
import {
    useNavigate
  } from "react-router-dom";

import '../assets/css/booking-form.css'
import "react-datepicker/dist/react-datepicker.css";

const BookingForm = ({lang}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch()

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

    const [dataBooking, setDataBooking] = useState({
        dateIn: new Date(),
        dateOut: null,
        adult: numeroOspiti[2].value,
        children: numeroOspiti[0].value
    })

    const onChangeDate = (dates) => {
        const [start, end] = dates;
        setDataBooking((previousState) => {
            return {
                ...previousState, 
                dateIn: start,
                dateOut: end
            }
        })
    }

    const onChangeAdult = (value) => {
        setDataBooking((previousState) => {
            return {
                ...previousState, 
                adult: value,
            }
        })
    }

    const onChangeChildren = (value) => {
        setDataBooking((previousState) => {
            return {
                ...previousState, 
                children: value,
            }
        })
    }

    const handleSendBooking = () => {
        const dataBookingThunk = {
            url: `${lang}/booking/room-list/`,
            dataJson: dataBooking
        }
		dispatch(
			getApiBooking(dataBookingThunk),
            navigate(`booking/`)
		)
    }

    return (
        <section style={{backgroundColor: '#f4f6f8'}}>
            <Container>
                <Row style={{paddingTop: '60px', paddingBottom: '60px'}}>
                    <Col>
                        <Label>Seleziona date</Label>
                        <DatePicker
                            dateFormat="dd/MM/yyyy"
                            selected={dataBooking.dateIn}
                            onChange={ onChangeDate }
                            startDate={dataBooking.dateIn}
                            endDate={dataBooking.dateOut}
                            selectsRange
                        />   
                    </Col>
                    <Col>
                        <Label>Adulti</Label>
                        <Select isClearable defaultValue={numeroOspiti[2]} options={numeroOspiti} onChange={ (e) => onChangeAdult(e.value) } />
                    </Col>
                    <Col>
                        <Label>Bambini</Label>
                        <Select isClearable defaultValue={numeroOspiti[0]} options={numeroOspiti} onChange={ (e) => onChangeChildren(e.value) } />
                    </Col>
                    <Col>
                        <Label> </Label>
                        <Button color={'primary'} type="button" onClick={() => handleSendBooking()}>Invia</Button>
                    </Col>
                </Row>
            </Container>             
        </section>
 
    )
}

export default BookingForm