import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Container, Row, Col } from "reactstrap";

import BookingForm from '../components/BookingForm';
import BookingRiepilogo from '../components/BookingRiepilogo';
import BookingRoomList from '../components/BookingRoomList';

import '../assets/css/booking.css'


import Loading from '../components/Loading';
import Footer from '../components/Footer';

const Booking = () => {

    const [ isLoading, setIsLoading ] = useState(true)
    const store = useSelector(state => state.dataBooking)
    const load = store.isLoading

    useEffect(() => {
        !load && setIsLoading(false)
    }, [load])

    return (
        <>
            <Loading status={isLoading} />
            <BookingForm />
            <Container className='booking'>
                <Row>
                    <Col lg={8}>
                        <BookingRoomList /> 
                    </Col>
                    <Col>
                        <BookingRiepilogo /> 
                    </Col>
                </Row>
            </Container>    
            <Footer />
        </>
    )
}

export default Booking