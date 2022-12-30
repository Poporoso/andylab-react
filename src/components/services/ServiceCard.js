import React from 'react'
import { renderText } from '../../helper/Helper';
import { Link, useParams } from 'react-router-dom';

import '../../assets/css/service-card.css'

const ServiceCard = ({ data, icon }) => {

    /** Parametri link */
    const params = useParams()
    const lang = params.lang

    const titolo = renderText(data.titolo);
    const testo = renderText(data.testo.substr(0, 88));
    const link = `/${lang}/${data.permalink}`

    return (
        <Link to={link} className='service-card'>
            <span className="service-card__icon">
                <i className={`icon ${icon}`}></i>
            </span>
            <h2 className="service-card__title">
                {titolo}
            </h2>
            <div className="service-card__text">
                {testo}
            </div>
        </Link>
    )
}

export default ServiceCard