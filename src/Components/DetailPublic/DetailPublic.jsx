import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import './DetailPublic.css'
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEnvelope, faExternalLinkAlt, faStar, faTrash, faHeart } from '@fortawesome/free-solid-svg-icons';
import whatsappIcon from '../../images/wpp.png';
import { Link as Anchor, useNavigate, useLocation } from "react-router-dom";
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import baseURL from '../url';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DetailLoading from "../DetailLoading/DetailLoading";
import contact from '../contact'
import logo from '../../images/logo.png';
export default function DetailPublic() {
    const navigate = useNavigate();
    const swiperRef = useRef(null);
    SwiperCore.use([Navigation, Pagination, Autoplay]);
    const { idPublicacion } = useParams();
    const [producto, setProducto] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState("");
    const [publicaciones, setPublicaciones] = useState([]);
    const [loading, setLoading] = useState(true);

    const location = useLocation();

    useEffect(() => {
        cargarPublicaciones();

    }, []);


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
                const productosMezclados = mezclarArray(data.publicaciones || []);
                setPublicaciones(productosMezclados);
                console.log(productosMezclados);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error al cargar publicaciones:', error);
                setLoading(true);
            });
    };


    useEffect(() => {
        const product = publicaciones.find((e) => e.idPublicacion === parseInt(idPublicacion));
        setProducto(product);
    }, [idPublicacion, publicaciones]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);




    function handleCompartirClick() {
        if (navigator.share) {
            navigator.share({
                title: document.title,
                text: 'Echa un vistazo a este producto',
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



    if (!producto) {
        return <DetailLoading />;
    }


    return (


        <div className="detail">

            <ToastContainer />
            <div className="deFlexDetail">
                <button className="back" onClick={goBack}> <FontAwesomeIcon icon={faArrowLeft} /> </button>
                <div className="deFLexIcon">

                    <button className="share" onClick={handleCompartirClick}> <FontAwesomeIcon icon={faExternalLinkAlt} /> </button>
                </div>
            </div>
            <div className="detail-contain-public">
                <div className="detailBlog">

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
                        id="detailImg"

                    >

                        {
                            producto.imagen1 ?
                                (
                                    <SwiperSlide  >
                                        <img
                                            src={producto.imagen1}
                                            alt={producto.titulo}
                                            className="imagen1"
                                            onClick={() => {
                                                setModalImage(producto.imagen1);
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
                            producto.imagen2 ?
                                (
                                    <SwiperSlide  >
                                        <img
                                            src={producto.imagen2}
                                            alt={producto.titulo}
                                            className="imagen2"
                                            onClick={() => {
                                                setModalImage(producto.imagen2);
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
                            producto.imagen3 ?
                                (
                                    <SwiperSlide  >
                                        <img
                                            src={producto.imagen3}
                                            alt={producto.titulo}
                                            className="img"
                                            onClick={() => {
                                                setModalImage(producto.imagen3);
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
                            producto.imagen4 ?
                                (
                                    <SwiperSlide  >
                                        <img
                                            src={producto.imagen4}
                                            alt={producto.titulo}
                                            className="imagen4"
                                            onClick={() => {
                                                setModalImage(producto.imagen4);
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

                    <div className="textDetail">
                        <h2 className="title">{producto.titulo}</h2>
                        <h4>{new Date(producto?.createdAt).toLocaleDateString()}</h4>
                        <hr />
                        <p>{producto.descripcion}</p>
                    </div>
                </div>

                <div className="blogContent">
                    {
                        contact.map(item => (
                            <div className='cardProfile'>

                                <img src={logo} alt="motos de segunda" />
                                <h3>{item.nombre}</h3>
                                <div className='socials'>
                                    <Anchor to={item.instagram} target="_blank"><i className='fa fa-instagram'></i></Anchor>
                                    <Anchor to={`tel:${item.telefono}`} target="_blank"><i className='fa fa-whatsapp'></i></Anchor>
                                    <Anchor to={item.facebook} target="_blank"><i className='fa fa-facebook'></i></Anchor>
                                </div>
                                <Anchor to={`mailto:${item.email}`} target="_blank">{item.email}</Anchor>
                                <Anchor to={`https://www.google.com/maps?q=${encodeURIComponent(item.direccion)}`} target="_blank">{item.direccion}</Anchor>
                            </div>
                        ))
                    }

                    {publicaciones?.slice(0, 10)?.map(item => (

                        <a class='cardBlogs' href={`/blog/${item.idPublicacion}/${item.titulo.replace(/\s+/g, '-')}`}>
                            <img src={obtenerImagen(item)} alt={item?.titulo} />

                            <div className='cardText'>
                                <h4>{item.titulo}</h4>
                                <span>{item.descripcion}</span>
                                <h4>{new Date(item?.createdAt).toLocaleDateString()}</h4>
                            </div>
                        </a>

                    ))}


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
                <img src={modalImage} alt={producto.titulo} />
            </Modal>


        </div >

    )
}





