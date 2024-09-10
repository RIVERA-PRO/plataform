import React, { useEffect, useState, useRef } from 'react';
import './CardsSection.css'
import { Link as Anchor } from 'react-router-dom';
import logo from '../../images/logo.png'
import baseURL from '../url';

export default function CardsSection() {
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
        <div>

            <div className='cardProfile'>
                <img src={logo} alt="motos de segunda" />
                <h2>{contactos.nombre}</h2>

                <Anchor to={`mailto:${contactos.email}`} target="_blank">{contactos.email}</Anchor>
                <Anchor to={`https://www.google.com/maps?q=${encodeURIComponent(contactos.direccion)}`} target="_blank">{contactos.direccion}</Anchor>
            </div>

        </div>
    )
}
