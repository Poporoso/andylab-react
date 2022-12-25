import React from 'react'
import { Link, useParams } from 'react-router-dom'

import '../../assets/css/service-card-large.css'

const ServiceCardLarge = ({ data }) => {

    /** Parametri link */
    const params = useParams()
    const lang = params.lang

    const { autore, titolo, img_anteprima, permalink } = data[1]
    const image = `${process.env.REACT_APP_UPLOADS_URL}${img_anteprima}`
    const serviceLink = `/${lang}/servizi/${permalink}`

    return (
        <article className="box-card small">
            <Link to={serviceLink} className='box-card_link'>
                <div className="box-card__img--hover" style={{ backgroundImage: `url(${image})` }}></div>
            </Link>
            <div className="box-card__info">
                <span className="box-card__category">
                    SERVICE
                </span>
                <h3 className="box-card__title">
                    <Link to={serviceLink}>
                        {titolo}
                    </Link>
                </h3>
                <span className="box-card__by">
                    by {autore}
                </span>
            </div>
        </article>
    )
}

export default ServiceCardLarge