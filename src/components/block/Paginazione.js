import React from 'react'
import { Link } from 'react-router-dom';

const Paginazione = ({ data }) => {

    const paginazione = data
    const lunghezza = Object.keys(paginazione).length
    const first = paginazione[1]
    const last = paginazione[lunghezza]

    return (
        paginazione &&
        <ul className='pagination'>
            {
                Object.entries(paginazione).map((item, index) => {
                    if (first === undefined && (index + 1) === 1) {
                        return (
                            <li key={index}>
                                <Link to={`${item[1].base_url}/`}>1</Link>
                                <span>...</span>
                            </li>
                        )
                    } else if ((index + 1) === lunghezza && last === undefined) {
                        return (
                            <li key={index} className={item[1].class}>
                                <span>...</span>
                                <Link to={item[1].url}>{item[1].num}</Link>
                            </li>
                        )
                    } else {
                        return (
                            <li key={index} className={item[1].class}>
                                <Link to={item[1].url}>{item[1].num}</Link>
                            </li>
                        )
                    }
                })
            }
        </ul>
    )
}

export default Paginazione