import React from 'react';
import Publicaiones from '../../Components/Publicaiones/Publicaiones';
import { Link as Anchor, } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, } from '@fortawesome/free-solid-svg-icons';

import HeaderBack from '../../Components/HeaderBack/HeaderBack';
export default function PagePublicaciones() {


    return (
        <div>
            <div style={{



            }} className='bgPage'>
                <HeaderBack title='Blog' />
                <Anchor to={`/`}>
                    <FontAwesomeIcon icon={faHome} /> Inicio
                </Anchor>
                |
                <Anchor >
                    Blog
                </Anchor>
            </div>

            <Publicaiones />
        </div>
    );
}
