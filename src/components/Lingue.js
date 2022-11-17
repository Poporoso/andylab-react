import React from 'react'
import { Link } from 'react-router-dom'
import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap';

const Lingue = ({ lang, data }) => {

	const lingueList = data

	return (
		<React.Fragment>
			<Dropdown variant="secondary">
				<DropdownToggle caret size="sm">
					{lang}
				</DropdownToggle>
				<DropdownMenu>
					{
						lingueList && lingueList.map((item) => {
							return (
								<DropdownItem key={item.id_lingua}>
									<Link to={`${item.abbreviazione_lingua}/`}>{item.nome_lingua}</Link>
								</DropdownItem>
							)
						})
					}
				</DropdownMenu>
			</Dropdown>
		</React.Fragment>
	)
}

export default Lingue