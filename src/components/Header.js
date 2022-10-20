import React from 'react';

//Cria os links HTML
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';

//Importa o arquivo CSS
import './Header.css'

//Importa as imagens utilizadas na página
import logo from '../assets/logo.svg';
import camera from '../assets/camera.svg';


export default function Header() {
  return (
    <header id="main-header">
        <div className="header-content">
            {/* <Link to="."> */}
                <img src={logo} alt="imagem" />
            {/* </Link> */}
            {/* <Link to="new"> */}
                <img src={camera} alt="Enviar" />
            {/* </Link> */}
        </div>
    </header>
  );
}
