import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux';

const Menu = ({ data }) => {

	// Recupero la lingua
	const lang = useSelector(store => store.infoSlice.lang)
	const [open, setOpen] = useState(false)

	const menuList = data['menu-principale']

	const renderMenu = (items) => {
		return items && Object.entries(items).map((item) => {
			const { id, nome, permalink, virtual } = item[1]
			const subMenu = item[1]['sub-menu']
			return (
				<li key={id}>
					{!subMenu || <label htmlFor={`sm${id}`}> <i className="ion-android-arrow-dropdown"></i></label>}
					{
						virtual ?
							<span className='empty'>
								<span>{nome}</span>
							</span>
							:
							<Link to={`${lang}/${permalink}`} onClick={() => setOpen(false)}>
								<span>{nome}</span>
							</Link>
					}
					{!subMenu || <input type="checkbox" id={`sm${id}`} />}
					{!subMenu || <ul className="sub-menu">{renderMenu(subMenu)}</ul>}
				</li>
			)
		})
	}

	const handleMenuOpen = () => {
		setOpen(!open)
	}

	return (
		<div className={`menu open-${open}`}>
			<nav>
				<ul className="menu-box">
					<li>
						<Link to={`${lang}/`}>
							<span>Home</span>
						</Link>
					</li>
					{renderMenu(menuList)}
				</ul>
				<ul className="hamburger" onClick={() => handleMenuOpen()}>
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</nav>
		</div>
	)
}

export default Menu