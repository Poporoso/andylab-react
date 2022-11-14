import React from 'react'
import { Link } from 'react-router-dom'

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApiLingue } from '../store/lingueSlice'

const Lingue = () => {

	const state = useSelector(state => state)
	const lingueList = state.menuSlice.data
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(
			getApiLingue(`api/it/components/lingue/`)
		)
	}, [dispatch])

	return (
		<React.Fragment>
			<h2>Lingue</h2>
			{
				lingueList && Object.entries(lingueList).map((item) => {
					return (
						<Link key={item[1].id} to={`${item[1].permalink}/`}>
							{item[1].nome}
						</Link>
					)
				})       
			}
		</React.Fragment>
	)
}

export default Lingue