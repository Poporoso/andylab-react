import React from 'react'
import { Link } from 'react-router-dom'

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApiMenu } from '../store/menuSlice'

const Menu = (props) => {

	const lang = props.lang

	const state = useSelector(state => state)
	// const lang = state.menuSlice.lang
	const menuList = state.menuSlice.data['menu-principale']
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(
			getApiMenu(`api/${lang}/components/menu/`)
		)
	}, [dispatch, lang])

	return (
		<React.Fragment>
			<Link to={`${lang}/`}>Home</Link>
			{
				menuList && Object.entries(menuList).map((item) => {
					return (
						<Link key={item[1].id} to={`${lang}/${item[1].permalink}/`}>
							{item[1].nome}
						</Link>
					)
				})       
			}
		</React.Fragment>
	)
}

export default Menu