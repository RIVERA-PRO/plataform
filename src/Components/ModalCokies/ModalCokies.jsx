import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './ModalCokies.css';
import alt from '../../Components/alt';
import link from '../../Components/link';
import links from '../../Components/links';
import logo from '../../images/logo.png';
import { Link as Anchor } from 'react-router-dom';
import baseURL from '../url';

export default function ModalCokies() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        const cookiesAccepted = document.cookie.split('; ').find(row => row.startsWith('cookiesAccepted='));

        if (!cookiesAccepted) {
            setModalIsOpen(true);
        } else {
            // Si la cookie de aceptación está presente, se puede registrar la visita
            fetch(`${baseURL}/visitas.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'registerVisit' })
            })
                .then(response => response.json())
                .then(data => {
                    // console.log('Visita registrada:', data);
                })
                .catch(error => {
                    // console.error('Error al registrar visita:', error);
                });
        }
    }, []);

    const handleAcceptCookies = () => {
        // Guardar la cookie con expiración al final de la sesión
        document.cookie = "cookiesAccepted=true; path=/";

        // Registrar la visita
        fetch(`${baseURL}/visitas.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'registerVisit' })
        })
            .then(response => response.json())
            .then(data => {
                // console.log('Visita registrada:', data);
                setModalIsOpen(false);
            })
            .catch(error => {
                // console.error('Error al registrar visita:', error);
                setModalIsOpen(false); // Cierra el modal incluso si hay un error
            });
    };

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={handleAcceptCookies}
            className="modal-dev-cokies"
            overlayClassName="overlay-dev-cokies"
            ariaHideApp={false}
        >
            <div className='modal-dev-contain-cokies'>
                <img src={logo} alt={alt} />
                <h1>Bienvenido a {alt}</h1>
                <h4>El uso de este sitio es exclusivo para mayores de 18 años y se rige por las cláusulas:</h4>
                <button onClick={handleAcceptCookies} className="accept-button">
                    Soy mayor de edad y acepto
                </button>
                {
                    links.map(item => (
                        <Anchor
                            key={item}
                            to={`/${link}/${item}`}
                        >
                            {item?.replace(/-/g, ' ')}
                        </Anchor>
                    ))
                }
            </div>
        </Modal>
    );
}
