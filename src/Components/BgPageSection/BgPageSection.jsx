import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useParams } from "react-router-dom";
import './BgPageSection.css';

export default function BgPageSection() {
    const location = useLocation();
    const navigate = useNavigate();
    const goBack = () => {
        if (location.key !== 'default') {
            navigate(-1);
        } else {
            navigate('/');
        }
    };

    const { info, categoria, estado, clave } = useParams();

    // Función para filtrar los valores que no sean 'item'
    const filterValues = (...values) => {
        return values.filter(value => value && value.toLowerCase() !== 'item');
    };

    // Obtener valores filtrados
    const filteredParams = filterValues(
        info?.replace(/-/g, ' '),
        categoria?.replace(/-/g, ' '),
        estado?.replace(/-/g, ' '),
        clave?.replace(/-/g, ' ')
    );

    return (
        <div className='bgPageSection'>
            <div className="bgHeader">
                <button className="back" onClick={goBack}> <FontAwesomeIcon icon={faArrowLeft} /> </button>
                <h5> {filteredParams.join(' ')} </h5>
            </div>
        </div>
    );
}
