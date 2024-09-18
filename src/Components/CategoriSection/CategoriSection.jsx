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
        fetch(`${baseURL}/publicacionesFront.php`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                setPublicacions(data?.publicaciones);
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
                setCategorias(data?.categorias || []);
            })
            .catch(error => console.error('Error al cargar categorías:', error));
    };

    const openModal = (categoria) => {
        setSelectedCategoria(categoria);

        // Filtrar las publicaciones por idCategoria
        const publicacionesDeCategoria = publicaciones?.filter(publicacion => publicacion?.idCategoria === categoria?.idCategoria);

        // Mapear los estados con el conteo de publicaciones
        const estadosFiltrados = estadosYmunicipios?.map(estado => {
            const count = publicacionesDeCategoria?.filter(publicacion => publicacion?.estado === estado?.nombre).length;
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
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    slidesPerView={'auto'}
                    id='swiper_container_categori'
                    autoplay={{ delay: 3000 }}
                >

                    <SwiperSlide id='cardCategoriLoading'>

                    </SwiperSlide>
                    <SwiperSlide id='cardCategoriLoading'>

                    </SwiperSlide>  <SwiperSlide id='cardCategoriLoading'>

                    </SwiperSlide>
                    <SwiperSlide id='cardCategoriLoading'>

                    </SwiperSlide>  <SwiperSlide id='cardCategoriLoading'>

                    </SwiperSlide>  <SwiperSlide id='cardCategoriLoading'>

                    </SwiperSlide>  <SwiperSlide id='cardCategoriLoading'>

                    </SwiperSlide>


                </Swiper>
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
                            const publicacionesDeCategoria = publicaciones?.filter(publicacion => publicacion?.idCategoria === item?.idCategoria);

                            return (
                                <SwiperSlide key={item.idCategoria} id='cardCategori'>
                                    <div className='cardCategori' onClick={() => openModal(item)}>
                                        <FontAwesomeIcon icon={faStar} />
                                        <strong>{item.categoria}</strong>

                                        ( {String(publicacionesDeCategoria?.length)?.replace(/\B(?=(\d{3})+(?!\d))/g, ".")} )
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
                        <Anchor to={`${link}/busqueda/${selectedCategoria?.categoria?.replace(/\s+/g, '-')}/${selectedCategoria?.idCategoria}/${estado.nombre?.replace(/\s+/g, '-')}`} key={estado?.nombre} className='estadosCard'>
                            <strong>  <FontAwesomeIcon icon={faMapMarkerAlt} />  {estado.nombre}</strong> <span>({estado.count})</span>
                        </Anchor>
                    ))}
                </div>

            </Modal>
        </div>
    );
}


// import React, { useEffect, useState } from 'react';
// import baseURL from '../url';
// import link from '../link';
// import estadosYmunicipios from '../estadosYmunicipios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar, faMapMarkerAlt, faArrowLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
// import Modal from 'react-modal';
// import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper/core';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper-bundle.css';
// import './CategoriSection.css';
// import { Link as Anchor } from "react-router-dom";

// SwiperCore.use([Navigation, Pagination, Autoplay]);

// export default function CategoriSection() {
//     const [categorias, setCategorias] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [publicaciones, setPublicacions] = useState([]);
//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const [selectedCategoria, setSelectedCategoria] = useState(null);
//     const [filteredStates, setFilteredStates] = useState([]);

//     // Números fijos aleatorios para cada categoría
//     const fixedNumbers = {
//         1: 202, // Ejemplo de categorías con números fijos
//         2: 114,
//         3: 103,
//         4: 112,
//         5: 126,
//         6: 153,
//         7: 179,
//         8: 108,
//         9: 125,
//         10: 116,
//     };

//     useEffect(() => {
//         cargarPublicaciones();
//         cargarCategorias();
//     }, []);

//     const cargarPublicaciones = () => {
//         fetch(`${baseURL}/publicacionesFront.php`, {
//             method: 'GET',
//         })
//             .then(response => response.json())
//             .then(data => {
//                 setPublicacions(data.publicaciones);
//                 setLoading(false);
//             })
//             .catch(error => console.error('Error al cargar publicaciones:', error));
//     };

//     const cargarCategorias = () => {
//         fetch(`${baseURL}/categoriasGet.php`, {
//             method: 'GET',
//         })
//             .then(response => response.json())
//             .then(data => {
//                 setCategorias(data.categorias || []);
//             })
//             .catch(error => console.error('Error al cargar categorías:', error));
//     };

//     const openModal = (categoria) => {
//         setSelectedCategoria(categoria);

//         // Filtrar las publicaciones por idCategoria
//         const publicacionesDeCategoria = publicaciones?.filter(publicacion => publicacion.idCategoria === categoria.idCategoria);

