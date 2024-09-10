import React, { useEffect, useState, useRef } from "react";
import { Link as Anchor, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faMapMarkerAlt, faExternalLinkAlt, faStar, faTrash, faHeart } from '@fortawesome/free-solid-svg-icons';
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

    return (
        <div className='bgPageSection'>

            <div className="bgHeader">
                <button className="back" onClick={goBack}> <FontAwesomeIcon icon={faArrowLeft} /> </button>
            </div>

        </div>
    )
}
