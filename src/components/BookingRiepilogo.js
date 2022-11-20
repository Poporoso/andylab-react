import React from 'react'

const BookingRiepilogo = ({booking}) => {
    return (
        <>
            <h2>Riepilogo</h2>
            <ul>
                <li>Notti: {booking.notti}</li>
                <li>Adulti: {booking.adulti}</li>
                <li>Bambini: {booking.bambini}</li>
                <li>Checkin: {booking.checkin_ext}</li>
                <li>Checkout: {booking.checkout_ext}</li>
                <li><i className="ion-coffee"></i> Colazione inclusa</li>
            </ul>
        </>
    )
}

export default BookingRiepilogo