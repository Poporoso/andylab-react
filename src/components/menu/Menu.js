import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowDownRight } from "react-icons/fi";

import { useEffect } from "react";
import { useSelector } from 'react-redux';

const Menu = ({ data }) => {

	// Recupero la lingua
	const lang = useSelector(store => store.infoSlice.lang)

	//const [listCheck, setListCheck] = useState([])
	/*
		const handlerClickMenu = () => {
			document.querySelectorAll('#sm-menu').checked = false
			Object.keys(listCheck).map((el) => {
				return (
					listCheck[el].checked = false
				)
			})
		}
		*/

	const menuList = data['menu-principale']

	const renderMenu = (items) => {
		return items && Object.entries(items).map((item) => {
			const { id, nome, permalink, virtual } = item[1]
			const subMenu = item[1]['sub-menu']
			return (
				<li key={id}>
					{!subMenu || <label htmlFor={`sm${id}`}> <FiArrowDownRight /></label>}
					{
						virtual ?
							<span className='empty'>
								<span>{nome}</span>
							</span>
							:
							<Link to={`${lang}/${permalink}`}>
								<span>{nome}</span>
							</Link>
					}
					{!subMenu || <input type="checkbox" id={`sm${id}`} />}
					{!subMenu || <ul className="sub-menu">{renderMenu(subMenu)}</ul>}
				</li>
			)
		})
	}

	useEffect(() => {
		//const checkBox = document.querySelectorAll('input')
		//setListCheck(checkBox)
	}, [])

	return (
		<div className="menu">
			<nav>
				<ul className="menu-box">
					<li>
						<Link to={`${lang}/`}>
							<span>Home</span>
						</Link>
					</li>
					{renderMenu(menuList)}
				</ul>
			</nav>
		</div>
	)
}

export default Menu