import React, { useEffect, useState, useRef } from 'react';
import baseURL from '../url';
import alt from '../alt';
import link from '../link';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faStar, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import './PublicacionesCardHome.css'
import 'react-toastify/dist/ReactToastify.css';
import { Link as Anchor } from "react-router-dom";
import { useMediaQuery } from '@react-hook/media-query';

SwiperCore.use([Navigation, Pagination, Autoplay]);

export default function PublicacionesCardHome() {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const swiperRef = useRef(null);
    const [publicaciones, setPublicacions] = useState([]);
    const isScreenLarge = useMediaQuery('(min-width: 900px)');

    // Función para eliminar acentos
    const removeAccents = (str) => {
        const accents = /[\u0300-\u036f]/g;
        return str.normalize("NFD").replace(accents, "");
    };


    useEffect(() => {
        cargarPublicaciones();
        cargarCategorias();


    }, []);


    const cargarPublicaciones = () => {
        fetch(`${baseURL}/publicacionesFront.php`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                // Ordenar de manera aleatoria las publicaciones
                const publicacionesAleatorias = data?.publicaciones?.sort(() => Math.random() - 0.5);
                setPublicacions(publicacionesAleatorias);
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

    const obtenerImagen = (item) => {
        if (item.imagen1) {
            return item.imagen1;
        } else if (item.imagen2) {
            return item.imagen2;
        } else if (item.imagen3) {
            return item.imagen3;
        } else if (item.imagen4) {
            return item.imagen4;
        }
        return null;
    };

    return (
        <div className='ProductsContain'>



            {loading ? (
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    slidesPerView={'auto'}
                    id='swiper_container_products'
                    autoplay={{ delay: 3000 }}
                >
                    <SwiperSlide id='swiperHomeLoading'>

                    </SwiperSlide>
                    <SwiperSlide id='swiperHomeLoading'>

                    </SwiperSlide>
                    <SwiperSlide id='swiperHomeLoading'>

                    </SwiperSlide>
                    <SwiperSlide id='swiperHomeLoading'>

                    </SwiperSlide>
                </Swiper>
            ) : (
                <div className='Products'>
                    {publicaciones?.length > 0 ? (
                        <div className='deFlexTitlesection'>
                            <h3>   <FontAwesomeIcon icon={faStar} />  Podría interesarte</h3>
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
                        id='swiper_container_products'
                        autoplay={{ delay: 3000 }}
                    >
                        {publicaciones?.slice(0, 10)?.filter(item => item.recomendado === "si").map(item => (
                            <SwiperSlide key={item.idPublicacion} id='SwiperSlide-scroll-products-masvendidos'>
                                <Anchor className='cardHome' to={`/${link}/${removeAccents(categorias.find(cat => cat.idCategoria === item.idCategoria)?.categoria || '').replace(/\s+/g, '-')}/${removeAccents(item?.estado || '').replace(/\s+/g, '-')}/${item.idPublicacion}/${removeAccents(item.titulo || '').replace(/\s+/g, '-')}`}>
                                    <img src={obtenerImagen(item)} alt={`${item?.titulo} - ${alt}`} />

                                    {
                                        categorias
                                            .filter(categoriaFiltrada => categoriaFiltrada.idCategoria === item.idCategoria)
                                            .map(categoriaFiltrada => (
                                                <h46 className="recomendado">  <FontAwesomeIcon icon={faStar} /> {categoriaFiltrada.categoria}</h46>

                                            ))
                                    }
                                    <div className='cardText'>
                                        <h4>{item.titulo}</h4>
                                        {isScreenLarge ? (
                                            <span>{item.descripcion.slice(0, 80)}</span>
                                        ) : (
                                            <span>{item.descripcion.slice(0, 60)}</span>
                                        )}
                                        <h5> <FontAwesomeIcon icon={faMapMarkerAlt} /> {item.estado} -  {item.municipio}</h5>
                                    </div>
                                </Anchor>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </div>
    );
}
