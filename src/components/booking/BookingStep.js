import React from 'react'

import roomIcon from '../../assets/images/rooms.svg'
import serviziIcon from '../../assets/images/servizi.svg'
import infoIcon from '../../assets/images/info.svg'
import anteprimaIcon from '../../assets/images/anteprima.svg'
import promozioniIcon from '../../assets/images/promozioni.svg'

const BookingStep = ({ step }) => {

    return (
        <div className="stepper-wrapper">
            <button className={`stepper-item ${step >= 1 ? 'completed' : ''} ${step === 1 ? 'active' : ''}`}>
                <div className="step-counter">
                    <img src={roomIcon} alt="room" />
                </div>
                <div className="step-name">Rooms</div>
            </button>
            <button
                className={`stepper-item ${step >= 2 ? 'completed' : ''} ${step === 2 ? 'active' : ''}`}>
                <div className="step-counter">
                    <img src={promozioniIcon} alt="Promozioni" />
                </div>
                <div className="step-name">Offerte</div>
            </button>
            <button className={`stepper-item ${step >= 3 ? 'completed' : ''} ${step === 3 ? 'active' : ''}`}>
                <div className="step-counter">
                    <img src={serviziIcon} alt="servizi" />
                </div>
                <div className="step-name">Servizi</div>
            </button>
            <button className={`stepper-item ${step >= 4 ? 'completed' : ''} ${step === 4 ? 'active' : ''}`}>
                <div className="step-counter">
                    <img src={infoIcon} alt="informazioni" />
                </div>
                <div className="step-name">Informazioni</div>
            </button>
            <div className={`stepper-item ${step >= 5 ? 'completed' : ''} ${step === 5 ? 'active' : ''}`}>
                <div className="step-counter">
                    <img src={anteprimaIcon} alt="Anteprima" />
                </div>
                <div className="step-name">Anteprima</div>
            </div>
        </div>
    )
}

export default BookingStep