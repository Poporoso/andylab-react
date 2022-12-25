import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogCategorie = ({ data }) => {

    // Recupero la lingua
    const lang = useSelector(store => store.infoSlice.lang)

    const listaCategorie = data

    const getCategoria = (itemList) => {
        return (
            itemList && Object.entries(itemList).map((item, index) => {
                const { nome, articoli_presenti, slug, submenu } = item[1]
                return (
                    <li key={index}>
                        <Link to={`/${lang}/blog/category/${slug}/`}>
                            <span>{nome}</span>
                            <span>{articoli_presenti}</span>
                        </Link>
                        {submenu && <ul>{getCategoria(submenu)}</ul>}
                    </li>
                )
            })
        )
    }

    return (
        <aside className='blog-module'>
            <h5 className='blog-module__title'>
                Category
            </h5>
            <ul className="blog-module__categorie">
                {getCategoria(listaCategorie)}
            </ul>
        </aside>
    )
}

export default BlogCategorie