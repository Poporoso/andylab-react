import React from 'react'

const RiepilogoPanel = ({ data }) => {

    return (
        <div className='box-color'>
            <h4 className='titolo'>Riepilogo</h4>
            <ul>
                <li>
                    Notti: {data.notti}
                </li>
                <li>
                    Adulti: {data.adulti}
                </li>
                <li>
                    Bambini: {data.bambini}
                </li>
                <li>
                    Checkin: {data.checkin_ext}
                </li>
                <li>
                    Checkout: {data.checkout_ext}
                </li>
                <li>
                    <i className="ion-coffee"></i>
                    Colazione inclusa
                </li>
            </ul>
        </div>

    )
}

export default RiepilogoPanel