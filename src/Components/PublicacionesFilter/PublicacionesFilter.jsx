import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import baseURL from '../url';
import './PublicacionesFilter.css';
import alt from '../alt';
import link from '../link';
import { Link as Anchor } from "react-router-dom";
import { useMediaQuery } from '@react-hook/media-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

// Función para eliminar acentos
const removeAccents = (str) => {
    if (!str) return ''; // Maneja casos en los que str sea undefined o null
    const accents = /[\u0300-\u036f]/g;
    return str.normalize("NFD").replace(accents, "");
};

// Función para obtener el formato amigable de la clave
const formatClave = (str) => {
    return str ? str.replace(/-/g, ' ') : '';
};

// Función para comprobar si alguna palabra en clave está en el texto
const matchesKeyword = (keyword, text) => {
    const keywordWords = removeAccents(keyword.toLowerCase()).split(/\s+/);
    const textWords = removeAccents(text.toLowerCase()).split(/\s+/);
    return keywordWords.some(word => textWords.includes(word));
};

export default function PublicacionesFilter() {
    const { idCategoria, estado, categoria, municipio, clave } = useParams();
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [publicaciones, setPublicacions] = useState([]);
    const [filteredPublicaciones, setFilteredPublicaciones] = useState([]);
    const isScreenLarge = useMediaQuery('(min-width: 900px)');

    useEffect(() => {
        cargarPublicaciones();
        cargarCategorias();
    }, []);

    useEffect(() => {
        // Desformatear el estado y el municipio
        const estadoOriginal = estado?.replace(/-/g, ' ');
        const municipioOriginal = municipio && municipio !== 'item' ? municipio.replace(/-/g, ' ') : '';

        // Filtrar las publicaciones por idCategoria, estado, municipio y clave
        const filtradas = publicaciones?.filter(publicacion => {
            const matchesCategoria = idCategoria && idCategoria !== 'item' ? publicacion?.idCategoria === parseInt(idCategoria) : true;
            const matchesEstado = estado && estado !== 'item' ? removeAccents(publicacion?.estado.toLowerCase()) === removeAccents(estadoOriginal?.toLowerCase()) : true;
            const matchesMunicipio = municipio && municipio !== 'item' ? removeAccents(publicacion?.municipio.toLowerCase()) === removeAccents(municipioOriginal?.toLowerCase()) : true;
            const matchesClave = clave && clave !== 'item' ? (
                matchesKeyword(clave, publicacion?.titulo) ||
                matchesKeyword(clave, publicacion?.descripcion)
            ) : true;

            return matchesCategoria && matchesEstado && matchesMunicipio && matchesClave;
        });

        setFilteredPublicaciones(filtradas);
    }, [publicaciones, idCategoria, estado, municipio, categoria, clave]);

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

    if (loading) {
        return <div className="cardGrapLoading">
            <div className="cardPublicLoading"></div>
            <div className="cardPublicLoading"></div>
            <div className="cardPublicLoading"></div>
            <div className="cardPublicLoading"></div>
            <div className="cardPublicLoading"></div>
            <div className="cardPublicLoading"></div>
        </div>;
    }

    return (
        <div className='PublicacionesFilter'>
            <div className="linksSection">
                <Anchor to={'/'}>
                    <FontAwesomeIcon icon={faHome} /> Inicio
                </Anchor>
                {categoria && categoria !== 'item' && (
                    <>
                        -
                        <Anchor to={''}>
                            {removeAccents(categoria?.replace(/-/g, ' '))}
                        </Anchor>
                    </>
                )}
                {estado && estado !== 'item' && (
                    <>
                        -
                        <Anchor to={''}>
                            {removeAccents(estado?.replace(/-/g, ' '))}
                        </Anchor>
                    </>
                )}
                {municipio && municipio !== 'item' && (
                    <>
                        -
                        <Anchor to={''}>
                            {removeAccents(municipio?.replace(/-/g, ' '))}
                        </Anchor>
                    </>
                )}
                {clave && clave !== 'item' && (
                    <>
                        -
                        <Anchor to={''}>
                            {formatClave(clave)}
                        </Anchor>
                    </>
                )}
                <Anchor to={''}>
                    ({filteredPublicaciones?.length})
                </Anchor>
            </div>

            <div className="cardGrap">
                {filteredPublicaciones?.length > 0 ? (
                    filteredPublicaciones?.map(publicacion => (
                        <Anchor className="cardPublic" key={publicacion?.idPublicacion} to={`/${link}/${removeAccents(categorias?.find(cat => cat?.idCategoria === publicacion?.idCategoria)?.categoria || '').replace(/\s+/g, '-')}/${removeAccents(publicacion?.estado).replace(/\s+/g, '-')}/${publicacion?.idPublicacion}/${removeAccents(publicacion?.titulo || '').replace(/\s+/g, '-')}`}>
                            <img src={obtenerImagen(publicacion)} alt={`${publicacion?.titulo} - ${alt}`} />
                            <div className='cardText'>
                                <h4>{publicacion?.titulo}</h4>
                                {isScreenLarge ? (
                                    <span>{publicacion?.descripcion?.slice(0, 100)}</span>
                                ) : (
                                    <span>{publicacion?.descripcion?.slice(0, 30)}</span>
                                )}
                                <h5> <FontAwesomeIcon icon={faMapMarkerAlt} /> {publicacion?.estado} - {publicacion?.municipio}</h5>
                            </div>
                        </Anchor>
                    ))
                ) : (
                    <div className="noResultText">
                        <p>No hay resultados disponibles de
                            <br />{categoria && categoria !== 'item' && (
                                <>
                                    {removeAccents(categoria?.replace(/-/g, ' '))} en
                                </>
                            )}
                            {estado && estado !== 'item' && (
                                <>
                                    , {removeAccents(estado?.replace(/-/g, ' '))}
                                </>
                            )}
                            {municipio && municipio !== 'item' && (
                                <>
                                    , {removeAccents(municipio?.replace(/-/g, ' '))}
                                </>
                            )}
                            {clave && clave !== 'item' && (
                                <>
                                    {formatClave(clave?.replace(/-/g, ' '))}
                                </>
                            )}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
