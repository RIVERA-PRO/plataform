import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import contact from '../contact';

export default function UserOnline() {
    const [usuarios, setUsuarios] = useState(0);
    const contacto = contact[0];

    // Función para generar un número aleatorio entre 900,000 y 1,500,000
    const generarUsuariosAleatorios = () => {
        return Math.floor(Math.random() * (1270050 - 1270000 + 1)) + 1270000;
    };

    useEffect(() => {
        // Establece el número aleatorio cuando el componente se monta
        setUsuarios(generarUsuariosAleatorios());

        // Opcional: si deseas que se actualice periódicamente, puedes agregar un intervalo
        const interval = setInterval(() => {
            setUsuarios(generarUsuariosAleatorios());
        }, 100000); // Cambia el número cada 10 segundos

        // Limpia el intervalo cuando el componente se desmonta
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            {usuarios > 0 ? (
                <div className='Visitas'>
                    <span>
                        <FontAwesomeIcon icon={faUser} /> Usuarios en línea en <strong>{contacto?.nombre}: {usuarios.toLocaleString()}</strong>
                    </span>
                </div>
            ) : null}
        </div>
    );
}
