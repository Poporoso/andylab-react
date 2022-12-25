import React from 'react'

import cartinaIcon from './assets/images/cartina.png'
import dimensioneIcon from './assets/images/dimensioni.png'
import bagniIcon from './assets/images/bagni.png'
import fotoIcon from './assets/images/photo.png'
import { Link } from 'react-router-dom'

const AnnuncioCard = ({ data, lang }) => {

    const info = data

    const setPrezzo = (prezzo) => {
        if (info.tipo_scheda !== 'Affitto') {
            return (
                <span className="price">
                    {prezzo ? `€ ${prezzo}` : 'Trattativa riservata'}
                </span>
            )
        }
        return null
    }

    return (
        <article className="annuncio_item">
            <header>
                <span className="header-info">
                    {
                        info.img_ads &&
                        <img src={`${process.env.REACT_APP_UPLOADS_URL}${info.img_ads}`} alt={info.titolo} />
                    }
                    <span className="typology">
                        {info.tipo_scheda}
                    </span>
                    {
                        setPrezzo(info.prezzo)
                    }
                    {
                        info.offerta ?
                            <span className="offerta">
                                Offerta
                            </span> : null
                    }
                </span>
                <Link to={`/${lang}/annunci/${info.permalink}`}>
                    <h1>{info.titolo}</h1>
                </Link>
                <p className="descrizione">
                    {info.descrizione}
                </p>
                <time pubdate="" dateTime="1970-01-01T01:00:00+01:00"></time>
            </header>
            <ul className="details">
                <li>
                    <img src={cartinaIcon} alt="Dimensione" />
                    {info.mq}Mq
                </li>
                <li>
                    <img src={dimensioneIcon} alt="Dimensione" />
                    {info.locali} Locali
                </li>
                <li>
                    <img src={bagniIcon} alt="Dimensione" />
                    {info.bagni} Bagni
                </li>
                <li>
                    <img src={fotoIcon} alt="Dimensione" />
                    {info.numero_immagini}
                </li>
            </ul>
            <footer>
                <Link className="btn" to={`/${lang}/annunci/${info.permalink}`}>
                    <i className="ion-android-arrow-forward"></i>
                    Visualizza
                </Link>
            </footer>
        </article>
    )
}

export default AnnuncioCard