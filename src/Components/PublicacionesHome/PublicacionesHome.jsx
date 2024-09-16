import React, { useEffect, useState, useRef } from 'react';
import baseURL from '../url';
import alt from '../alt';
import link from '../link';
import './PublicacionesHome.css';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight, faMapMarkerAlt, faStar } from '@fortawesome/free-solid-svg-icons';

import 'react-toastify/dist/ReactToastify.css';
import ProductosLoading from '../ProductosLoading/ProductosLoading';
import { Link as Anchor } from "react-router-dom";
import { useMediaQuery } from '@react-hook/media-query';

SwiperCore.use([Navigation, Pagination, Autoplay]);

export default function PublicacionesHome() {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fixedCategories, setFixedCategories] = useState(false);
    const categoriasRefs = useRef([]);
    const categoriasInputRef = useRef(null);
    const swiperRef = useRef(null);
    const [publicaciones, setPublicacions] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todo');
    const isScreenLarge = useMediaQuery('(min-width: 900px)');

    // Función para eliminar acentos
    const removeAccents = (str) => {
        const accents = /[\u0300-\u036f]/g;
        return str.normalize("NFD").replace(accents, "");
    };

    const handleClickCategoria = (categoria) => {
        setCategoriaSeleccionada(categoria);
    };

    useEffect(() => {
        cargarPublicaciones();
        cargarCategorias();

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        if (categoriasInputRef.current) {
            if (window.scrollY > categoriasInputRef.current.offsetTop) {
                setFixedCategories(true);
            } else {
                setFixedCategories(false);
            }
        }
    };

    const cargarPublicaciones = () => {
        fetch(`${baseURL}/publicacionesFront.php`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                const publicacionesPorCategoria = data?.publicaciones?.reduce((acc, publicacion) => {
                    const { idCategoria } = publicacion;
                    if (!acc[idCategoria]) {
                        acc[idCategoria] = [];
                    }
                    acc[idCategoria].push(publicacion);
                    return acc;
                }, {});

                let publicacionesSeleccionadas = [];

                Object.keys(publicacionesPorCategoria).forEach((idCategoria) => {
                    const publicacionesDeCategoria = publicacionesPorCategoria[idCategoria];
                    // Ordenar aleatoriamente las publicaciones de esta categoría y tomar hasta 10
                    const publicacionesAleatorias = publicacionesDeCategoria.sort(() => Math.random() - 0.5).slice(0, 10);
                    publicacionesSeleccionadas = [...publicacionesSeleccionadas, ...publicacionesAleatorias];
                });

                // Ordenar aleatoriamente todas las publicaciones seleccionadas y tomar un máximo de 35
                publicacionesSeleccionadas = publicacionesSeleccionadas.sort(() => Math.random() - 0.5).slice(0, 35);

                setPublicacions(publicacionesSeleccionadas);
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

    const categoriasConProductos = categorias.filter(categoria =>
        publicaciones?.some(publicacion => publicacion?.idCategoria === categoria?.idCategoria)
    );

    return (
        <div className='ProductsContain'>

            {publicaciones?.length > 0 && (
                <div className={`categoriasInputs ${fixedCategories ? 'fixed' : ''}`} ref={categoriasInputRef}>
                    <input
                        type="button"
                        value="Todo"
                        onClick={() => handleClickCategoria('Todo')}
                        style={{
                            backgroundColor: categoriaSeleccionada === 'Todo' ? '#752FB5' : '',
                            color: categoriaSeleccionada === 'Todo' ? '#fff' : '',
                            borderBottom: categoriaSeleccionada === 'Todo' ? '2px solid #752FB5' : 'none'
                        }}
                    />
                    {categoriasConProductos.map(({ categoria, idCategoria }) => (
                        <input
                            key={idCategoria}
                            type="button"
                            value={categoria}
                            onClick={() => handleClickCategoria(idCategoria)}
                            style={{
                                backgroundColor: categoriaSeleccionada === idCategoria ? '#752FB5' : '',
                                color: categoriaSeleccionada === idCategoria ? '#fff' : '',
                                borderBottom: categoriaSeleccionada === idCategoria ? '2px solid #752FB5' : 'none'
                            }}
                        />
                    ))}
                </div>
            )}

            {loading ? (
                <ProductosLoading />
            ) : (
                <div className='Products'>
                    {categoriaSeleccionada === 'Todo' && (
                        <>
                            {publicaciones?.some(item => item.recomendado === "si") && (
                                <div className='categoriSection'>
                                    <Swiper
                                        effect={'coverflow'}
                                        grabCursor={true}
                                        slidesPerView={'auto'}
                                        id='swiper_container_products'
                                        autoplay={{ delay: 3000 }}
                                    >
                                        {publicaciones?.slice(0, 10)?.filter(item => item.recomendado === "si").map(item => (
                                            <SwiperSlide key={item.idPublicacion} id='SwiperSlide-scroll-products-masvendidos'>
                                                <Anchor className='cardProdcutmasVendido' to={`/${link}/${removeAccents(categorias.find(cat => cat.idCategoria === item.idCategoria)?.categoria || '').replace(/\s+/g, '-')}/${removeAccents(item?.estado || '').replace(/\s+/g, '-')}/${item.idPublicacion}/${removeAccents(item.titulo || '').replace(/\s+/g, '-')}`}>
                                                    <img src={obtenerImagen(item)} alt={`${item?.titulo} - Mamis Vip México`} />
                                                    <h6 className='recomendado'>Recomendado</h6>
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

                            {categoriasConProductos?.map(({ categoria, idCategoria }) => (
                                <div key={idCategoria} className='categoriSection' ref={ref => categoriasRefs.current[categorias.findIndex(cat => cat.idCategoria === idCategoria)] = ref}>
                                    <div className='deFlexTitlesection'>
                                        <h3> <FontAwesomeIcon icon={faStar} /> {categoria}</h3>
                                        <hr />
                                        <button onClick={() => handleClickCategoria(idCategoria)}>
                                            Ver más
                                        </button>
                                    </div>

                                    <Swiper
                                        effect={'coverflow'}
                                        grabCursor={true}
                                        slidesPerView={'auto'}
                                        id='swiper_container_products'
                                    >
                                        {publicaciones?.filter(item => item.idCategoria === idCategoria).map(item => (
                                            <SwiperSlide id='SwiperSlide-scroll-products' key={item.idPublicacion}>
                                                <Anchor className='cardProdcutSelected' key={item.idPublicacion} to={`/${link}/${removeAccents(categoria || '').replace(/\s+/g, '-')}/${removeAccents(item?.estado || '').replace(/\s+/g, '-')}/${item.idPublicacion}/${removeAccents(item.titulo || '').replace(/\s+/g, '-')}`}>
                                                    <img src={obtenerImagen(item)} alt={`${item?.titulo} - Mamis Vip México`} />
                                                    <div className='cardTextSelected'>
                                                        <h4>{item.titulo}</h4>
                                                        {isScreenLarge ? (
                                                            <span>{item.descripcion.slice(0, 120)}</span>
                                                        ) : (
                                                            <span>{item.descripcion.slice(0, 60)}</span>
                                                        )}
                                                        <h5> <FontAwesomeIcon icon={faMapMarkerAlt} /> {item.estado} -  {item.municipio}</h5>
                                                        <FontAwesomeIcon icon={faAngleDoubleRight} className='iconCard' />
                                                    </div>
                                                </Anchor>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            ))}
                        </>
                    )}

                    <div className='categoriSectionSelected'>
                        {publicaciones
                            ?.filter(item => categoriaSeleccionada !== 'Todo' && item.idCategoria === categoriaSeleccionada)
                            ?.map(item => (
                                <Anchor key={item?.idPublicacion} to={`/${link}/${removeAccents(categorias?.find(cat => cat?.idCategoria === categoriaSeleccionada)?.categoria || '').replace(/\s+/g, '-')}/${removeAccents(item?.estado || '').replace(/\s+/g, '-')}/${item.idPublicacion}/${removeAccents(item.titulo || '').replace(/\s+/g, '-')}`} className='cardProdcutSelected'>
                                    <img src={obtenerImagen(item)} alt={`${item?.titulo} - Mamis Vip México`} />
                                    <div className='cardTextSelected'>
                                        <h4>{item.titulo}</h4>
                                        {isScreenLarge ? (
                                            <span>{item.descripcion.slice(0, 120)}</span>
                                        ) : (
                                            <span>{item.descripcion.slice(0, 60)}</span>
                                        )}
                                        <h5> <FontAwesomeIcon icon={faMapMarkerAlt} /> {item.estado} -  {item.municipio}</h5>
                                        <FontAwesomeIcon icon={faAngleDoubleRight} className='iconCard' />
                                    </div>
                                </Anchor>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
}
