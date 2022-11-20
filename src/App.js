import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { getApiInfo } from './store/dataInfoSlice';

/** Components */
import { systemLanguage } from './helper/systemLanguage';
import NavbarBlock from "./components/NavbarBlock"

/** Pages */
import Home from "./pages/Home"
import Pages from "./pages/Pages"
import Camere from "./pages/Camere"

import Blog from "./pages/Blog"
import BlogArticle from './pages/BlogArticle';

import Annunci from "./pages/Annunci"
import Eventi from "./pages/Eventi"
import Servizi from "./pages/Servizi"
import Offerte from "./pages/Offerte"
import Catalogo from "./pages/Catalogo"
import Booking from "./pages/Booking"

import './assets/css/style.css'

const App = () => {

	const dispatch = useDispatch()
	const store = useSelector((state) => state)
	const data = store.infoSlice.data

	/** Gestione lingua */
	const location = useLocation();
	const target = systemLanguage(location)
	const lang = target.lang;

	useMemo(() => {
		dispatch(
			getApiInfo(`${lang}/components/all/`)
		)
	}, [dispatch, lang])

    return (
		<>
            { data && <NavbarBlock data={data} lang={lang} />}
			<Routes>
				<Route path={`${lang}/`} element={<Home lang={lang} />} />

				<Route path={`${lang}/blog/`} element={<Blog lang={lang} />} />
				<Route path={`${lang}/blog/:data/:title-:id/`} element={<BlogArticle />} />

				<Route path={`${lang}/booking/`} 	element={<Booking />} />
				<Route path={`${lang}/camere/`} 	element={<Camere lang={lang} />} />
				<Route path={`${lang}/annunci/`} 	element={<Annunci lang={lang} />} />
				<Route path={`${lang}/eventi/`} 	element={<Eventi lang={lang} />} />
				<Route path={`${lang}/offerte/`}	element={<Offerte lang={lang} />} />
				<Route path={`${lang}/servizi/`}	element={<Servizi lang={lang} />} />
				<Route path={`${lang}/catalogo/`} 	element={<Catalogo lang={lang} />} />
				<Route path={`${lang}/*`} 			element={<Pages lang={lang} />} />
				<Route path="*" 					element={<Navigate to={`${lang}/`} />} />
			</Routes>
		</>
    );
}

export default App;
