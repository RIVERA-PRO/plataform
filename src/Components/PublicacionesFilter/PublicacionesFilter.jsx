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
export default function PublicacionesFilter() {
    const { idCategoria, estado, categoria } = useParams();
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
        // Desformatear el estado
        const estadoOriginal = estado?.replace(/-/g, ' ');

        // Filtrar las publicaciones por idCategoria y estado
        const filtradas = publicaciones?.filter(publicacion =>
            publicacion?.idCategoria === parseInt(idCategoria) &&
            publicacion?.estado.toLowerCase() === estadoOriginal.toLowerCase()
        );
        setFilteredPublicaciones(filtradas);
    }, [publicaciones, idCategoria, estado]);

    const cargarPublicaciones = () => {
        fetch(`${baseURL}/publicacionesGet.php`, {
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
        return <div>Cargando publicaciones...</div>;
    }

    return (
        <div className='PublicacionesFilter'>




            <div className="linksSection">
                <Anchor to={'/'}>
                    <FontAwesomeIcon icon={faHome} />  Inicio
                </Anchor>
                -
                <Anchor to={''}>
                    {categoria}
                </Anchor>
                -
                <Anchor to={''}>
                    {estado?.replace(/-/g, ' ')}
                </Anchor>

                -
                <Anchor to={''}>
                    ({filteredPublicaciones?.length})
                </Anchor>

            </div>

            <div className="cardGrap">
                {filteredPublicaciones?.length > 0 ? (
                    filteredPublicaciones?.map(publicacion => (
                        <Anchor className="cardPublic" key={publicacion?.idPublicacion} to={`/${link}/${publicacion?.idPublicacion}/${publicacion?.titulo?.replace(/\s+/g, '-')}`}>
                            <img src={obtenerImagen(publicacion)} alt={`${publicacion?.titulo} - ${alt}`} />
                            <div className='cardText'>
                                <h4>{publicacion?.titulo}</h4>
                                {isScreenLarge ?
                                    <>
                                        <span>{publicacion?.descripcion?.slice(0, 100)}</span>
                                    </> :
                                    <>
                                        <span>{publicacion?.descripcion?.slice(0, 80)}</span>
                                    </>}
                                <h5> <FontAwesomeIcon icon={faMapMarkerAlt} /> {publicacion?.estado} -  {publicacion?.municipio}</h5>
                            </div>
                        </Anchor>
                    ))
                ) : (
                    <div className="noResultText">
                        <p>No hay publicaciones disponibles en esta categoría y estado.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
