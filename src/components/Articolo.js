import React from 'react'
import { renderText } from '../helper/renderText';

const Articolo = (props) => {

    const {titolo, testo, img_anteprima} = props.data

    return (
        <article>
            { img_anteprima && <img src={`${process.env.REACT_APP_UPLOADS_URL}/${img_anteprima}`} alt={titolo} /> }
            <h1>{titolo}</h1>
            <p dangerouslySetInnerHTML={renderText(testo)}></p>        
        </article>
    )
}

export default Articolo