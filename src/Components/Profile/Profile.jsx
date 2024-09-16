import React, { useEffect, useState, useRef } from 'react';
import logo from '../../images/logo.png'
import './Profile.css'
import { Link as Anchor } from 'react-router-dom';
import baseURL from '../url';
import ShareWeb from '../ShareWeb/ShareWeb';
export default function Profile() {
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
    const [images, setImages] = useState([]);


    useEffect(() => {

        cargarBanners();
    }, []);

    const cargarBanners = () => {
        fetch(`${baseURL}/bannersGet.php`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                const bannerImages = data.banner.map(banner => banner.imagen);
                setImages(bannerImages);
            })
            .catch(error => {
                console.error('Error al cargar productos:', error)

            });
    };


    return (
        <div className='profileContain'>
            <div className='fondo'>
                <img src={images[0]} alt={`imagen`} />
            </div>

            <div className='profileText'>

                <img src={logo} alt="" />
                <h2>{contactos.nombre}</h2>
                <Anchor to={`mailto:${contactos.email}`} target="_blank">{contactos.email}</Anchor>
                <Anchor to={`https://www.google.com/maps?q=${encodeURIComponent(contactos.direccion)}`} target="_blank">{contactos.direccion}</Anchor>

                <ShareWeb />
            </div>

        </div>
    )
}
