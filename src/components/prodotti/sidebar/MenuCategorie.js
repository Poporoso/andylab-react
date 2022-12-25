import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import '../../../assets/css/prodotti.css'

const MenuCategorie = ({ category }) => {

    // Recupero la lingua
    const info = useSelector(store => store.infoSlice)
    const lang = info.lang

    const subCategorie = (category) => {
        return (
            Object.entries(category).map((item, index) => {
                const sub = item[1].sub_cat
                return (
                    <li key={index}>
                        <Link to={`/${lang}/catalogo/category/${item[0]}-${item[1].id}/`}>
                            {sub && <i style={{ marginRight: '8px' }} className='ion-android-add'></i>}
                            {item[1].nome}
                        </Link>
                        {sub && <ul>{subCategorie(sub)}</ul>}
                    </li>
                )
            })
        )
    }

    return (
        <>
            <h5 className='my-3'>
                Categorie
            </h5>
            <ul className="category-menu">
                {category && subCategorie(category)}
            </ul>
        </>

    )
}

export default MenuCategorie