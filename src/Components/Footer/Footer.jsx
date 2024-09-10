import React, { useEffect, useState, useRef } from 'react';
import './Footer.css'
import { Link as Anchor } from 'react-router-dom';
import contact from '../contact'
import logo from '../../images/logo.png'
import baseURL from '../url';
export default function Footer() {
    const [contactos, setContactos] = useState([]);
    useEffect(() => {
        cargarContacto();

    }, []);


    const cargarContacto = () => {
        fetch(`${baseURL}/contactoGet.php`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                setContactos(data.contacto.reverse()[0] || []);
            })
            .catch(error => console.error('Error al cargar contactos:', error));
    };



    return (
        <div className='FooterContain'>
            <div className='Footer'>
                <div className='footerText'>
                    <Anchor to={`/`} className='logo'>
                        <img src={logo} alt="Motos de segunda logo" className='logoAtuh' />
                    </Anchor>
                    <h2>{contactos.nombre}</h2>

                </div>
                <div className='footerText'>
                    <h3>Nosotros</h3>

                    {
                        contact.map(item => (
                            <p>
                                {item.nosotros}
                            </p>
                        ))
                    }
                </div>

                <div className='footerText'>
                    <h3>Contacto</h3>
                    <Anchor to={`mailto:${contactos.email}`} target="_blank">{contactos.email}</Anchor>
                    <Anchor to={`tel:${contactos.telefono}`} target="_blank">{contactos.telefono}</Anchor>
                    <Anchor to={`https://www.google.com/maps?q=${encodeURIComponent(contactos.direccion)}`} target="_blank">{contactos.direccion}</Anchor>


                </div>
                <div className='footerText'>
                    <h3>Enlaces</h3>

                    <Anchor to={`/dashboard`} >Acceso</Anchor>
                </div>
            </div>
            <p className='COPYRIGHT'>© COPYRIGHT 2024 </p>
        </div >
    )
}
