import React, { useEffect, useState, useRef } from 'react';
import baseURL from '../url';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faAngleDoubleRight, faHeart } from '@fortawesome/free-solid-svg-icons';
import './Publicaciones.css'
import 'react-toastify/dist/ReactToastify.css';
import ProductosLoading from '../ProductosLoading/ProductosLoading';
import { Link as Anchor } from "react-router-dom";


SwiperCore.use([Navigation, Pagination, Autoplay]);

export default function Publicaiones() {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const categoriasRefs = useRef([]);



    useEffect(() => {
        cargarPublicaciones();
    }, []);

    const cargarPublicaciones = () => {
        fetch(`${baseURL}/publicacionesGet.php`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                const categoriasMap = new Map();
                data.publicaciones.forEach(publicacion => {
                    const categoria = publicacion.categoria;
                    if (categoriasMap.has(categoria)) {
                        categoriasMap.get(categoria).push(publicacion);
                    } else {
                        categoriasMap.set(categoria, [publicacion]);
                    }
                });
                const categoriasArray = Array.from(categoriasMap, ([categoria, publicaciones]) => ({ categoria, publicaciones }));
                setCategorias(categoriasArray);
                setLoading(false);
            })
            .catch(error => console.error('Error al cargar publicaciones:', error));
    };

    const obtenerImagen = (item) => {
        return item.imagen1 || null;
    };

    return (
        <div className='PublicacionesContain'>
            <div>
                {loading ? (
                    <ProductosLoading />
                ) : (
                    <div>
                        {categorias.map(({ categoria, publicaciones }, index) => (
                            <div key={categoria} className='categoriSection' ref={ref => categoriasRefs.current[index] = ref}>
                                <div className='deFlexTitlesection'>
                                    <h3>{categoria}</h3>
                                    <FontAwesomeIcon icon={faAngleDoubleRight} />
                                </div>

                                <Swiper
                                    effect={'coverflow'}
                                    grabCursor={true}
                                    slidesPerView={'auto'}
                                    id='swiper_container_products'
                                >
                                    {publicaciones.map(item => (
                                        <SwiperSlide id='SwiperSlide-scroll-products-masvendidos' key={item.idPublicacion}>
                                            <Anchor className='cardProdcutmasVendido' to={`/blog/${item.idPublicacion}/${item.titulo.replace(/\s+/g, '-')}`}>
                                                <img src={obtenerImagen(item)} alt="imagen" />
                                                <div className='cardText'>
                                                    <h4>{item.titulo}</h4>
                                                    <span>{item.descripcion}</span>
                                                    <h4>{new Date(item?.createdAt).toLocaleDateString()}</h4>
                                                </div>
                                            </Anchor>
                                        </SwiperSlide>
                                    ))}

                                </Swiper>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
