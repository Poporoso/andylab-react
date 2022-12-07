import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Container, Row, Col } from "reactstrap";
// import API from '../store/apiData'

import BookingForm from '../components/booking/BookingForm';
import BookingRiepilogo from '../components/booking/BookingRiepilogo';

import '../assets/css/booking.css'

// import Loading from '../components/Loading'
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';

/** Booking components */
import BookingRoomList from '../components/booking/BookingRoomList';
import BookingServiceList from '../components/booking/BookingServiceList';
import BookingStep from '../components/booking/BookingStep';
import BookingInfo from '../components/booking/BookingInfo';
import BookingOfferte from '../components/booking/BookingOfferte';
import BookingSendForm from '../components/booking/BookingSendForm';
import BookingNextStep from '../components/booking/moduliRiepilogo//BookingNextStep';

const Booking = () => {

    // Recupero la lingua
    const lang = useSelector(store => store.infoSlice.lang)
    // const [isLoading, setIsLoading] = useState(true)
    // const [apiDataPage, setApiDataPage] = useState({})

    //const [isLoading, setIsLoading] = useState(true)
    const [nexButtonStatus, setNexButtonStatus] = useState(false)
    const [step, setStep] = useState(1)

    const params = useParams()
    const pathPage = params['*'].slice(0, -1)

    const updateStep = (step) => {
        setStep(step)
    }

    // useMemo(() => {
    //     const link = `/${lang}/booking/`
    //     API.get(link).then((response) => {
    //         setApiDataPage(response.data)
    //     })
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [lang])

    // useEffect(() => {
    //     if (apiDataPage.status) {
    //         setIsLoading(false)
    //     }
    // }, [apiDataPage])

    useEffect(() => {
        //setIsLoading(true)
        window.scrollTo(0, 0)
    }, [pathPage])

    return (
        <>
            {/* <Loading status={isLoading} /> */}
            <BookingForm />
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