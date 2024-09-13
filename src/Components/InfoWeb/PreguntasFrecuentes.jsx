import React from "react";
import { useParams } from "react-router-dom";
import alt from "../alt";
import contact from "../contact";
import './PoliticaYPrivacidad.css'

export default function PreguntasFrecuentes() {
    const contacto = contact[0]
    const { info } = useParams();
    return (
        <div className="InfoContain">

            <div className="sectionInfo">
                <h1> {info?.replace(/-/g, ' ')}</h1>
                <p>Al usar esta APLICACIÓN WEB <strong>{alt}</strong> aceptas la siguiente <strong>{info?.replace(/-/g, ' ')}</strong>, por lo que te pedimos leerla.</p>

                <ol>
                    <li>¿Quién es <strong>{contacto?.nombre}</strong>?</li>
                    <li>Los anuncios son reales?</li>
                    <li> ¿Los anunciantes están verificados?</li>
                    <li>Contraté un servicio pero nunca llegó el anunciante</li>
                    <li>Contraté un servicio pero no fue de mi satisfacción</li>


                </ol>
            </div>
            <hr />
            <div className="sectionInfo">
                <h3>  <span>1)</span> ¿Quién es {contacto?.nombre}? </h3>
                <p><strong>{contacto?.nombre}</strong> somos una plataforma de hospedaje para <strong>ANUNCIOS CLASIFICADOS PORNO</strong> verificados que conecta de forma independiente al Usuario con el Anunciante desde el año 2009 con sede en Victoria, Seychelles para la comunidad mexicana. Si gustas conocernos más a detalle puedes visitar nuestra sección Nosotros.</p>
            </div>
            <hr />
            <div className="sectionInfo">
                <h3>  <span>2)</span> ¿Los anuncios son reales?</h3>
                <p>Sí. A cada anunciante (sin importar la categoría de anuncio) le han sido verificadas las fotos de forma manual. Los anuncios que no completan la verificación se borran y por lo tanto no se publican.</p>
            </div>
            <hr />


            <hr />
            <div className="sectionInfo">
                <h3>  <span>3)</span>  ¿Los anunciantes están verificados?</h3>
                <p>Solo los <strong>anuncios TOP</strong> conllevan verificación de:</p>
                <p>Los otros anuncios solo tienen verificación de fotografías. Verificamos todos los datos antes citados para evitar malas prácticas, engaños y/o delitos por parte de los anunciantes.</p>
            </div>
            <hr />

            <div className="sectionInfo">
                <h3>  <span>4)</span> Contraté un servicio pero nunca llegó el anunciante</h3>
                <p>Sentimos mucho la mala experiencia, te recomendamos <strong>NO</strong> volver a contratar a ese anunciante, al ser una falta leve no podemos tomar acción, si embargo le podemos llamar la atención. No te preocupes, tenemos variedad de anuncios y contando... si es una conducta repetitiva daremos de baja al <strong>ANUNCIANTE</strong>.</p>
            </div>
            <hr />


            <div className="sectionInfo">
                <h3>  <span>5)</span> Contraté un servicio pero no fue de mi satisfacción</h3>
                <p>Sentimos mucho la mala experiencia, te recomendamos <strong>NO</strong> volver a contratar a ese anunciante, al ser una falta leve no podemos tomar acción, si embargo le podemos llamar la atención. No te preocupes, tenemos variedad de anuncios y contando... si es una conducta repetitiva daremos de baja al  <strong>ANUNCIANTE</strong>.</p>
            </div>
            <hr />


        </div>
    )
}
