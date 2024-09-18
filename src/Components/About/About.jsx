import React from 'react'
import './About.css'
import logo from '../../images/logo.png'

export default function About() {
    return (
        <div className='titleSectionText'>
            <img src={logo} alt='Putas México - Mamis Vip México' />

            <h2>
                Mamis Vip México
            </h2>
            <h3>Putas México</h3>
            <span>
                <strong> Putas México - Mamis Vip México</strong> somos una plataforma de hospedaje web para ANUNCIOS CLASIFICADOS PORNO verificados que conecta de forma independiente al Usuario con el Anunciante desde el año 2009 con sede en Victoria, Seychelles para la comunidad mexicana.
            </span>
            <span>Putas México - Escorts México - Escorts Gay México- Trans y Travestis México - Masajes Eróticos México - Gigolos México- Contactos México - Servicios Virtuales México - Sex Shop México - Platinum México</span>
            <span>Encuentra trabajadoras sexuales y servicios de acompañantes en México disponibles las 24 horas, con total discreción y una amplia variedad de opciones para satisfacer tus necesidades.</span>
            <a href={'/mamisvip/nosotros'}>
                Ver más
            </a>

        </div>
    )
}
