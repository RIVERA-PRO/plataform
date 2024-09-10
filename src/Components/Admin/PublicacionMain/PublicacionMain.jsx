import React, { useEffect, useState } from 'react';
import { Link as Anchor } from "react-router-dom";
import './PublicacionMain.css'; // Asegúrate de que el archivo CSS esté renombrado también
import baseURL from '../../url';
import moneda from '../../moneda';

export default function PublicacionMain() {
    const [publicaciones, setPublicaciones] = useState([]);
    const [usuario, setUsuario] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseURL}/userLogued.php`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUsuario(data);
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const cargarPublicaciones = async () => {
            try {
                const response = await fetch(`${baseURL}/publicacionesGet.php`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPublicaciones(data.publicaciones.reverse() || []);
            } catch (error) {
                console.error('Error al cargar publicaciones:', error);
            }
        };

        cargarPublicaciones();
    }, []);

    return (
        <div className='table-containerProductos'>
            <div className='deFlexMore'>
                <h3>Últimas publicaciones</h3>
                <Anchor to={`/dashboard/publicaciones`} className='logo'>
                    Ver más
                </Anchor>
            </div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>IdPublicacion</th>
                        <th>Título</th>
                        <th>Descripción</th>
                        <th>Estado</th>
                        <th>Municipio</th>
                        <th>Imagen 1</th>
                    </tr>
                </thead>
                <tbody>
                    {publicaciones.map(item => (
                        <tr key={item.idPublicacion}>
                            <td>{item.idPublicacion}</td>
                            <td>{item.titulo}</td>
                            <td>{item.descripcion}</td>
                            <td>{item.estado}</td>
                            <td>{item.municipio}</td>
                            <td>
                                {item.imagen1 ? (
                                    <img src={item.imagen1} alt="imagen1" />
                                ) : (
                                    <span className='imgNonetd'>
                                        Sin imagen
                                    </span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
