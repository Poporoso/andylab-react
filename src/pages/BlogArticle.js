import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading';
import API from '../store/apiData'

import { Container, Row, Col } from "reactstrap";
import HeaderPage from '../components/HeaderPage';

const BlogArticle = () => {

    const [article, setArticle] = useState([])
    const [ isLoading, setIsLoading ] = useState(true)

    const {lang, data, title, id} = useParams()

    useEffect(() => {
        const link = `/${lang}/blog/${data}/${title}-${id}/`
        API.get(link).then((response) => {
            setArticle(response.data.resource)
            setIsLoading(false)
        })
    }, [lang, data, title, id])


    return (
        <>
            <Loading status={isLoading} />
            <HeaderPage data={article?.dataTemplate} />
            <Container>
                <Row>
                    <Col>
                        {article.body?.titolo}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default BlogArticle