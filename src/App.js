import React from 'react'
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

/** Components */
import { languageSite } from './helper/languageSite';
import Menu from "./components/Menu"
import Lingue from './components/Lingue';

/** Pages */
import Home from "./pages/Home"
import Pages from "./pages/Pages"
import Camere from "./pages/Camere"
import Blog from "./pages/Blog"
import Annunci from "./pages/Annunci"
import Eventi from "./pages/Eventi"
import Servizi from "./pages/Servizi"
import Offerte from "./pages/Offerte"
import Catalogo from "./pages/Catalogo"

import './asset/style.css'

const App = () => {

	/** Gestione lingua */
	const location = useLocation();
	const target = languageSite(location)

    return (
		<>
            <Menu lang={target.lang} />
			<Lingue lang={target.lang} />
			<Routes>
				<Route 
					path={`${target.lang}/`} 
					element={
						<Home target={target} />
					} 
				/>
				<Route path={`${target.lang}/blog/`} element={<Blog target={target} />} />
				<Route path={`${target.lang}/camere/`} element={<Camere target={target} />} />
				<Route path={`${target.lang}/annunci/`} element={<Annunci target={target} />} />
				<Route path={`${target.lang}/eventi/`} element={<Eventi target={target} />} />
				<Route path={`${target.lang}/offerte/`} element={<Offerte target={target} />} />
				<Route path={`${target.lang}/servizi/`} element={<Servizi target={target} />} />
				<Route path={`${target.lang}/catalogo/`} element={<Catalogo target={target} />} />
				<Route path={`${target.lang}/*`} element={<Pages target={target} />} />
				<Route path="*" element={ <Navigate to={`${target.lang}/`} /> } />
			</Routes>
		</>
    );
}

export default App;
