import React from 'react'
import { Link } from 'react-router-dom'

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApiLingue } from '../store/lingueSlice'

const Lingue = (props) => {

	const lang = props.lang

	const state = useSelector(state => state)
	const lingueList = state.lingueSlice.data
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(
			getApiLingue(`api/${lang}/components/lingue/`)
		)
	}, [dispatch, lang])

	return (
		<React.Fragment>
			<h2>Lingue presenti</h2>
			{
				lingueList && lingueList.map((item) => {
					return (
						<Link key={item.id_lingua} to={`${item.abbreviazione_lingua}/`} className={lang === item.abbreviazione_lingua ? 'active' : null }>
							{item.nome_lingua}
						</Link>
					)
				})
			}
		</React.Fragment>
	)
}

export default Lingue