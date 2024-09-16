import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import './Detail.css'
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faMapMarkerAlt, faExternalLinkAlt, faStar, faUser, faImage, faHeart, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { Link as Anchor, useNavigate, useLocation } from "react-router-dom";
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import baseURL from '../url';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DetailLoading from "../DetailLoading/DetailLoading";
import alt from '../alt';
import link from '../link';
import { useMediaQuery } from '@react-hook/media-query';
import PalabrasClave from '../PalabrasClave/PalabrasClave'
import Visitas from '../Visitas/Visitas'
import ShareWeb from '../ShareWeb/ShareWeb'
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
    const [favoritos, setFavoritos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const location = useLocation();
    const isScreenLarge = useMediaQuery('(min-width: 900px)');
    useEffect(() => {
        cargarPublicaciones();
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
        fetch(`${baseURL}/publicacionesFront.php`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                const mezclados = mezclarArray(data.publicaciones || []);
                setPublicaciones(mezclados);
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
                text: `Echa un vistazo a esta publicacion de Mamis Vip México`,
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

        // Función para eliminar acentos
        const removeAccents = (str) => {
            const accents = /[\u0300-\u036f]/g;
            return str.normalize("NFD").replace(accents, "");
        };

        const tituloSinAcentos = removeAccents(publicacion.titulo);

        const message = `Hola 🤝, he visto tu anuncio \n\n✅${tituloSinAcentos} en:\n     *Mamis Vip México*: \n\n✅ ${currentUrl} \n\n y quisiera saber más información... 😊 gracias! `;
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };




    const handleCallClick = () => {

        const phoneNumber = publicacion.telefono;
        window.location.href = `tel:${phoneNumber}`;

    };

    const removeAccents = (str) => {
        const accents = /[\u0300-\u036f]/g;
        return str.normalize("NFD").replace(accents, "");
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
                    <div className="veifi">
                        <strong><FontAwesomeIcon icon={faUser} /> Usuario verificado      <FontAwesomeIcon icon={faImage} />Imagen verificada</strong>
                    </div>
                    <div className="deFLexBuet">
                        <Anchor to={`https://www.google.com/maps?q=${encodeURIComponent(publicacion.estado, publicacion.municipio)}`} target="_blank">   <FontAwesomeIcon icon={faMapMarkerAlt} /> {publicacion.estado} - {publicacion.municipio}</Anchor>
                    </div>

                    <div className="deFLexBuet">
                        {
                            categorias
                                .filter(categoriaFiltrada => categoriaFiltrada.idCategoria === publicacion.idCategoria)
                                .map(categoriaFiltrada => (
                                    <h4 className="categori">    <FontAwesomeIcon icon={faStar} /> {categoriaFiltrada.categoria}</h4>

                                ))
                        }
                    </div>


                    <div className='deFlexBtnsData'>
                        {/* <button onClick={handleCallClick} className='btnTel'><i className="fa fa-phone"></i>Teléfono </button> */}
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
                </div>
                <p>{publicacion.descripcion}</p>

            </div>

            <div className='deFlexTitlesection'>
                <h3>   <FontAwesomeIcon icon={faStar} /> Podría interesarte</h3>
                <hr />
                <FontAwesomeIcon icon={faAngleDoubleRight} className='iconSection' />
            </div>

            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                slidesPerView={'auto'}
                id='swiper_container_products'
                autoplay={{ delay: 3000 }}
            >
                {publicaciones?.slice(0, 10)?.map(item => (
                    <SwiperSlide key={item.idPublicacion} id='SwiperSlide-scroll-products-masvendidos'>
                        <a class='cardProdcutmasVendido' href={`/${link}/${removeAccents(categorias.find(cat => cat.idCategoria === item.idCategoria)?.categoria?.replace(/\s+/g, '-') || '')}/${removeAccents(item.estado.replace(/\s+/g, '-'))}/${item.idPublicacion}/${removeAccents(item.titulo.replace(/\s+/g, '-'))}`}>
                            <img src={obtenerImagen(item)} alt={`${item?.titulo} - Mamis Vip México`} />
                            <h6 className='recomendado'>Recomendado</h6>
                            <div className='cardText'>
                                <h4>{item.titulo}</h4>
                                {isScreenLarge ?
                                    <>
                                        <span>{item.descripcion.slice(0, 80)}</span>
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
            <Visitas />
            <PalabrasClave />
            <ShareWeb />
        </div >

    )
}





