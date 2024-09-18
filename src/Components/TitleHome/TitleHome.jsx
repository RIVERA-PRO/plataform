import React, { useEffect, useState } from 'react';
import logo from '../../images/logo.png';
import baseURL from '../url';
import './TitleHome.css';

export default function TitleHome() {
    const [publicaciones, setPublicacions] = useState([]);
    const [visitas, setVisitas] = useState([]);
    const [loading, setLoading] = useState(true);

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
            .catch(error => {
                console.error('Error al cargar visitas:', error)

            });

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
                setLoading(false);
            })
            .catch(error => {
                console.error('Error al cargar publicaciones:', error)
                setLoading(false);
            });
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

        <div>
            {loading ? (
                <div className='TitleHome'>
                    <img src={logo} alt='Putas México - Mamis Vip México' />
                    <h2>Mamis Vip México</h2>
                    <h3>Putas México</h3>
                    <p>El portal más grande de clasificados porno</p>
                    <span className='spanLoading'></span>
                    <hr />
                </div>
            ) : (
                <div className='TitleHome'>
                    <img src={logo} alt='Putas México - Mamis Vip México' />
                    <h2>Mamis Vip México</h2>
                    <h3>Putas México</h3>
                    <p>El portal más grande de clasificados porno</p>
                    <span><strong>1.50{String(publicaciones?.length)?.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</strong> anuncios con <strong>1.50{String(totalImagenes?.toLocaleString())?.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</strong> fotos verificadas  y <strong>1.720.{visitas?.length}</strong>  visitas </span>
                    <hr />
                </div>
            )}


        </div>
    );
}
