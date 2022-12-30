import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { renderText, convertData } from '../../helper/Helper'

import '../../assets/css/offerte-card-large.css'

const OfferteCardLarge = ({ data }) => {

    /** Parametri link */
    const params = useParams()
    const lang = params.lang

    const offerta = data[1]
    const image = `${process.env.REACT_APP_UPLOADS_URL}${offerta.img_anteprima}`
    const testo = renderText(offerta.testo.substr(0, 188))
    const autore = offerta.autore
    const titolo = renderText(offerta.titolo)
    const dataDay = convertData(offerta.inizio_pubblicazione, 'dd')
    const dataMonth = convertData(offerta.inizio_pubblicazione, 'ml')
    const link = `/${lang}/offerte/${offerta.permalink}`

    return (
        <div className="offerte-card">

            <div className="offerte-card-content">
                <div className='info-content'>
                    <div className="offerte-card-img">
                        {
                            offerta.img_anteprima &&
                            <img src={image} alt={titolo} />
                        }
                    </div>
                    <div className="offerte-card-content-right">
                        <h1>{titolo}*</h1>
                        <div className="sch-author">
                            <i className='ion-android-contact'></i>
                            <span>{autore}</span>
                        </div>
                        <div className='testo'>{testo}</div>
                        <Link to={link} className="btn btn-primary">
                            Leggi tutto
                        </Link>
                    </div>
                </div>
                <div className="sch-bottom">
                    <div className="sch-bottom-day">
                        <h5>{dataDay}</h5>
                        <h6>{dataMonth}</h6>
                    </div>
                </div>
                <ul>
                    <li><i className="ion-android-favorite"></i></li>
                    <li><i className="ion-android-share-alt"></i></li>
                    <li><i className="ion-ios-email-outline"></i></li>
                </ul>
            </div>

        </div>
    )
}

export default OfferteCardLarge