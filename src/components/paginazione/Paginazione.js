import React from 'react'
import { Link } from 'react-router-dom';

const Paginazione = ({ data }) => {

    const paginazione = data

    return (
        <ul className='pagination'>
            {
                paginazione && Object.entries(paginazione).map((item, index) => {
                    return (
                        <li key={index} className={item[1].class}>
                            <Link to={item[1].url}>{item[1].num}</Link>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default Paginazione