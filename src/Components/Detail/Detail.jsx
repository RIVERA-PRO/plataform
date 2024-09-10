import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import './Detail.css'
import Modal from 'react-responsive-modal';
import Modal2 from 'react-modal';
import 'react-responsive-modal/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faMapMarkerAlt, faExternalLinkAlt, faStar, faTrash, faHeart } from '@fortawesome/free-solid-svg-icons';
import whatsappIcon from '../../images/wpp.png';
import { Link as Anchor, useNavigate, useLocation } from "react-router-dom";
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import baseURL from '../url';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DetailLoading from "../DetailLoading/DetailLoading";
import alt from '../alt';
import link from '../link';
import logo from '../../images/logo.png';
import { useMediaQuery } from '@react-hook/media-query';
export default function Detail() {
    const navigate = useNavigate();
    const swiperRef = useRef(null);
    SwiperCore.use([Navigation, Pagination, Autoplay]);
    const { idPublicacion } = useParams();
    const [publicacion, setPublicacion] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState("");
    const [publicaciones, setPublicaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [contactos, setContactos] = useState([]);
    const [favoritos, setFavoritos] = useState([]);
    const [contactoSeleccionado, setContactoSeleccionado] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const location = useLocation();
    const isScreenLarge = useMediaQuery('(min-width: 900px)');
    useEffect(() => {
        cargarPublicaciones();
        cargarContacto();
        cargarFavoritos();
        cargarCategoria()

    }, []);

    const cargarCategoria = () => {
        fetch(`${baseURL}/categoriasGet.php`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                setCategorias(data.categorias || []);
                console.log(data.categorias)
            })
            .catch(error => console.error('Error al cargar contactos:', error));
    };
    const cargarContacto = () => {
        fetch(`${baseURL}/contactoGet.php`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                setContactos(data.contacto || []);
            })
            .catch(error => console.error('Error al cargar contactos:', error));
    };

    const mezclarArray = (array) => {
        let arreglo = [...array];
        for (let i = arreglo.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arreglo[i], arreglo[j]] = [arreglo[j], arreglo[i]];
        }
        return arreglo;
    };


    const cargarPublicaciones = () => {
        fetch(`${baseURL}/publicacionesGet.php`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                const mezclados = mezclarArray(data.publicaciones || []);
                setPublicaciones(mezclados);
                console.log(mezclados);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error al cargar publicaciones:', error);
                setLoading(true);
            });
    };



    const cargarFavoritos = () => {
        const storedFavoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        setFavoritos(storedFavoritos);
    };

    useEffect(() => {
        const publica = publicaciones.find((e) => e.idPublicacion === parseInt(idPublicacion));
        setPublicacion(publica);
    }, [idPublicacion, publicaciones]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);




    function handleCompartirClick() {
        if (navigator.share) {
            navigator.share({
                title: document.title,
                text: `Echa un vistazo a esta publicacion de ${alt}`,
                url: window.location.href,
            })
                .then(() => console.log('Contenido compartido correctamente'))
                .catch((error) => console.error('Error al compartir:', error));
        } else {
            console.error('La API de compartir no está disponible en este navegador.');
        }
    }




    const goBack = () => {
        if (location.key !== 'default') {
            navigate(-1);
        } else {
            navigate('/');
        }
    };



    const agregarAFavoritos = (idPublicacion) => {
        const favList = [...favoritos];
        const index = favList.indexOf(idPublicacion);
        if (index === -1) {

            favList.push(idPublicacion);
            setFavoritos(favList);
            localStorage.setItem('favoritos', JSON.stringify(favList));
            console.log('publicacion agregada a favoritos');

        } else {

            favList.splice(index, 1);
            setFavoritos(favList);
            localStorage.setItem('favoritos', JSON.stringify(favList));
            console.log('publicacion eliminada de favoritos');
        }
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




    const handleWhatsappClick = () => {
        const phoneNumber = publicacion.telefono;
        const currentUrl = window.location.href; // Obtiene la URL actual
        const message = `Hola 🤝, he visto tu anuncio \n\n✅${publicacion.titulo} en:\n     *${alt}*: \n\n✅ ${currentUrl} \n\n y quisiera saber más información... 😊 gracias! `;
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };


    const handleCallClick = () => {

        const phoneNumber = publicacion.telefono;
        window.location.href = `tel:${phoneNumber}`;

    };


    if (!publicacion) {
        return <DetailLoading />;
    }


    return (


        <div className="detail">

            <ToastContainer />
            <div className="deFlexDetail">
                <button className="back" onClick={goBack}> <FontAwesomeIcon icon={faArrowLeft} /> </button>

                <div className="deFLexIcon">
                    <button onClick={() => agregarAFavoritos(publicacion.idPublicacion)} className='favoritos-btn'>
                        <FontAwesomeIcon icon={faHeart} style={{ color: favoritos.includes(publicacion.idPublicacion) ? 'red' : 'gray' }} />
                    </button>
                    <button className="share" onClick={handleCompartirClick}> <FontAwesomeIcon icon={faExternalLinkAlt} /> </button>
                </div>


            </div>
            <div className="detail-contain">
                <SwiperSlide id={"swiperDetail"} >
                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        loop={true}
                        slidesPerView={'auto'}
                        coverflowEffect={{ rotate: 0, stretch: 0, depth: 100, modifier: 2.5 }}
                        navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
                        autoplay={{ delay: 3000 }} // Cambia el valor de 'delay' según tus preferencias
                        pagination={{ clickable: true, }}
                        onSwiper={(swiper) => {
                            console.log(swiper);
                            swiperRef.current = swiper;
                        }}

                    >

                        {
                            publicacion.imagen1 ?
                                (
                                    <SwiperSlide  >
                                        <img
                                            src={publicacion.imagen1}
                                            alt={publicacion.titulo}
                                            className="imagen1"
                                            onClick={() => {
                                                setModalImage(publicacion.imagen1);
                                                setIsModalOpen(true);
                                            }}
                                        />
                                    </SwiperSlide>
                                ) : (
                                    <>
                                    </>
                                )
                        }

                        {
                            publicacion.imagen2 ?
                                (
                                    <SwiperSlide  >
                                        <img
                                            src={publicacion.imagen2}
                                            alt={publicacion.titulo}
                                            className="imagen2"
                                            onClick={() => {
                                                setModalImage(publicacion.imagen2);
                                                setIsModalOpen(true);
                                            }}
                                        />
                                    </SwiperSlide>
                                ) : (
                                    <>
                                    </>
                                )
                        }
                        {
                            publicacion.imagen3 ?
                                (
                                    <SwiperSlide  >
                                        <img
                                            src={publicacion.imagen3}
                                            alt={publicacion.titulo}
                                            className="img"
                                            onClick={() => {
                                                setModalImage(publicacion.imagen3);
                                                setIsModalOpen(true);
                                            }}
                                        />
                                    </SwiperSlide>
                                ) : (
                                    <>
                                    </>
                                )
                        }
                        {
                            publicacion.imagen4 ?
                                (
                                    <SwiperSlide  >
                                        <img
                                            src={publicacion.imagen4}
                                            alt={publicacion.titulo}
                                            className="imagen4"
                                            onClick={() => {
                                                setModalImage(publicacion.imagen4);
                                                setIsModalOpen(true);
                                            }}
                                        />
                                    </SwiperSlide>
                                ) : (
                                    <>
                                    </>
                                )
                        }
                    </Swiper>
                </SwiperSlide>
                <div className="textDetail">
                    <h2 className="title">{publicacion.titulo}</h2>
                    <hr />

                    <div className="deFLexBuet">

                        <Anchor to={`https://www.google.com/maps?q=${encodeURIComponent(publicacion.estado, publicacion.municipio)}`} target="_blank">   <FontAwesomeIcon icon={faMapMarkerAlt} /> {publicacion.estado} - {publicacion.municipio}</Anchor>

                    </div>
                    <div className="deFLexBuet">
                        {
                            categorias
                                .filter(categoriaFiltrada => categoriaFiltrada.idCategoria === publicacion.idCategoria)
                                .map(categoriaFiltrada => (
                                    <h4 className="categori">{categoriaFiltrada.categoria}</h4>

                                ))
                        }
                    </div>


                    <div className='deFlexBtnsData'>
                        <button onClick={handleCallClick} className='btnTel'><i className="fa fa-phone"></i>Teléfono </button>
                        <button onClick={handleWhatsappClick} className='btnWpp'><i className="fa fa-whatsapp"></i>WhatsApp </button>
                    </div>
                </div>
            </div>


            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                center
                classNames={{
                    modal: 'custom-modal',
                }}
            >
                <img src={modalImage} alt={publicacion.titulo} />
            </Modal>

            <div className="detailText">

                <div className="clasificationText">
                    <strong>Categoria  {
                        categorias
                            .filter(categoriaFiltrada => categoriaFiltrada.idCategoria === publicacion.idCategoria)
                            .map(categoriaFiltrada => (
                                <span>{categoriaFiltrada.categoria}</span>

                            ))
                    }</strong>
                    <strong>Estado   <span>{publicacion.estado}</span></strong>
                    <strong>Municipio   <span>{publicacion.municipio}</span></strong>
                    <strong>Teléfono <span>{publicacion.telefono}</span></strong>
                </div>
                <p>{publicacion.descripcion}</p>

            </div>

            <h3 className="titleSection">Vínculos que podrían interesarte</h3>

            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                slidesPerView={'auto'}
                id='swiper_container_products'
                autoplay={{ delay: 3000 }}
            >
                {publicaciones?.slice(0, 10)?.map(item => (
                    <SwiperSlide key={item.idPublicacion} id='SwiperSlide-scroll-products-masvendidos'>
                        <a class='cardProdcutmasVendido' href={`/${link}/${item.idPublicacion}/${item.titulo.replace(/\s+/g, '-')}`}>
                            <img src={obtenerImagen(item)} alt={`${item?.titulo} - ${alt}`} />
                            <h6 className='recomendado'>Recomendado</h6>
                            <div className='cardText'>
                                <h4>{item.titulo}</h4>
                                {isScreenLarge ?
                                    <>
                                        <span>{item.descripcion.slice(0, 90)}</span>
                                    </> :
                                    <>
                                        <span>{item.descripcion.slice(0, 60)}</span>
                                    </>}
                                <h5> <FontAwesomeIcon icon={faMapMarkerAlt} /> {item.estado} -  {item.municipio}</h5>
                            </div>
                        </a>
                    </SwiperSlide>
                ))}
            </Swiper>

        </div >

    )
}





