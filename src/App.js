import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './asset/style.css'
import Menu from "./components/Menu"
import Home from "./pages/Home"
import Pages from "./pages/Pages"
import Camere from "./pages/Camere"
import Blog from "./pages/Blog"
import Annunci from "./pages/Annunci"
import Eventi from "./pages/Eventi"
import Servizi from "./pages/Servizi"
import Offerte from "./pages/Offerte"
import Catalogo from "./pages/Catalogo"
import Lingue from './components/Lingue';

const App = () => {

    return (
        <Router>
            <Menu />
			<Lingue />
			<Routes>
				<Route path={"/"} element={<Home />} />
				<Route path="blog/" element={<Blog />} />
				<Route path="camere/" element={<Camere />} />
				<Route path="annunci/" element={<Annunci />} />
				<Route path="eventi/" element={<Eventi />} />
				<Route path="offerte/" element={<Offerte />} />
				<Route path="servizi/" element={<Servizi />} />
				<Route path="catalogo/" element={<Catalogo />} />
				<Route path="*" element={<Pages />} />
			</Routes>
        </Router>
    );
}

export default App;
