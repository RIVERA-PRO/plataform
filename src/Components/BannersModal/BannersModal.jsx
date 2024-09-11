import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './BannersModal.css';
import baseURL from '../url';
import link from '../link';
import alt from '../alt';
import { Link as Anchor } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
export default function BannersModal() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [publicacion, setPublicacion] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const isModalClosed = sessionStorage.getItem('modalClosedPublicacion');
        if (!isModalClosed) {
            setTimeout(() => {
                cargarPublicaciones();
                cargarCategorias()
            }, 2000);
        }
    }, []);

    const handleCloseModal = () => {
        sessionStorage.setItem('modalClosedPublicacion', 'true');
        setModalIsOpen(false);
    };

    const cargarPublicaciones = () => {
        fetch(`${baseURL}/publicacionesFront.php`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                const publicacionesData = data?.publicaciones;
                if (publicacionesData && publicacionesData.length > 0) {
                    const randomIndex = Math.floor(Math.random() * publicacionesData.length);
                    setPublicacion(publicacionesData[randomIndex]);
                    setModalIsOpen(true);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error al cargar publicaciones:', error);
                setLoading(false);
            });
    };
    const cargarCategorias = () => {
        fetch(`${baseURL}/categoriasGet.php`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                setCategorias(data.categorias || []);
            })
            .catch(error => console.error('Error al cargar categorías:', error));
    };
    const removeAccents = (str) => {
        if (!str) return ''; // Maneja casos en los que str sea undefined o null
        const accents = /[\u0300-\u036f]/g;
        return str.normalize("NFD").replace(accents, "");
    };
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={handleCloseModal}
            className="modal-dev"
            overlayClassName="overlay-dev"
            ariaHideApp={false}
        >
            <div className='modal-dev-contain'>
                {loading ? (
                    <div className='loadingBanner'>
                        {/* Loading spinner or message */}
                    </div>
                ) : (
                    publicacion && (
                        <div className='banner-dev-modal'>
                            <img src={publicacion?.imagen1 || publicacion?.imagen2 || publicacion?.imagen3 || publicacion?.imagen4} alt={`publicacion-${publicacion.titulo} - ${alt}`} />
                            <div className='product-slide-text'>

                                <div className='deColumnlide'>
                                    <h3>{publicacion.titulo}</h3>
                                    <strong>  <FontAwesomeIcon icon={faMapMarkerAlt} /> {publicacion.estado} - {publicacion.municipio}</strong>
                                    <strong>{
                                        categorias
                                            .filter(categoriaFiltrada => categoriaFiltrada.idCategoria === publicacion.idCategoria)
                                            .map(categoriaFiltrada => (
                                                <span>  <FontAwesomeIcon icon={faStar} />  {categoriaFiltrada.categoria}</span>

                                            ))
                                    }</strong>
                                    <span>{publicacion.descripcion}</span>
                                </div>

                                <Anchor to={`/${link}/${removeAccents(categorias.find(cat => cat.idCategoria === publicacion.idCategoria)?.categoria?.replace(/\s+/g, '-') || '')}/${removeAccents(publicacion?.estado?.replace(/\s+/g, '-'))}/${publicacion?.idPublicacion}/${removeAccents(publicacion?.titulo?.replace(/\s+/g, '-'))}`}>
                                    Ver más
                                </Anchor>
                            </div>
                        </div>
                    )
                )}
            </div>
        </Modal>
    );
}
