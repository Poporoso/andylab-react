import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col } from "reactstrap";

import Loading from '../../components/block/Loading';
import SearchBox from '../../components/search/SearchBox';
import BlogCategorie from '../../components/blog/sidebar/BlogCategorie';
import BlogRecenti from '../../components/blog/sidebar/BlogRecenti';
import BlogTags from '../../components/blog/sidebar/BlogTags';
import HeaderPage from '../../components/header/HeaderPage';
import Footer from '../../components/footer/Footer';
import Articolo from '../../components/blog/Articolo';
import API from '../../store/apiData'

import Widget from '../../components/widget/Widget'

const BlogArticle = () => {

    const [article, setArticle] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [dataCall, setDataCall] = useState(0)

    const categorieList = article?.lista_categorie
    const recentiList = article?.post_plus
    const tagsList = article?.tags_news
    const widget = article?.widget
    const html = article?.html

    const params = useParams()
    const { lang, data, title, id } = params
    const urlSearch = `/${lang}/blog/search`

    useEffect(() => {
        setIsLoading(true)

        const link = `/${lang}/blog/${data}/${title}-${id}/`
        API.get(link).then((response) => {
            setArticle(response.data.resource)
            setDataCall(response.data.data_call)
        })
    }, [lang, data, title, id])

    useEffect(() => {
        window.scrollTo(0, 0)
        if (dataCall) {
            setIsLoading(false)
        }
    }, [dataCall])

    return (
        <>
            <Loading status={isLoading} />
            <HeaderPage options={{
                title: html?.title,
                subTitle: html?.sub_title,
                urlImage: html?.image_preview
            }} />
            <Container className='py-5'>
                <Row>
                    <Col lg={8}>
                        <Articolo
                            data={{
                                titolo: article?.body?.titolo,
                                testo: article?.body?.testo,
                                img_anteprima: article?.body?.img_anteprima
                            }}
                            display={{}}
                        />
                        {Widget(widget)}
                    </Col>
                    <Col lg={4}>
                        <SearchBox url={urlSearch} />
                        <BlogCategorie data={categorieList} />
                        <BlogRecenti data={recentiList} />
                        <BlogTags data={tagsList} />
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default BlogArticle