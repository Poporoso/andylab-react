import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { convertData } from '../../../helper/Helper'

const BlogRecenti = ({ data }) => {

    // Recupero la lingua
    const lang = useSelector(store => store.infoSlice.lang)

    const postRecenti = data

    return (
        <aside className="blog-module">
            <h5 className='blog-module__title'>
                Recent Post
            </h5>
            <div className='blog-module__recenti'>
                {
                    postRecenti && postRecenti.map((item, index) => {
                        const { titolo, permalink, img_anteprima, inizio_pubblicazione } = item
                        return (
                            <div key={index} className="blog-module__recenti-item">
                                <div className="blog-image">
                                    <img src={`${process.env.REACT_APP_UPLOADS_URL}${img_anteprima}`} alt={titolo} />
                                </div>
                                <div className="blog-body">
                                    <Link to={`/${lang}/blog/${permalink}`}>
                                        <h5>{titolo}</h5>
                                    </Link>
                                    <p>{convertData(inizio_pubblicazione, 'dl dd mt')}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div >

        </aside >
    )
}

export default BlogRecenti