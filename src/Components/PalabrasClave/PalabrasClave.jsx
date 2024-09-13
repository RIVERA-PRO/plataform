import React from 'react';
import palabrasClave from '../palabrasClave';
import './PalabrasClave.css';
import link from '../link';
import { useParams, useLocation } from "react-router-dom";

export default function PalabrasClave() {
    const { idCategoria, estado, categoria, municipio, clave } = useParams();  // Extrae la clave desde los parámetros


    return (
        <div className='PalabrasClave'>

            {palabrasClave.map((palabra, index) => (
                <a
                    key={index}
                    className='palabraClave'
                    href={


                        `/${link}/busqueda/${categoria || 'item'}/${idCategoria || 'item'}/${estado || 'item'}/${municipio || 'item'}/${palabra?.replace(/\s+/g, '-')}`  // Ruta con parámetros de URL, usa 'item' si municipio no existe
                    }
                >
                    #{palabra}
                </a>
            ))}
        </div>
    );
}
