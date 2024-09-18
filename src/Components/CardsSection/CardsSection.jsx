import React, { useEffect, useState } from 'react';
import './CardsSection.css';
import { Link as Anchor } from 'react-router-dom';
import logo from '../../images/logo.png';
import baseURL from '../url';
import alt from '../alt';
import link from '../link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faStar, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

// Función para eliminar acentos
const removeAccents = (str) => {
    const accents = /[\u0300-\u036f]/g;
    return str.normalize("NFD").replace(accents, "");
};

export default function CardsSection() {
    const [contactos, setContactos] = useState([]);
    const [publicaciones, setPublicaciones] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarContacto();
        cargarPublicaciones();
        cargarCategorias();
    }, []);

    const cargarContacto = () => {
        fetch(`${baseURL}/contactoGet.php`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                setContactos(data.contacto.reverse()[0] || []);
            })
            .catch(error => console.error('Error al cargar contactos:', error));
    };

    const cargarPublicaciones = () => {
        fetch(`${baseURL}/publicacionesFront.php`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                setPublicaciones(data?.publicaciones?.sort(() => Math.random() - 0.5)); // Orden aleatorio
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
        <div>
            <div className='cardProfile'>
                <img src={logo} alt={alt} />
                <h2>Mamis Vip México</h2>

                <Anchor to={`mailto:${contactos.email}`} target="_blank">{contactos.email}</Anchor>
                <Anchor to={`https://www.google.com/maps?q=${encodeURIComponent(contactos.direccion)}`} target="_blank">{contactos.direccion}</Anchor>
            </div>

            <div>
                {loading ? (
                    <div className='cardLoadingContain'>
                        <div className='cardPublicLateral'>
                            <div className='cardPublicLateralPublLoading'> </div>
                            <div className='cardPublicLateralPublLoading'> </div>
                            <div className='cardPublicLateralPublLoading'> </div>
                            <div className='cardPublicLateralPublLoading'> </div>
                        </div>

                    </div>
                ) : (
                    <div>
                        <div className='cardPublicLateral'>
                            {publicaciones?.length > 0 ? (
                                <div className='deFlexTitlesection'>
                                    <h3>   <FontAwesomeIcon icon={faStar} />  Podría interesarte</h3>
                                    <hr />
                                    <FontAwesomeIcon icon={faAngleDoubleRight} className='iconSection' />
                                </div>
                            ) : (
                                <></>
                            )}
                            {publicaciones?.filter(item => item.recomendado === "si").slice(0, 4).map(item => (
                                <Anchor
                                    className='cardPublicLateralPubl'
                                    key={item.idPublicacion}
                                    to={`/${link}/${removeAccents(categorias.find(cat => cat.idCategoria === item.idCategoria)?.categoria || '').replace(/\s+/g, '-')}/${removeAccents(item.estado || '').replace(/\s+/g, '-')}/${item.idPublicacion}/${removeAccents(item.titulo || '').replace(/\s+/g, '-')}`}
                                >
                                    <img src={obtenerImagen(item)} alt={`${item?.titulo} - Mamis Vip México`} />
                                    <h6 className='recomendado'>Recomendado</h6>
                                    <div className='cardText'>
                                        <h4>{item.titulo}</h4>
                                        {categorias
                                            .filter(categoriaFiltrada => categoriaFiltrada.idCategoria === item.idCategoria)
                                            .map(categoriaFiltrada => (
                                                <span key={categoriaFiltrada.idCategoria}>
                                                    <FontAwesomeIcon icon={faStar} /> {categoriaFiltrada.categoria}
                                                </span>
                                            ))
                                        }
                                        <h5> <FontAwesomeIcon icon={faMapMarkerAlt} /> {item.estado} - {item.municipio}</h5>
                                    </div>
                                </Anchor>
                            ))}
                        </div>

                        <div className='cardBannerPubl'>
                            {publicaciones?.slice(0, 1).map(item => (
                                <Anchor
                                    key={item.idPublicacion}
                                    to={`/${link}/${removeAccents(categorias.find(cat => cat.idCategoria === item.idCategoria)?.categoria || '').replace(/\s+/g, '-')}/${removeAccents(item.estado || '').replace(/\s+/g, '-')}/${item.idPublicacion}/${removeAccents(item.titulo || '').replace(/\s+/g, '-')}`}
                                >
                                    <img src={obtenerImagen(item)} alt={`${item?.titulo} - Mamis Vip México`} />
                                </Anchor>
                            ))}
                        </div>
                    </div>
                )}
            </div>


        </div>
    );
}
