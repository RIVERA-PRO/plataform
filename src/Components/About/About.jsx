import React from 'react'
import './About.css'
import logo from '../../images/logo.png'

export default function About() {
    return (
        <div className='titleSectionText'>
            <img src={logo} alt='   Mamis Vip México' />

            <h2>
                Mamis Vip México
            </h2>

            <span>
                Mamis VIP México somos una plataforma de hospedaje web para ANUNCIOS CLASIFICADOS PORNO verificados que conecta de forma independiente al Usuario con el Anunciante desde el año 2009 con sede en Victoria, Seychelles para la comunidad mexicana.
            </span>
            <a href={'/mamisvip/nosotros'}>
                Ver más
            </a>

        </div>
    )
}
