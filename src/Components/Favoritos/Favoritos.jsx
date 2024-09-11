import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import baseURL from '../url';
import link from '../link';
import alt from '../alt';
import './Favoritos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faHeart, faMapMarkerAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import { Link as Anchor } from "react-router-dom";

// Función para eliminar acentos
const removeAccents = (str) => {
    const accents = /[\u0300-\u036f]/g;
    return str.normalize("NFD").replace(accents, "");
};

export default function Favoritos() {
    const [favoritos, setFavoritos] = useState([]);
    const [publicacion, setPublicacion] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        cargarPublicaciones();
        cargarFavoritos();
        cargarCategorias();
    }, [isFocused]);

    const cargarPublicaciones = () => {
        fetch(`${baseURL}/publicacionesFront.php`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                setPublicacion(data.publicaciones || []);
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

    const cargarFavoritos = () => {
        const storedFavoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        setFavoritos(storedFavoritos);
    };

    const obtenerImagen = (item) => {
        return item.imagen1 || item.imagen2 || item.imagen3 || item.imagen4 || null;
    };

    const openModal = () => {
        setModalIsOpen(true);
        setIsFocused(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setIsFocused(false);
    };

    const eliminar = (id) => {
        const updatedFavoritos = favoritos.filter(itemId => itemId !== id);
        setFavoritos(updatedFavoritos);
        localStorage.setItem('favoritos', JSON.stringify(updatedFavoritos));
    };

    return (
        <div>
            <button onClick={openModal} className='FavoriteIcon'><FontAwesomeIcon icon={faHeart} />    <span>Favoritos</span></button>

            <Modal
                isOpen={modalIsOpen}
                className="modal-cart"
                overlayClassName="overlay-cart"
                onRequestClose={closeModal}
            >
                <div className='deFLex'>
                    <button onClick={closeModal}><FontAwesomeIcon icon={faArrowLeft} /></button>
                    <button onClick={closeModal} className='deleteToCart'>Favoritos</button>
                </div>
                {favoritos?.length === 0 ? (
                    <p className='nohay'>No hay favoritos</p>
                ) : (
                    <div className="modal-content-cart">
                        {loading ? (
                            <p>Cargando...</p>
                        ) : (
                            <div>
                                {favoritos.map((id) => {
                                    const publicaci = publicacion.find(prod => prod.idPublicacion === id);
                                    if (!publicaci) return null;
                                    return (
                                        <div key={publicaci.idPublicacion} className='cardProductCart' >
                                            <Anchor to={`/${link}/${removeAccents(categorias.find(cat => cat.idCategoria === publicaci.idCategoria)?.categoria || '').replace(/\s+/g, '-')}/${removeAccents(publicaci?.estado || '').replace(/\s+/g, '-')}/${publicaci?.idPublicacion}/${removeAccents(publicaci?.titulo || '').replace(/\s+/g, '-')}`} onClick={closeModal} >
                                                <img src={obtenerImagen(publicaci)} alt={`${publicaci?.titulo} - ${alt}`} />
                                            </Anchor>
                                            <div className='cardProductCartText'>
                                                <h3>{publicaci.titulo}</h3>
                                                {
                                                    categorias
                                                        .filter(categoriaFiltrada => categoriaFiltrada?.idCategoria === publicaci?.idCategoria)
                                                        .map(categoriaFiltrada => (
                                                            <span key={categoriaFiltrada.idCategoria}> <FontAwesomeIcon icon={faStar} /> {categoriaFiltrada?.categoria}</span>
                                                        ))
                                                }
                                                <strong> <FontAwesomeIcon icon={faMapMarkerAlt} /> {publicaci.estado}- {publicaci.municipio}</strong>
                                            </div>
                                            <button onClick={() => eliminar(id)} className='deleteFav'><FontAwesomeIcon icon={faHeart} /></button>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
}
