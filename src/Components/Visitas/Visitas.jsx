import React, { useEffect, useState } from 'react';
import baseURL from '../url';
import './Visitas.css'
import contact from '../contact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
export default function Visitas() {
    const [visitas, setVisitas] = useState([]);
    const contacto = contact[0]
    useEffect(() => {
        cargarVistas();
    }, []);

    const cargarVistas = () => {
        fetch(`${baseURL}/visitas.php`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {

                setVisitas(data);
            })
            .catch(error => console.error('Error al cargar visitas:', error));
    };

    return (
        <div>
            {visitas.length > 0 ? (
                <div className='Visitas'>
                    <span>
                        <FontAwesomeIcon icon={faUser} /> Visitas en <strong>{contacto?.nombre}:    {visitas?.length}  </strong>
                    </span>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}
