/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { selezionaSoggiorno, eliminaTariffaSelezionata } from '../store/dataBookingSlice'
import { renderText } from '../helper/renderText';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';

const BookingRoomList = () => {

    const dispatch = useDispatch()
    const selectRefs= useRef([]);

    const [ camereDisponibili, setCamereDisponibili ] = useState({})

    const store = useSelector(state => state.dataBooking);

    // console.log(store)

    const soggiorno = store.soggiorno
    const rooms = store.data.data_book?.day_booking
    const booking = store.data.data_book?.info

    // const checkButton = () => {
    //     console.log(soggiorno)
    // }

    const checkDisponibilita = (e) => {

        let nomeTipo = `tipo-${e.tipo}`
        let nomeTariffa = `tar-${e.tariffa}`
        const listaTariffe =  camereDisponibili[e.tipo].tariffe

        // Estraggo le camere selezionate di questo tipo
        let camereRestanti = e.max

        listaTariffe && Object.entries(listaTariffe).map((item) => {

            // Ottengo il nome della tariffa
            let key = Number(item[0])

            // Ricavo la selezione attuale della select
            const numFromSelect = selectRefs.current[`${nomeTipo}-tar-${key}`].state.selectValue[0]?.value

            // Ottengo il valore in base alla tariffa attuale/e delle altre della tipologia
            let valoreSelect = key === e.tariffa 
                             ? e.value 
                             : numFromSelect ? numFromSelect : 0

            // Scalo la quantita di camere dal totale
            return camereRestanti -= valoreSelect
        })

        listaTariffe && Object.entries(listaTariffe).map((item) => {

            // Ottengo il nome della tariffa
            let key = Number(item[0])

            // Ricavo la selezione attuale della select
            const numFromSelect = selectRefs.current[`${nomeTipo}-tar-${key}`].state.selectValue[0]?.value

            // Ottengo il valore in base alla tariffa attuale/e delle altre della tipologia
            let valoreSelect = key === e.tariffa 
                             ? e.value 
                             : numFromSelect ? numFromSelect : 0

            let y = 0;
            item[1].map((itemTar, index) => {

                if( (index) > valoreSelect ) {
                    if(y < camereRestanti) {
                        y++
                        return (
                            itemTar.isdisabled = false
                        )
                    }
                    else{
                        return (
                            itemTar.isdisabled = true
                        )
                    }
                }
                return null
            })

            return null
        })

        if(soggiorno.tariffe[nomeTipo]) {

        } else {
            //camereTotaliSelezionate += e.value
        }

        let newObj = {
            tipo: e.tipo, 
            tariffa: e.tariffa,
            prezzo: e.prezzo,
            quantita: e.value,
            nomeTipologia: e.nomeTipologia,
            nomeTariffa: e.nomeTariffa,
        }

        if(e.prezzo === 0) {
            dispatch(
                eliminaTariffaSelezionata([`tipo-${e.tipo}`, `tar-${e.tariffa}`])
            )
            return
        }

        dispatch(
            selezionaSoggiorno({
                ...soggiorno,
                tariffe: {
                    ...soggiorno.tariffe, 
                    [nomeTipo]: {
                        ...soggiorno.tariffe[nomeTipo],
                        [nomeTariffa]: newObj         
                    }
                }
            })
        )
    }

    const popolaSelect = ({unita, prezzo, tipo, nomeTipologia, nomeTariffa, tariffa}) => {

        const tar = []
        for(let i = 0; i <= unita; i++) 
        {
            const prezzoFinale = prezzo * i
            const label = i ? `${i} - € ${prezzoFinale}.00` : i
            const obj = { 
                value: i, 
                label: label, 
                isdisabled: false,
                tipo: tipo, 
                tariffa: tariffa, 
                max: unita, 
                nomeTipologia: nomeTipologia,
                nomeTariffa: nomeTariffa,
                prezzo: prezzoFinale 
            }
            tar.push(obj);
        }

        setCamereDisponibili((previousState) => {
            return {
                ...previousState, 
                [tipo]: {
                    ...previousState[tipo],
                    tariffe: {
                        ...previousState[tipo]?.tariffe,
                        [tariffa]: tar,
                    },
                    max: unita,
                    selezione: 0,
                    disponibili: 0
                }
            }
        })

        return;
    }

    useEffect(() => {

        rooms && rooms.map((item) => {
            return (
                Object.entries(item.tariffe).map((tar) => {
                    return (
                        popolaSelect({
                            unita: item.unita, 
                            prezzo: tar[1].prezzo, 
                            tipo: item.id_tipologia,
                            nomeTipologia: item.nome_tipologia,
                            nomeTariffa: tar[1].nome_tariffa,
                            tariffa: tar[1].id_tariffa
                        }) 
                    )
                })                    
            )
        })

        booking && dispatch(
            selezionaSoggiorno({
                checkin: booking.checkin_it,
                checkout: booking.checkout_it,
                notti: booking.notti,
                adulti: booking.adulti,
                bambini: booking.bambini,
                tariffe: []
            })
        )

    }, [rooms, booking, dispatch])


    return (
        <section className="booking__room-list">
            <h2>Camere disponibili</h2>
            {
                rooms && rooms.map((item, index) => {
                    var immagine = `${process.env.REACT_APP_UPLOADS_URL}${item.immagine}`

                    return (
                        <div className='booking__room-row no-flex' key={index}>
                            <h6>
                                <span dangerouslySetInnerHTML={
                                        renderText(
                                            '<i class="icon ion-man"></i>'.repeat(item.ospiti)
                                        )
                                     }>
                                </span>
                                {item.nome_tipologia}
                            </h6>
                            <div className='booking__room-col'>
                                <div className='immagine' style={{backgroundImage:`url(${immagine})`}}></div>
                                <div className='tariffe'>
                                    {
                                        Object.entries(item.tariffe).map((tariffa) => {
                                            return (
                                                <div key={tariffa[1].id_tariffa}>
                                                    <div className='tariffe__title'>
                                                        {tariffa[1].nome_tariffa}
                                                    </div>
                                                    <div className='tariffe__row'>

                                                        <div className='tariffe__row-prezzo'>
                                                            Prezzo totale: { tariffa[1].prezzo }
                                                            Prezzo medio: { tariffa[1].prezzo / booking.notti }
                                                        </div>
                                                        <div className='tariffe__row-descrizione'>
                                                            <span dangerouslySetInnerHTML={
                                                                renderText(
                                                                    tariffa[1].descrizione_uns['it'].replace(/\\/g, "")
                                                                )
                                                            }>
                                                            </span>
                                                        </div>
                                                        <div className="tariffe__row-seleziona">
                                                            { `tipo-${item.id_tipologia}-tar-${tariffa[1].id_tariffa}` }
                                                            <Select 
                                                                options={camereDisponibili[`${item.id_tipologia}`]?.tariffe[`${tariffa[1].id_tariffa}`]} 
                                                                onChange={(e) => checkDisponibilita(e)} 
                                                                isOptionDisabled={(option) => option.isdisabled} 
                                                                ref={(el) => (selectRefs.current[`tipo-${item.id_tipologia}-tar-${tariffa[1].id_tariffa}`] = el)}
                                                            />
                                                            {/* <button onClick={ ()=> checkButton() }>
                                                                Mostra liste
                                                            </button> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </section>
    )
}

export default BookingRoomList