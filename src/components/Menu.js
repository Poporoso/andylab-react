import React from 'react'
import { Link } from 'react-router-dom'

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApiMenu } from '../store/menuSlice'

const Menu = () => {

	const state = useSelector(state => state)
	const menuList = state.menuSlice.data['menu-principale']
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(
			getApiMenu(`api/it/components/menu/`)
		)
	}, [dispatch])

	return (
		<React.Fragment>
			<Link to="/">Home</Link>
			{
				menuList && Object.entries(menuList).map((item) => {
					return (
						<Link params={'dvdf'} key={item[1].id} to={`${item[1].permalink}/`}>
							{item[1].nome}
						</Link>
					)
				})       
			}
		</React.Fragment>
	)
}

export default Menu