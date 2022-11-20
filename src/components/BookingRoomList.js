/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { selezionaSoggiorno, eliminaTariffaSelezionata } from '../store/dataBookingSlice'
import { renderText } from '../helper/renderText';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';

const BookingRoomList = ({booking, rooms}) => {

    const dispatch = useDispatch()
    const selectRefs= useRef([]);

    const [ camereDisponibili, setCamereDisponibili ] = useState({})
    // const [ camereSelezionate, setCamereSelezionate ] = useState({}) 

    const bs = useSelector(state => state);
    const soggiorno = bs.dataBooking.soggiorno

    const checkButton = () => {
        console.log('Tariffe: ', soggiorno)
        // console.log(soggiorno)
    }

    const checkDisponibilita = (e) => {

        let nomeTipo = `tipo-${e.tipo}`
        let nomeTariffa = `tar-${e.tariffa}`
        const listaTariffe =  camereDisponibili[e.tipo].tariffe

        // Estraggo le camere selezionate di questo tipo
        let camereRestanti = e.max
        //console.log('Camere disponibili iniziali', camereRestanti)

        listaTariffe && Object.entries(listaTariffe).map((item) => {

            // Ottengo il nome della tariffa
            let key = Number(item[0])

            // Ricavo la selezione attuale della select
            const numFromSelect = selectRefs.current[`${nomeTipo}-tar-${key}`].state.selectValue[0]?.value

            // Ottengo il valore in base alla tariffa attuale/e delle altre della tipologia
            let valoreSelect = key === e.tariffa 
                             ? e.value 
                             : numFromSelect ? numFromSelect : 0

            // console.log('Sono una lista di tariffe: ', item[1])
            //console.log('Nella select sono impostate: ', valoreSelect)
            return camereRestanti -= valoreSelect

            // console.log(`UseRef tar-${key}: `, valoreSelect)
            // Scalo la quantita di camere dal totale
            // return camereRestanti -= valoreSelect
        })

        console.log('Camere restanti: ', camereRestanti)

        listaTariffe && Object.entries(listaTariffe).map((item) => {

            // Ottengo il nome della tariffa
            let key = Number(item[0])

            // Ricavo la selezione attuale della select
            const numFromSelect = selectRefs.current[`${nomeTipo}-tar-${key}`].state.selectValue[0]?.value
            
            console.log('NumForSelect: ', numFromSelect)

            // Ottengo il valore in base alla tariffa attuale/e delle altre della tipologia
            let valoreSelect = key === e.tariffa 
                             ? e.value 
                             : numFromSelect ? numFromSelect : 0

/*
            let x = 0;
            item[1].map((itemTar, index) => {
                if(e.tariffa === itemTar.tariffa)
                {
                    if( (index) > valoreSelect ) {
                        if(x < camereRestanti) {
                            x++
                            console.log('ItemTar 1', itemTar)
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
                }
                return null
            })

            let y = 0;
            item[1].map((itemTar, index) => {
                if(e.tariffa !== itemTar.tariffa)
                {
                    if( (index) > valoreSelect ) {
                        if(y < camereRestanti) {
                            y++
                            console.log('ItemTar 2', itemTar)
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
                }
                return null
            })*/

            let y = 0;
            item[1].map((itemTar, index) => {

                    if( (index) > valoreSelect ) {
                        if(y < camereRestanti) {
                            y++
                            console.log('ItemTar 2', itemTar)
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

            /*
            item[1].map((itemTar, index) => {
                let key = Number(item[0])
                const numFromSelect = selectRefs.current[`${nomeTipo}-tar-${key}`].state.selectValue[0]?.value

                if( index > numFromSelect ) {
                    return (
                        itemTar.isdisabled = true
                    )
                }
                return (
                    itemTar.isdisabled = false
                )
            })  */
        })




            // item[1].map((itemTar, index) => {
            //     if( item[0] !== e.tariffa ) {
            //         return (
            //             itemTar.isdisabled = (index) > camereRestanti ? true : false
            //         )
            //     }
            //     return null
            // })













        // console.log('Selezione: ', e)
        // console.log('Soggiorno: ', soggiorno.tariffe[nomeTipo])
        //let camereTotaliSelezionate = 0;

        if(soggiorno.tariffe[nomeTipo]) {

        } else {
            //camereTotaliSelezionate += e.value
        }




        // console.log('Camere selezionate: ', camereTotaliSelezionate)

/*
        // Preparo la gestione delle options della select coinvolta
        const targetList = camereDisponibili[e.tipo].tariffe[e.tariffa] // => lista select
        // const valorePrecedente = soggiorno.tariffe[nomeTipo]?.select // => Numero precedentemente selezionato
        


        console.log('soggiorno: ', soggiorno)

        */



















/*
        targetList.map((item, index) => {
            return (
                item.isdisabled = index > (e.max) ? true : false
            )
        })
        */

        // Salvo selezione tariffa
        // setTariffeSelezionate([...tariffaSelezionate, ])

        // Recupero le selezioni del tipo

   /*
        const targetList = camereDisponibili[e.tipo].tariffe[e.tariffa]
        const nuovoMax = e.max - e.value
        // camereDisponibili[e.tipo].selezione = e.value

        targetList.map((item, index) => {
            return (
                item.isdisabled = index > (e.max) ? true : false
            )
        })
        // camereDisponibili[e.tipo].max = camereDisponibili[e.tipo].max - e.value

        // console.log('Camere: ', camereDisponibili)
        console.log('Diponibili: ', e.max - e.value)
        Object.entries(camereDisponibili[e.tipo].tariffe).map((item) => {
            if(item[0] !== e.tariffa) {

                item[1].map((item_s, index_s) => {

                    return (
                        item_s.isdisabled = index_s > camereDisponibili[e.tipo].max ? true : false
                    )
                })
            }
            return (
                false
            )
        })
        */

        let newObj = {
            tipo: e.tipo, 
            tariffa: e.tariffa,
            select: e.value,
            prezzo: e.prezzo
        }

        if(e.prezzo === 0) {
            dispatch(
                eliminaTariffaSelezionata(nomeTipo)
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

    const popolaSelect = ({unita, prezzo, tipo, tariffa}) => {

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

        rooms.map((item) => {

            return (
                Object.entries(item.tariffe).map((tar) => {
                    return (
                        popolaSelect({
                            unita: item.unita, 
                            prezzo: tar[1].prezzo, 
                            tipo: item.id_tipologia,
                            tariffa: tar[1].id_tariffa
                        }) 
                    )
                })                    
            )
        })

        dispatch(
            selezionaSoggiorno({
                checkin: booking.checkin_it,
                checkout: booking.checkout_it,
                notti: booking.notti,
                adulti: booking.adulti,
                bambini: booking.bambini,
                tariffe: []
            })
        )

    }, [rooms, dispatch])


    return (
        <section className="booking__room-list">
            <h2>Camere disponibili</h2>
            {
                rooms.map((item, index) => {
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