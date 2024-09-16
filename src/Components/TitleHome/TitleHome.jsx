import React, { useEffect, useState } from 'react';
import logo from '../../images/logo.png';
import baseURL from '../url';
import './TitleHome.css';

export default function TitleHome() {
    const [publicaciones, setPublicacions] = useState([]);
    const [visitas, setVisitas] = useState([]);


    useEffect(() => {
        cargarVistas();
    }, []);

    const cargarVistas = () => {
        fetch(`${baseURL}/visitas.php`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {

                setVisitas(data);
            })
            .catch(error => console.error('Error al cargar visitas:', error));
    };
    useEffect(() => {
        cargarPublicaciones();
    }, []);

    const cargarPublicaciones = () => {
        fetch(`${baseURL}/publicacionesFront.php`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                setPublicacions(data?.publicaciones);
            })
            .catch(error => console.error('Error al cargar publicaciones:', error));
    };

    // Función para contar cuántas imágenes no están vacías en cada publicación
    const contarImagenesValidas = (publicacion) => {
        let contador = 0;
        // Verificar cada imagen y sumar si no está vacía
        if (publicacion?.imagen1) contador++;
        if (publicacion?.imagen2) contador++;
        if (publicacion?.imagen3) contador++;
        if (publicacion?.imagen4) contador++;
        return contador;
    };

    // Contar el total de imágenes válidas en todas las publicaciones
    const totalImagenes = publicaciones?.reduce((total, publicacion) => {
        return total + contarImagenesValidas(publicacion);
    }, 0);

    return (
        <div className='TitleHome'>
            <img src={logo} alt='Mamis Vip México' />
            <h2>Mamis Vip México</h2>
            <p>El portal más grande de clasificados porno</p>
            <span><strong>{publicaciones?.length}</strong> anuncios con <strong>{totalImagenes?.toLocaleString()}</strong> fotos verificadas  y <strong>{visitas?.length}</strong>  visitas </span>
            <hr />
        </div>
    );
}
