import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, Input, InputGroup, InputGroupText } from 'reactstrap'

const ProdottiSearch = () => {

    // Recupero la lingua
    const lang = useSelector(store => store.infoSlice.lang)
    const navigate = useNavigate();

    const searchRef = useRef()
    const handleSearch = () => {
        const keyValue = searchRef.current.value.trim().toLowerCase()
        if (keyValue.length >= 3) {
            navigate(`/${lang}/catalogo/search/${keyValue}/`)
        }
    }

    return (
        <aside>
            <h5>
                Search
            </h5>
            <Form className='prodotti-search'>
                <InputGroup>
                    <Input innerRef={searchRef} />
                    <InputGroupText onClick={() => handleSearch()}>
                        <i className="ion-android-search"></i>
                    </InputGroupText>
                </InputGroup>
            </Form>
        </aside>
    )
}

export default ProdottiSearch