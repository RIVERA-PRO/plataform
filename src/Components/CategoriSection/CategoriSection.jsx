import React, { useEffect, useState } from 'react';
import baseURL from '../url';
import link from '../link';
import estadosYmunicipios from '../estadosYmunicipios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMapMarkerAlt, faArrowLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import './CategoriSection.css'
import { Link as Anchor } from "react-router-dom";
SwiperCore.use([Navigation, Pagination, Autoplay]);

export default function CategoriSection() {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [publicaciones, setPublicacions] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedCategoria, setSelectedCategoria] = useState(null);
    const [filteredStates, setFilteredStates] = useState([]);

    useEffect(() => {
        cargarPublicaciones();
        cargarCategorias();
    }, []);

    const cargarPublicaciones = () => {
        fetch(`${baseURL}/publicacionesGet.php`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                setPublicacions(data.publicaciones);
                setLoading(false);
            })
            .catch(error => console.error('Error al cargar publicaciones:', error));
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

    const openModal = (categoria) => {
        setSelectedCategoria(categoria);

        // Filtrar las publicaciones por idCategoria
        const publicacionesDeCategoria = publicaciones.filter(publicacion => publicacion.idCategoria === categoria.idCategoria);

        // Mapear los estados con el conteo de publicaciones
        const estadosFiltrados = estadosYmunicipios.map(estado => {
            const count = publicacionesDeCategoria.filter(publicacion => publicacion.estado === estado.nombre).length;
            return { ...estado, count };
        });

        setFilteredStates(estadosFiltrados);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedCategoria(null);
        setFilteredStates([]);
    };

    return (
        <div className='CategoriSection'>
            {loading ? (
                <></>
            ) : (
                <div>
                    {categorias?.length > 0 ? (
                        <div className='deFlexTitlesection'>
                            <h3>   <FontAwesomeIcon icon={faStar} /> Categorias</h3>
                            <hr />
                            <FontAwesomeIcon icon={faAngleDoubleRight} className='iconSection' />
                        </div>
                    ) : (
                        <></>
                    )}
                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        slidesPerView={'auto'}
                        id='swiper_container_categori'
                        autoplay={{ delay: 3000 }}
                    >
                        {categorias?.map(item => {
                            // Filtrando las publicaciones que pertenecen a la categoría actual
                            const publicacionesDeCategoria = publicaciones.filter(publicacion => publicacion.idCategoria === item.idCategoria);

                            return (
                                <SwiperSlide key={item.idCategoria} id='cardCategori'>
                                    <div className='cardCategori' onClick={() => openModal(item)}>
                                        <FontAwesomeIcon icon={faStar} />
                                        <strong>{item.categoria}</strong>
                                        ({publicacionesDeCategoria.length})
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            )}


            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modalModal" overlayClassName="overlayModal">

                <div className='deFlexHeadModal'>
                    <button onClick={closeModal} className='closeBack'> <FontAwesomeIcon icon={faArrowLeft} /> </button>
                    <h2>  <FontAwesomeIcon icon={faStar} /> {selectedCategoria?.categoria}</h2>
                </div>

                <div className='estadosCards'>
                    {filteredStates.map(estado => (
                        <Anchor to={`${link}/${selectedCategoria?.categoria?.replace(/\s+/g, '-')}/${selectedCategoria?.idCategoria}/${estado.nombre?.replace(/\s+/g, '-')}`} key={estado?.nombre} className='estadosCard'>
                            <strong>  <FontAwesomeIcon icon={faMapMarkerAlt} />  {estado.nombre}</strong> <span>({estado.count})</span>
                        </Anchor>
                    ))}
                </div>

            </Modal>
        </div>
    );
}
