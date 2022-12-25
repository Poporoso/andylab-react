import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, Col, FormGroup, Input, Label, Alert } from 'reactstrap'
import { validateEmail, renderText } from '../../../../helper/Helper'
import Loading from '../../../block/Loading'
import API from '../../../../store/apiData'
import { useSelector } from 'react-redux'
import ReCAPTCHA from "react-google-recaptcha"

import '../../../../assets/css/contact.css'

const Contact = ({ data }) => {

    const captchaRef = useRef(null)

    // Recupero la lingua
    const info = useSelector(store => store.infoSlice)
    const lang = info.lang
    const googleSetting = info.data.setting?.google
    const reCaptchaAbilitato = googleSetting ? googleSetting['abilita-captcha'] : null

    const infoWidget = data.var

    const [messaggioServer, setMessaggioServer] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [messaggio, setMessaggio] = useState({
        reCaptcha: null,
        nome: '',
        oggetto: '',
        email: '',
        testo: ''
    })

    const handleSetComment = (e) => {
        setMessaggioServer({
            tipo: '',
            messaggio: ''
        })
        setMessaggio((prevValue) => {
            return {
                ...prevValue,
                [e.target.name]: e.target.value
            }
        })
    }

    const inviaRisposta = () => {

        // Controllo i campi
        if (messaggio.nome === '' || messaggio.nome.length < 3) {
            setMessaggioServer({
                tipo: 'danger',
                messaggio: 'Nome non valido (minimo 3 caratteri)'
            })
            return
        } else if (!validateEmail(messaggio.email)) {
            setMessaggioServer({
                tipo: 'danger',
                messaggio: 'Email non valida'
            })
            return
        } else if (messaggio.testo === '' || messaggio.testo.length < 8) {
            setMessaggioServer({
                tipo: 'danger',
                messaggio: 'Il testo digitato è troppo corto (minimo 8 caratteri)'
            })
            return
        }

        // Attivo loading
        setIsLoading(true)

        // Invio messaggio
        API.post(
            `${lang}/send/mail/`,
            messaggio,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        ).then((response) => {

            // Imposto messaggio di messaggio dal server
            const statusSend = response.data.resource.status
            const responseMessage = response.data.resource.message

            setMessaggioServer({
                tipo: statusSend ? 'success' : 'danger',
                messaggio: responseMessage
            })

            // Resetto ReCaptcha
            captchaRef.current.reset()

            // Disattivo loading
            setIsLoading(false)
            /*
                        // Imposto nuovi messaggi da caricare
                        if (statusSend) {
                            // Svuoto i campi
                            setMessaggio({
                                reCaptcha: null,
                                nome: '',
                                oggetto: '',
                                email: '',
                                testo: ''
                            })
            
                        }
            */
        })
    }

    function onChangeReCaptcha(e) {
        setMessaggio((prevValue) => {
            return {
                ...prevValue,
                reCaptcha: e
            }
        })
    }

    return (
        <section className='form-contatti'>
            <Loading status={isLoading} />
            <h2>{infoWidget?.titolo}</h2>
            {infoWidget?.descrizione && <p>{renderText(infoWidget.descrizione)}</p>}
            <Form>
                {
                    messaggioServer.messaggio &&
                    <Alert color={messaggioServer.tipo} className="alert-icon">
                        <i className="ion-alert-circled"></i>
                        {messaggioServer.messaggio}
                    </Alert>
                }
                <FormGroup row>
                    <Label
                        for="nome"
                        sm={1}
                    >
                        Nome
                    </Label>
                    <Col sm={5}>
                        <Input
                            value={messaggio.nome}
                            id="nome"
                            name="nome"
                            onChange={(e) => handleSetComment(e)}
                        />
                    </Col>
                    <Label
                        for="email"
                        sm={1}
                    >
                        Email
                    </Label>
                    <Col sm={5}>
                        <Input
                            value={messaggio.email}
                            id="email"
                            name="email"
                            type="email"
                            onChange={(e) => handleSetComment(e)}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label
                        for="oggetto"
                        sm={1}
                    >
                        Oggetto
                    </Label>
                    <Col sm={11}>
                        <Input
                            value={messaggio.oggetto}
                            id="oggetto"
                            name="oggetto"
                            onChange={(e) => handleSetComment(e)}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label
                        for="testo"
                        sm={1}
                    >
                        Testo
                    </Label>
                    <Col sm={11}>
                        <Input
                            value={messaggio.testo}
                            id="testo"
                            name="testo"
                            type="textarea"
                            onChange={(e) => handleSetComment(e)}
                        />
                    </Col>
                </FormGroup>
                {
                    reCaptchaAbilitato ?
                        <FormGroup row>
                            <Label sm={1}></Label>
                            <Col sm={11}>
                                <ReCAPTCHA
                                    sitekey={googleSetting['captcha-key-pubblica']}
                                    onChange={(e) => onChangeReCaptcha(e)}
                                    ref={captchaRef}
                                />
                            </Col>
                        </FormGroup>
                        : null
                }
                <FormGroup row>
                    <Label sm={1}></Label>
                    <Col sm={11} className="btn-content">
                        <Button onClick={() => inviaRisposta()} disabled={messaggio.reCaptcha || reCaptchaAbilitato === 0 ? false : true}>
                            Invia
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        </section>
    )
}

export default Contact