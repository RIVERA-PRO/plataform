import React, { useState, useEffect } from 'react';
import './InputSearch.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import baseURL from '../../url';

export default function InputSearch() {
    const [searchTerm, setSearchTerm] = useState("");
    const [modalOpen, setModalOpen] = useState(false);



    // Definir enlaces basados en el rol del usuario
    const enlaces = [
        { title: 'Banners', link: '/dashboard/banners' },
        { title: 'Usuarios', link: '/dashboard/usuarios' },
        { title: 'Contacto', link: '/dashboard/contacto' },
        { title: 'Publicaciones', link: '/dashboard/publicaciones' },
        { title: 'Categorias', link: '/dashboard/categorias' },

    ];



    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);
        setModalOpen(searchTerm !== "");
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="inputSearchDashboard">
            <div className='search'>
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="input"
                />
            </div>
            {modalOpen && (
                <div className="modalInput">
                    {enlaces.length > 0 ? (
                        enlaces.map((enlace, index) => (
                            <div key={index}>
                                <Link to={enlace.link} onClick={closeModal} className='link'>
                                    <FontAwesomeIcon icon={faSignOutAlt} />
                                    {enlace.title}
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p>No hay resultados.</p>
                    )}
                </div>
            )}
        </div>
    );
}
