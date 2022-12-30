import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { getApiInfo } from './store/dataInfoSlice';

/** Components */
import { systemLanguage } from './helper/Helper';
import NavbarBlock from "./components/navbar/NavbarBlock"

/** Pages */
import Home from "./pages/Home"
import Pages from "./pages/Pages"
import Camere from "./pages/camere/Camere"
import CameraDettaglio from './pages/camere/CameraDettaglio'

import Blog from "./pages/blog/Blog"
import BlogArticle from './pages/blog/BlogArticle';

import Annunci from "./pages/annunci/Annunci"
import AnnunciSearch from "./pages/annunci/AnnunciSearch"
import AnnuncioDettaglio from './pages/annunci/AnnuncioDettaglio'

import ServiziOfferteEventi from "./pages/ServiziOfferteEventi"
import ServiziOfferteEventiSingola from "./pages/ServiziOfferteEventiSingola"

/** Catalogo */
import Catalogo from "./pages/catalogo/Catalogo"
import CatalogoCategory from "./pages/catalogo/CatalogoCategory"
import ProdottoPage from './pages/catalogo/ProdottoPage';

import Booking from "./pages/booking/Booking"

import Login from "./pages/users/Login"
import Signup from './pages/users/Signup';
import Recovery from './pages/users/Recovery';
import SetNewPassword from './pages/users/SetNewPassword';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/main.css'
import Pages404 from './pages/404';

const App = () => {

	/** Gestione lingua */
	const location = useLocation();
	const target = systemLanguage(location)
	const lang = target.lang;

	const dispatch = useDispatch()
	const store = useSelector((state) => state)
	const data = store.infoSlice.data

	useMemo(() => {
		if (lang) {
			dispatch(
				getApiInfo({
					url: `${lang}/components/all/`,
					lang: lang
				})
			)
		}
	}, [dispatch, lang])

	return (
		<>
			<NavbarBlock data={data} />
			<Routes>
				<Route path={`:lang/`} element={<Home />} />
				<Route path={`:lang/booking/*`} element={<Booking />} />

				<Route path={`:lang/blog/`} element={<Blog />} />
				<Route path={`:lang/blog/:page/`} element={<Blog />} />
				<Route path={`:lang/blog/:section/:keyword/`} element={<Blog />} />
				<Route path={`:lang/blog/:section/:keyword/:page/`} element={<Blog />} />
				<Route path={`:lang/blog/:data/:title-:id/`} element={<BlogArticle />} />

				<Route path={`:lang/camere/`} element={<Camere />} />
				<Route path={`:lang/camere/:camera/`} element={<CameraDettaglio />} />

				<Route path={`:lang/annunci/`} element={<Annunci />} />
				<Route path={`:lang/annunci/:tipo/:nome-:id/`} element={<AnnuncioDettaglio />} />
				<Route path={`:lang/annunci/:search/`} element={<AnnunciSearch />} />
				<Route path={`:lang/annunci/:search/:page/`} element={<AnnunciSearch />} />

				<Route path={`:lang/users/login/`} element={<Login />} />
				<Route path={`:lang/users/signup/`} element={<Signup />} />
				<Route path={`:lang/users/recovery/`} element={<Recovery />} />
				<Route path={`:lang/users/recovery/:token/`} element={<SetNewPassword />} />

				<Route path={`:lang/catalogo/`} element={<Catalogo />} />
				<Route path={`:lang/catalogo/category/:category/`} element={<CatalogoCategory />} />
				<Route path={`:lang/catalogo/category/:category/:page/`} element={<CatalogoCategory />} />
				<Route path={`:lang/catalogo/prodotti/scheda/:name-:id/`} element={<ProdottoPage />} />

				<Route path={`:lang/eventi/`} element={<ServiziOfferteEventi type={`eventi`} />} />
				<Route path={`:lang/eventi/:page/`} element={<ServiziOfferteEventi type={`eventi`} />} />
				<Route path={`:lang/eventi/:data/:title-:id/`} element={<ServiziOfferteEventiSingola type={`eventi`} />} />

				<Route path={`:lang/offerte/`} element={<ServiziOfferteEventi type={`offerte`} />} />
				<Route path={`:lang/offerte/:page/`} element={<ServiziOfferteEventi type={`offerte`} />} />
				<Route path={`:lang/offerte/:data/:title-:id/`} element={<ServiziOfferteEventiSingola type={`offerte`} />} />

				<Route path={`:lang/servizi/`} element={<ServiziOfferteEventi type={`servizi`} />} />
				<Route path={`:lang/servizi/:page/`} element={<ServiziOfferteEventi type={`servizi`} />} />
				<Route path={`:lang/servizi/:data/:title-:id/`} element={<ServiziOfferteEventiSingola type={`servizi`} />} />

				{/**
				 * 
				 * 
				 * 
				 Pagina non trovata - 404
				 */}
				<Route path={`:lang/404/`} element={<Pages404 />} />
				{/**
				 * 
				 * 
				 * 
				 Solo pagine semplici
				 */}
				<Route path={`:lang/*`} element={<Pages />} />

				{/**
				 * 
				 * 
				 * 
				 Redirect in caso di mancanza di lingua
				 */}
				<Route path="*" element={<Navigate to={`${lang}/`} />} />
			</Routes>
		</>
	);
}

export default App;
