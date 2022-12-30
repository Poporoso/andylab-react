import React, { useEffect, useState } from 'react'
import Lingue from '../block/Lingue';
import Menu from '../menu/Menu'

import logo from '../../assets/images/logo.svg'
import UserPanel from '../user/UserPanel';

const NavbarBlock = ({ data }) => {

    const [stickyClass, setStickyClass] = useState('');

    useEffect(() => {
        window.addEventListener('scroll', stickNavbar);
        return () => window.removeEventListener('scroll', stickNavbar);
    }, []);

    const stickNavbar = () => {
        if (window !== undefined) {
            let windowHeight = window.scrollY;
            windowHeight > 188 ? setStickyClass('sticky') : setStickyClass('');
        }
    };

    return (
        data &&
        <section className={`nav-menu ${stickyClass}`}>
            <div className='header-menu'>
                <div className='header-menu__logo'>
                    <img src={logo} alt="AndyLab" />
                </div>
                <div className='header-menu__menu'>
                    <nav className="me-auto">
                        {data.menu && <Menu data={data.menu} />}
                    </nav>
                </div>
                <div className='header-menu__user'>
                    <UserPanel />
                </div>
                <div className='header-menu__lang'>
                    {data.lingue && <Lingue data={data.lingue} />}
                </div>
            </div>
        </section>
    )
}

export default NavbarBlock