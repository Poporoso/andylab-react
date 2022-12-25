import React from 'react'

import '../assets/css/manutenzione.css'

const Manutenzione = () => {

    return (
        <div className='manutenzione'>
            <div className="error-image">
                <h1>👨‍🔧</h1>
            </div>
            <div className="error-msg-container">
                <h1>We're working on this account now!</h1>
                <p>We expect this outage to last about 15 minutes. If you continue to see this page, please contact us via email at support@privateprep.com.</p>
                <p>We apologize for any inconvenience.</p>
            </div>
        </div>

    )
}

export default Manutenzione