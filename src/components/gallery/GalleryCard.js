import React from 'react'

    const GalleryCard = ({data}) => {

    const { nome_originale, descrizione, alt, url_immagine } = data

    return (
        <div className="img-box">
            <img src={`${process.env.REACT_APP_UPLOADS_URL}/${url_immagine}`} alt={alt} />
            <div className="transparent-box">
                <div className="caption">
                    <h2>{alt || nome_originale}</h2>
                    <p className="opacity-low">
                        {descrizione}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default GalleryCard