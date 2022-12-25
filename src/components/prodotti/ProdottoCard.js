import React from 'react'
import { renderText } from '../../helper/Helper'

import '../../assets/css/prodotto-card.css'
import { Link } from 'react-router-dom'

const ProdottoCard = ({ baseUrl, data, classType }) => {

    const { descrizione_prodotto, img_preview, nome_prodotto, permalink } = data

    // console.log(permalink)

    return (
        <div className={`product-card ${classType}`}>
            <div className="badge">
                Hot
            </div>
            <div className="product-tumb">
                <img src={`${process.env.REACT_APP_UPLOADS_URL}${img_preview}`} alt={nome_prodotto} />
            </div>
            <div className="product-details">
                <span className="product-catagory">
                    Women,bag
                </span>
                <h4>
                    <Link to={`${baseUrl}${permalink}`}>
                        {nome_prodotto}
                    </Link>
                </h4>
                <div>{renderText(descrizione_prodotto.substr(0, 128) + '[...]')}</div>
                <div className="product-bottom-details">
                    <div className="product-price">
                        <small>$96.00</small>
                        $230.99
                    </div>
                    <div className="product-links">
                        <Link to="#/">
                            <i className="ion-android-favorite"></i>
                        </Link>
                        <Link to="#/">
                            <i className="ion-android-cart"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProdottoCard