import React from 'react'

import '../assets/css/header-page.css'

const HeaderPage = ({data}) => {

    const urlImage = data?.options?.page.url_immagine

    return (
        <div className="sample-header" style={{ backgroundImage: `url("${process.env.REACT_APP_URL_UPLOAD}/${urlImage}")` }}>
            <div className="sample-header-section">
                <h1>Scroll down to see the parallax effect</h1>
            </div>
        </div>
    )
}

export default HeaderPage