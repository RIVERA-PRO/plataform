import React from "react";
import { useParams } from "react-router-dom";
import './PoliticaYPrivacidad.css';

export default function PoliticaDeCokies() {

    const { info } = useParams();
    return (
        <div className="InfoContain">
            <div className="sectionInfo">
                <h1> {info?.replace(/-/g, ' ')}</h1>
                <p>Al usar esta APLICACIÓN WEB <strong>Putas México - Mamis Vip México</strong> implementamos el uso de Cookies para mejorar la experiencia del usuario y el anunciante.</p>
                <ol>
                    <li>Definición y función de las cookies</li>
                    <li>Tipo de cookies que utiliza la aplicación web y su finalidad</li>
                    <li>Tratamiento de las cookies</li>
                    <li>Qué ocurre si se deshabilitan las Cookies</li>
                    <ol>
                        <li>Cookies técnicas</li>
                        <li>Cookies analíticas</li>
                        <li>Cookies de terceros para la gestión de espacios publicitarios</li>
                    </ol>
                    <li>Actualización de nuestra Política de Cookies</li>
                </ol>
            </div>
            <hr />
            <div className="sectionInfo">
                <h3> <span>1)</span> Definición y función de las cookies</h3>
                <p>Una cookie es un archivo que se descarga en tu dispositivo desde el que nos estás visitando al acceder a determinadas páginas web. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo y pueden utilizarse para reconocer al usuario.</p>
                <p>Este sitio web, al igual que la mayoría en Internet, utiliza Cookies para mejorar y optimizar la experiencia del usuario. A continuación, te brindamos información detallada sobre las cookies que utilizamos y cómo desactivarlas en tu navegador.</p>
            </div>
            <hr />
            <div className="sectionInfo">
                <h3> <span>2)</span> Tipo de cookies que utiliza la aplicación web y su finalidad</h3>
                <p>El uso de Cookies facilita la navegación del usuario y adapta la información y los servicios a sus intereses. Usamos cookies tanto de sesión como permanentes, con una duración de hasta 24 meses.</p>
                <p>Utilizamos cookies propias y de terceros para recopilar datos estadísticos de forma agregada.</p>
            </div>
            <hr />
            <div className="sectionInfo">
                <h3> <span>3)</span> Tratamiento de las cookies</h3>
                <p>La información obtenida del tratamiento de las cookies es gestionada por el responsable de la Web.</p>
            </div>
            <hr />
            <div className="sectionInfo">
                <h3> <span>4)</span> Qué ocurre si se deshabilitan las Cookies</h3>
                <p>Desactivar las cookies puede afectar algunas funcionalidades, como:</p>
                <ul>
                    <li>Acceso a partes de acceso restringido.</li>
                    <li>Recordar los elementos de la cesta de la compra.</li>
                    <li>Realización de procesos de compra.</li>
                </ul>
                <h4>4.1) Cookies técnicas</h4>
                <p>Permiten funciones básicas como la navegación o recordar datos de sesión.</p>
                <h4>4.2) Cookies analíticas</h4>
                <p>Facilitan información estadística sobre el uso del portal.</p>
                <h4>4.3) Cookies de terceros para la gestión de espacios publicitarios</h4>
                <p>Estas cookies permiten medir la efectividad de campañas y adaptar la publicidad al usuario.</p>
            </div>
            <hr />
            <div className="sectionInfo">
                <h3> <span>5)</span> Actualización de nuestra Política de Cookies</h3>
                <p>Recomendamos revisar esta política regularmente ya que puede actualizarse con cambios en la aplicación o en las normativas del navegador.</p>
            </div>
            <hr />
        </div >
    );
}
