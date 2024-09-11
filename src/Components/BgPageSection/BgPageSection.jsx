import React from "react";
import { Link as Anchor, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useParams } from "react-router-dom";
import './BgPageSection.css'
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
    const { info, categoria, estado } = useParams();

    return (
        <div className='bgPageSection'>

            <div className="bgHeader">
                <button className="back" onClick={goBack}> <FontAwesomeIcon icon={faArrowLeft} /> </button>
                <h5> {info?.replace(/-/g, ' ')}  {categoria?.replace(/-/g, ' ')} - {estado?.replace(/-/g, ' ')}</h5>
            </div>

        </div>
    )
}
