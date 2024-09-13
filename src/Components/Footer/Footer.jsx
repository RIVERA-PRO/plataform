import React, { useEffect, useState, useRef } from 'react';
import './Footer.css'
import { Link as Anchor } from 'react-router-dom';
import contact from '../contact'
import logo from '../../images/logo.png'
import links from '../../Components/links';
import link from '../../Components/link';
import dominios from '../../Components/dominios';
import alt from '../alt'
import logo2 from '../../images/stop.png'
export default function Footer() {

    const contacto = contact[0]



    return (
        <div className='FooterContain'>
            <div className='Footer'>
                <div className='footerText'>
                    <Anchor to={`/`} className='logo'>
                        <img src={logo} alt={alt} className='logoAtuh' />
                    </Anchor>
                    <h2>{contacto?.nombre}</h2>

                </div>
                <div className='footerText'>
                    <h3>Nosotros</h3>
                    <p>
                        {contacto?.nosotros}
                    </p>

                </div>
                <div className='footerText'>
                    <h3>Sitios Alternos</h3>

                    {
                        dominios.map(item => (
                            <Anchor
                                key={item}
                                to={`https://${item}`}
                            >
                                {item?.replace(/-/g, ' ')}
                            </Anchor>
                        ))
                    }
                </div>


                <div className='footerText' id='enlace'>
                    <h3>Enlaces</h3>
                    {
                        links.map(item => (
                            <a
                                key={item}
                                href={`/${link}/${item}`}
                            >
                                {item?.replace(/-/g, ' ')}
                            </a>
                        ))
                    }
                </div>
            </div>
            <div className='trata'>
                <img src={logo2} alt="" />
                <p>La trata de personas, la pedofilia y el estupro es aborrecible, <strong>{alt}</strong> trabaja incansablemente para garantizar que nuestra plataforma no sea utilizada por traficantes o cualquier persona que limite las libertades de otros.
                    Si tú o alguien que conoces necesita ayuda, por favor visita trafficking.help para encontrar las organizaciones en tu país que puedan colaborar.</p>
            </div>
            <p className='COPYRIGHT'>© COPYRIGHT 2024 </p>
        </div >
    )
}
