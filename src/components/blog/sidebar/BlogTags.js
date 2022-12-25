import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogTags = ({ data }) => {

    // Recupero la lingua
    const lang = useSelector(store => store.infoSlice.lang)
    const tagList = data

    return (
        <aside className="blog-module">
            <h5 className='blog-module__title'>
                Tag Clouds
            </h5>
            <ul className='blog-module__tags'>
                {
                    tagList && tagList.map((item, index) => {
                        const { nome_tag, permatag } = item
                        return (
                            <li key={index}>
                                <Link to={`/${lang}/blog/${permatag}`}>
                                    #{nome_tag}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </aside>
    )
}

export default BlogTags