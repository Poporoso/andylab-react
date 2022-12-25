import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { renderText } from '../../helper/Helper'

import '../../assets/css/offerte-card-small.css'

const OfferteCardLarge = ({ data }) => {

    /** Parametri link */
    const params = useParams()
    const lang = params.lang

    const evento = data[1]
    const titolo = renderText(evento.titolo)

    const link = `/${lang}/eventi/${evento.permalink}`


    return (
        <div className="card">
            <h5>{titolo}</h5>
            <Link to={link} className='btn btn-primary mt-3'>
                Leggi tutto
            </Link>
        </div>
    )
}

export default OfferteCardLarge