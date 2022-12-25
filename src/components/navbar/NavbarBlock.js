import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import Lingue from '../block/Lingue';
import Menu from '../menu/Menu'

import logo from '../../assets/images/logo.svg'

const NavbarBlock = ({ data }) => {

    return (
        data &&
        <section className='nav-menu'>
            <div className='header-menu'>
                <div className='header-menu__logo'>
                    <img src={logo} alt="AndyLab" />
                </div>
                <div className='header-menu__menu'>
                    <nav className="me-auto">
                        {data.menu && <Menu data={data.menu} />}
                    </nav>
                </div>
                <div className='header-menu__lang'>
                    {data.lingue && <Lingue data={data.lingue} />}
                </div>
            </div>
        </section>
    )
}

export default NavbarBlock