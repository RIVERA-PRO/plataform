import React from "react";
import { useParams } from "react-router-dom";
import './PoliticaYPrivacidad.css';
import contact from "../contact";
import dominios from "../dominios";
import { Link as Anchor } from 'react-router-dom';
export default function InformaciónDMCA() {
    const contacto = contact[0]
    const { info } = useParams();
    return (
        <div className="InfoContain">
            <div className="sectionInfo">
                <h1> {info?.replace(/-/g, ' ')}</h1>

                <p><strong>{contacto?.nombre}</strong> y sus sitios asociados* son anuncios para el hosting de usuarios mexicanos</p>
                <p><strong>{contacto?.nombre}</strong> y sus sitios asociados* no reclaman la propiedad de ninguna de las imágenes mostradas en este sitio a menos que se indique lo contrario.</p>
                <p><strong>{contacto?.nombre}</strong> y sus sitios asociados* <strong>NO</strong> ha clonado, clona ni clonará contenido de otros sitios. <strong>{contacto?.nombre}</strong> y sus sitios asociados* respetan los derechos de autor de los textos, fotografías, audios, videos o cualquier otro archivo multimedia que no sea de nuestra propiedad</p>
                <p>Si algún texto, imagen o cualquier archivo multimedia publicado aquí infringe la ley de derechos de autor, contáctenos al correo electrónico <strong>{contacto?.email}</strong> y con gusto eliminaremos los textos, imágenes o archivos multimedia infractores inmediatamente después de recibir una prueba válida de infracción de derechos de autor por parte del respectivo propietario.</p>
                <p>Todas las imágenes y cualquier archivo multimedia son propiedad de sus respectivos propietarios.</p>
                <p><strong>{contacto?.nombre}</strong> y sus sitios asociados* ofrecen a disposición de las autoridades reguladoras de derechos de autor cualquier información que les sea requerida para aclarar cualquier duda y resolver cualquier problema derivado de la publicación de los contenidos multimedia que se alojan en ellos.</p>
                <p><strong>{contacto?.nombre}</strong>  otorga todos sus derechos de autor a sus sitios asociados* sin ninguna condición, limitación o cualquier otra restricción.</p>
                <p>*Sitios asociados:</p>
                {
                    dominios.map(item => (
                        <Anchor
                            key={item}
                            to={`https://${item}`}
                        >
                            {item?.replace(/-/g, ' ')}
                        </Anchor>
                    ))
                }

            </div>
            <hr />
        </div >
    );
}
