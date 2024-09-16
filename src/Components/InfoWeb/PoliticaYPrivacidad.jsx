import React from "react";
import { useParams } from "react-router-dom";
import alt from "../alt";
import contact from "../contact";
import './PoliticaYPrivacidad.css'

export default function PoliticaYPrivacidad() {
    const contacto = contact[0]
    const { info } = useParams();
    return (
        <div className="InfoContain">

            <div className="sectionInfo">
                <h1> {info?.replace(/-/g, ' ')}</h1>
                <p>Al usar esta APLICACIÓN WEB <strong> Mamis Vip México</strong> aceptas la siguiente <strong>{info?.replace(/-/g, ' ')}</strong>, por lo que te pedimos leerla.</p>

                <ol>
                    <li>Titularidad de la plataforma</li>
                    <li>Para visitantes</li>

                </ol>
            </div>
            <hr />
            <div className="sectionInfo">
                <h3>  <span>1)</span> Titularidad de la plataforma</h3>
                <p><strong>{alt}</strong> con razón social de nacionalidad mexicana Servicios de Internet S.A. de C.V., con domicilio en <strong>{contacto?.direccion}</strong> y correo electrónico <strong>{contacto?.email}</strong> se declara propietaria de:</p>
                <ul>
                    <li>El dominio <strong>{contacto?.dominio}</strong></li>
                    <li>Los cerificados de seguridad SSL.</li>
                    <li>Los servidores web donde se almacena toda la información referente a los anunciantes y sus anuncios.</li>
                    <li>Las cuentas bancarias utilizadas para la captación de los recursos econónomicos derivados.</li>
                </ul>
                <p>CEO y representante legal <strong>{contacto?.ceo}</strong> de nacionalidad mexicana y estadounidense.</p>
            </div>
            <hr />
            <div className="sectionInfo">
                <h3>  <span> 2) </span>Para visitantes</h3>
                <p>¿Cuáles datos recaban del visitante?, ninguno.</p>
            </div>
            <hr />
        </div>
    )
}
