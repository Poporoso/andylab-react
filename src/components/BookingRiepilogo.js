import React from 'react'
import { useSelector } from 'react-redux';

const BookingRiepilogo = () => {

    const booking = useSelector(state => state.dataBooking);
    const info = booking.data?.data_book?.info
    const soggiorno = booking?.soggiorno.tariffe
    let totale = 0

    return (
        <>
            <h4>Riepilogo</h4>
            { 
                info && <ul>
                            <li>Notti: {info.notti}</li>
                            <li>Adulti: {info.adulti}</li>
                            <li>Bambini: {info.bambini}</li>
                            <li>Checkin: {info.checkin_ext}</li>
                            <li>Checkout: {info.checkout_ext}</li>
                            <li><i className="ion-coffee"></i> Colazione inclusa</li>
                        </ul>
            }
            <h4>Selezione</h4>
            {
                soggiorno && Object.entries(soggiorno).map((item) => {
                    return (
                        Object.entries(item[1]).map((itemTariffa, index) => {
                            let nomeTipologia = itemTariffa[1].nomeTipologia
                            totale += itemTariffa[1].prezzo 
                            return (
                                <div key={index}>
                                    { nomeTipologia }<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;  &euro; { itemTariffa[1].prezzo }.00 con { itemTariffa[1].nomeTariffa }<br />
                                </div>
                            )
                        })                    
                    )
                })
            }
            <h1>&euro; { totale },00</h1>
        </>
    )
}

export default BookingRiepilogo