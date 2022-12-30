import React, { useRef, useState } from 'react'
import { Alert, Button, Input, Label } from 'reactstrap'

import { validateEmail } from '../../helper/Helper'
import API from '../../store/apiData'

import '../../assets/css/newsletter.css'

import nlIcon from '../../assets/images/nl-icon.svg'
import { useSelector } from 'react-redux'

const NewsletterBox = () => {

    // Recupero la lingua
    const info = useSelector(store => store.infoSlice)
    const lang = info.lang

    const [messaggioServer, setMessaggioServer] = useState({})
    const [statusModale, setStatusModale] = useState(false)
    const emailRef = useRef()
    const nameRef = useRef()

    const [data, setData] = useState({
        name: '',
        email: ''
    })

    const handleSendSubscribe = () => {

        const name = nameRef.current.value
        const email = emailRef.current.value

        // Controllo i campi
        if (name === '' || name.length < 3) {
            setMessaggioServer({
                status: 0,
                tipo: 'danger',
                messaggio: 'Nome non valido (min 3 chr)'
            })
            return
        } else if (!validateEmail(email)) {
            setMessaggioServer({
                status: 0,
                tipo: 'danger',
                messaggio: 'Email non valida'
            })
            return
        }

        // Invio messaggio
        API.post(
            `${lang}/newsletter/subscribe/`,
            data,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        ).then((response) => {

            // Imposto messaggio di risposta dal server
            const status = response.data.resource.status
            const messaggio = response.data.resource.message

            setMessaggioServer({
                status,
                tipo: status ? 'success' : 'danger',
                messaggio
            })
        })
    }

    const handleClosePopup = () => {
        setStatusModale(false)
        setMessaggioServer({
            status: 0,
            tipo: '',
            messaggio: ''
        })
        nameRef.current.value = ''
        emailRef.current.value = ''
        setMessaggioServer({})
    }

    const handleIscriviti = () => {
        setStatusModale(true)
        window.scrollTo(0, 0)
    }

    const setDataForm = () => {
        setData({
            name: nameRef.current.value,
            email: emailRef.current.value
        })
    }

    return (
        <>
            <Button onClick={() => handleIscriviti()}>Iscriviti alla newsletter!</Button>
            {
                statusModale &&
                <section className='newsletter-popup'>
                    <div className="newsletter-popup__main">
                        {
                            // Se lo status è 1 mostro operazione riuscita
                            messaggioServer.status ?
                                <div className="newsletter-popup__status">
                                    <i className='ion-ios-checkmark-outline'></i>
                                    <h1>Iscritto!</h1>
                                    <span>{messaggioServer.messaggio}</span>
                                    <div className="btn-container">
                                        <Button onClick={() => handleClosePopup()}>Chiudi</Button>
                                    </div>
                                </div> :
                                <>
                                    <Button className='close' onClick={() => handleClosePopup()}>
                                        <i className='ion-close-round'></i>
                                    </Button>
                                    <div className="newsletter-popup__icon">
                                        <img src={nlIcon} alt="Newsletter" />
                                    </div>
                                </>
                        }
                        {
                            // Se lo status è 1 mostro operazione riuscita
                            !messaggioServer.status &&
                            <>
                                <div className="newsletter-popup__header">
                                    <h1>Stay tuned!</h1>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                                    {
                                        messaggioServer.messaggio &&
                                        <Alert color={messaggioServer.tipo} className="alert-icon">
                                            <i className="ion-alert-circled"></i>
                                            {messaggioServer.messaggio}
                                        </Alert>
                                    }
                                </div>
                                <div className="newsletter-popup__form">
                                    <Label>Nome</Label>
                                    <Input innerRef={nameRef} size="lg" onChange={() => setDataForm()} />
                                    <Label>Email</Label>
                                    <Input innerRef={emailRef} size="lg" type='email' onChange={() => setDataForm()} />
                                    <div className="btn-container">
                                        <Button onClick={() => handleSendSubscribe()}>Iscriviti ora!</Button>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </section>
            }
        </>
    )
}

export default NewsletterBox