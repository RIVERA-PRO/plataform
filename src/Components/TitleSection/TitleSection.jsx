import React from 'react'
import './TitleSection.css'
import { Link as Anchor } from "react-router-dom";
import alt from '../alt'
export default function TitleSection({ title, description, logo, link }) {
    return (
        <div className='titleSectionText'>
            <img src={logo} alt={alt} />
            <h2>
                {
                    title
                }
            </h2>
            <span>
                {
                    description
                }
            </span>
            {/* <Anchor to={link}>
                Ver más
            </Anchor> */}

        </div>
    )
}
