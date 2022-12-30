import React from 'react'
import { useSelector } from 'react-redux'

const UserPanel = () => {

    const userData = useSelector(store => store.userSlice.userData)

    return (
        <div className='user-panel'>{userData?.nome}</div>
    )
}

export default UserPanel