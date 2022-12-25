import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { nextStep } from '../../../store/dataBookingSlice'

const BookingNextStep = ({ nextStep: { pathPage, updateStep, lang, nexButtonStatus } }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const stepList = {
        'camere': {
            step: 1,
            apiUrl: `${lang}/booking/offerte-list/`,
            pathUrl: `../offerte/`
        },
        'offerte': {
            step: 2,
            apiUrl: `${lang}/booking/service-list/`,
            pathUrl: '../servizi/'
        },
        'servizi': {
            step: 3,
            apiUrl: ``,
            pathUrl: '../informazioni/'
        },
        'informazioni': {
            step: 4,
            apiUrl: ``,
            pathUrl: '../riepilogo/'
        },
        'riepilogo': {
            step: 5,
            apiUrl: ``,
            pathUrl: '/'
        }
    }

    const stepSelected = stepList[pathPage]

    const handleNextStep = () => {
        if (stepSelected.apiUrl) {
            dispatch(
                nextStep({
                    url: stepSelected.apiUrl,
                    dataJson: ''
                })
            )
        }
        navigate(`booking/${stepSelected.pathUrl}`)
    }

    useEffect(() => {
        stepSelected?.step && updateStep(stepSelected.step)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        updateStep(stepSelected.step)
    }, [stepSelected.step, updateStep])

    return (
        stepSelected.step !== 5 &&
        <button className='btn btn-primary' onClick={() => handleNextStep()} disabled={nexButtonStatus}>
            Continua
        </button>
    )
}

export default BookingNextStep