//         // Mapear los estados con el conteo de publicaciones
//         const estadosFiltrados = estadosYmunicipios?.map(estado => {
//             const count = publicacionesDeCategoria?.filter(publicacion => publicacion.estado === estado.nombre).length;
//             return { ...estado, count };
//         });

//         setFilteredStates(estadosFiltrados);
//         setModalIsOpen(true);
//     };

//     const closeModal = () => {
//         setModalIsOpen(false);
//         setSelectedCategoria(null);
//         setFilteredStates([]);
//     };

//     const formatNumber = (categoriaId) => {
//         // Obtiene el número fijo para la categoría
//         const fixedNumber = fixedNumbers[categoriaId] || 0; // Usa 0 como número por defecto si no se encuentra el id
//         // Número real de publicaciones
//         const realCount = publicaciones?.filter(publicacion => publicacion.idCategoria === categoriaId).length;
//         // Combina el número fijo con el número real, sin ceros adicionales
//         return `${fixedNumber}.${realCount?.toString().padStart(3, '0')}`;
//     };

//     return (
//         <div className='CategoriSection'>
//             {loading ? (
//                 <Swiper
//                     effect={'coverflow'}
//                     grabCursor={true}
//                     slidesPerView={'auto'}
//                     id='swiper_container_categori'
//                     autoplay={{ delay: 3000 }}
//                 >
//                     <SwiperSlide id='cardCategoriLoading'></SwiperSlide>
//                     <SwiperSlide id='cardCategoriLoading'></SwiperSlide>
//                     <SwiperSlide id='cardCategoriLoading'></SwiperSlide>
//                     <SwiperSlide id='cardCategoriLoading'></SwiperSlide>
//                     <SwiperSlide id='cardCategoriLoading'></SwiperSlide>
//                     <SwiperSlide id='cardCategoriLoading'></SwiperSlide>
//                     <SwiperSlide id='cardCategoriLoading'></SwiperSlide>
//                 </Swiper>
//             ) : (
//                 <div>
//                     {categorias?.length > 0 ? (
//                         <div className='deFlexTitlesection'>
//                             <h3>   <FontAwesomeIcon icon={faStar} /> Categorias</h3>
//                             <hr />
//                             <FontAwesomeIcon icon={faAngleDoubleRight} className='iconSection' />
//                         </div>
//                     ) : (
//                         <></>
//                     )}
//                     <Swiper
//                         effect={'coverflow'}
//                         grabCursor={true}
//                         slidesPerView={'auto'}
//                         id='swiper_container_categori'
//                         autoplay={{ delay: 3000 }}
//                     >
//                         {categorias?.map(item => {
//                             return (
//                                 <SwiperSlide key={item.idCategoria} id='cardCategori'>
//                                     <div className='cardCategori' onClick={() => openModal(item)}>
//                                         <FontAwesomeIcon icon={faStar} />
//                                         <strong>{item.categoria}</strong>
//                                         {/* Número fijo con el número real de publicaciones */}
//                                         ({formatNumber(item.idCategoria)})
//                                     </div>
//                                 </SwiperSlide>
//                             );
//                         })}
//                     </Swiper>
//                 </div>
//             )}

//             <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modalModal" overlayClassName="overlayModal">
//                 <div className='deFlexHeadModal'>
//                     <button onClick={closeModal} className='closeBack'> <FontAwesomeIcon icon={faArrowLeft} /> </button>
//                     <h2>  <FontAwesomeIcon icon={faStar} /> {selectedCategoria?.categoria}</h2>
//                 </div>

//                 <div className='estadosCards'>
//                     {filteredStates?.map(estado => {
//                         // Número fijo para la categoría seleccionada
//                         const fixedNumber = fixedNumbers[selectedCategoria?.idCategoria] || 0;
//                         // Número real de publicaciones en el estado
//                         const realCount = estado?.count;
//                         // Dividir el número fijo entre los 32 estados
//                         const dividedNumber = Math.floor(fixedNumber / 32);
//                         // Formatea el número para mostrar en el modal
//                         const formattedNumber = `${dividedNumber?.toString().padStart(1, '0')}.${realCount?.toString().padStart(3, '0')}`;

//                         return (
//                             <Anchor to={`${link}/busqueda/${selectedCategoria?.categoria?.replace(/\s+/g, '-')}/${selectedCategoria?.idCategoria}/${estado.nombre?.replace(/\s+/g, '-')}`} key={estado?.nombre} className='estadosCard'>
//                                 <strong>  <FontAwesomeIcon icon={faMapMarkerAlt} />  {estado.nombre}</strong> <span>({formattedNumber})</span>
//                             </Anchor>
//                         );
//                     })}
//                 </div>
//             </Modal>
//         </div>
//     );
// }



