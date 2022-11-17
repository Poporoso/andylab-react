import React from 'react'
import { renderText } from '../helper/renderText';

import '../assets/css/service-card.css'

const ServiceCard = ({ data, icon }) => {

    const { titolo, testo } = data

    return (
        <div className='service-card'>
            <icon className="service-card__icon">
                <i className={`icon ${icon}`}></i>
            </icon>
            <h2 className="service-card__title">{titolo}</h2>
            <div className="service-card__text" dangerouslySetInnerHTML={renderText(testo.substr(0,88))}></div>
        </div>
    )
}

export default ServiceCard