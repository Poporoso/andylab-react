import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from "reactstrap";

import BookingForm from '../../components/booking/BookingForm';
import BookingRiepilogo from '../../components/booking/BookingRiepilogo';

import Footer from '../../components/footer/Footer';
import { useParams } from 'react-router-dom';

/** Booking components */
import BookingRoomList from '../../components/booking/BookingRoomList';
import BookingServiceList from '../../components/booking/BookingServiceList';
import BookingStep from '../../components/booking/BookingStep';
import BookingInfo from '../../components/booking/BookingInfo';
import BookingOfferte from '../../components/booking/BookingOfferte';
import BookingSendForm from '../../components/booking/BookingSendForm';
import BookingNextStep from '../../components/booking/moduliRiepilogo/BookingNextStep';

const Booking = () => {

    const params = useParams()

    const [nexButtonStatus, setNexButtonStatus] = useState(false)
    const [step, setStep] = useState(1)

    const pathPage = params['*'].slice(0, -1)
    const lang = params.lang

    const updateStep = (step) => {
        setStep(step)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathPage])

    return (
        <>
            <section style={{ backgroundColor: '#F4F6F8' }}>
                <Container>
                    <Row>
                        <Col>
                            <BookingForm />
                        </Col>
                    </Row>
                </Container>
            </section>
            <Container className='booking'>
                <Row>
                    <Col lg={8}>
                        <BookingStep step={step} />
                        {pathPage === 'camere' && <BookingRoomList setNexButtonStatus={setNexButtonStatus} />}
                        {pathPage === 'servizi' && <BookingServiceList />}
                        {pathPage === 'offerte' && <BookingOfferte />}
                        {pathPage === 'informazioni' && <BookingInfo setNexButtonStatus={setNexButtonStatus} />}
                        {pathPage === 'riepilogo' && <BookingSendForm />}
                    </Col>
                    <Col>
                        <section className="sticky-top pt-5">
                            <BookingRiepilogo />
                            <BookingNextStep nextStep={{
                                lang,
                                pathPage,
                                updateStep,
                                nexButtonStatus
                            }} />
                        </section>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default Booking