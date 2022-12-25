import React from 'react'
import { Link, useParams } from 'react-router-dom'

import '../assets/css/style-404.css'

const Pages404 = () => {

    const params = useParams()
    const lang = params.lang;

    return (
        <div className='error-404'>
            <div className='error-text'>
                <span>404</span>
                <p>PAGE NOT FOUND</p>
                <p className='hmpg'>
                    <Link to={`/${lang}/`} class="back">
                        Back To Home
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Pages404