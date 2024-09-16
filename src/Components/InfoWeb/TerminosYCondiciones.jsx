import React from "react";
import { useParams } from "react-router-dom";
import contact from "../contact";
import './PoliticaYPrivacidad.css'

export default function TerminosYCondiciones() {
    const contacto = contact[0]
    const { info } = useParams();
    return (
        <div className="InfoContain">

            <div className="sectionInfo">
                <h1> {info?.replace(/-/g, ' ')}</h1>
                <p>Al usar esta APLICACIÓN WEB <strong> Mamis Vip México</strong> aceptas los siguientes <strong>{info?.replace(/-/g, ' ')}</strong>, por lo que te pedimos leerla.</p>

                <ol>
                    <li>Titularidad de la plataforma</li>
                    <li>Aceptación de las condiciones de uso</li>
                    <li>Mayoría de edad</li>
                    <li>Definición de servicio de la aplicación web</li>
                    <li>Condiciones generales sobre ANUNCIANTES</li>
                    <li>Marco Legal</li>
                </ol>
            </div>
            <hr />
            <div className="sectionInfo">
                <h3>  <span>1)</span> Titularidad de la plataforma</h3>
                <p><strong> Mamis Vip México</strong> con razón social de nacionalidad mexicana Servicios de Internet S.A. de C.V., con domicilio en <strong>{contacto?.direccion}</strong> y correo electrónico <strong>{contacto?.email}</strong> se declara propietaria de:</p>
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
                <h3>  <span> 2) </span>Aceptación de las condiciones de uso</h3>
                <p>La APLICACIÓN WEB <strong> Mamis Vip México</strong> es titularidad de la empresa citada en el punto uno de este documento, en adelante el <strong>PROVEEDOR DE SERVICIOS</strong>.</p>
                <p>El <strong>PROVEEDOR DE SERVICIOS</strong> no interviene en la voluntad de creación de ningún anuncio clasificado, éstos anuncios son creados por los ANUNCIANTES, el <strong>PROVEEDOR DE SERVICIOS</strong> los hospeda.</p>
                <p>El uso de la <strong>APLICACIÓN WEB</strong> asigna la condición de ANUNCIANTE a toda aquella persona que por voluntad propia decide crear un anuncio clasificado porno y conlleva la aceptación irrevocable de todos los puntos descritos en este <strong>AVISO LEGAL</strong>.</p>
                <p>El <strong>PROVEEDOR DE SERVICIOS</strong> se reserva el derecho de agregar o modificar los puntos de uso de la <strong>APLICACIÓN WEB</strong> sin previo aviso, por lo cual es obligación del <strong>ANUNCIANTE</strong> leerlas de manera periódica.</p>
                <p>El <strong>PROVEEDOR DE SERVICIOS</strong> no asume ninguna responsabilidad sobre el uso incorrecto, inapropiado, ilícito o de cualquier índole de la información que aparece en los <strong> ANUNCIOS CLASIFICADOS PORNO</strong>, quedando su información, fotografías y/o contenido videográfico completamente a responsabilidad de los anunciantes. Mismos que declaran ser mayores de edad, tener la capacidad jurídica para ofrecer sus servicios, ser la persona que manifiestan, otorgando su autorización, consentimiento tácito y expreso de que se divulguen sus datos, fotografías y contenido videográfico personal sin ningún tipo de vicio del consentimiento</p>
                <p>Al margen de la ley, la <strong>APLICACIÓN WEB</strong> no asume ninguna responsabilidad de la falta de veracidad, integridad, actualización y precisión de los datos que se contienen en sus páginas web alojadas.</p>
                <p>Los <strong>ANUNCIOS CLASIFICADOS PORNO</strong> de la <strong> APLICACIÓN WEB</strong> pueden contener enlaces a páginas de terceros que el <strong>PROVEEDOR DE SERVICIOS</strong> no puede controlar. Por lo tanto, el <strong>PROVEEDOR DE SERVICIOS</strong> no asume responsabilidad en el contenido que pueda desplegarse en dichas páginas web.</p>

                <p>Los contenidos multimedia, textos y demás contenido de esta <strong>APLICACIÓN WEB</strong> son propiedad exclusiva de sus <strong>ANUNCIANTES</strong>. Cualquier acto de transmisión, distribución, cesión, reproducción, almacenamiento o comunicación pública total o parcial, debe contar con el consentimiento expreso del <strong>PROVEEDOR DE SERVICIOS</strong>.</p>

            </div>
            <hr />
            <div className="sectionInfo">
                <h3>  <span> 3) </span>Mayoría de edad</h3>
                <p>La presente <strong>APLICACIÓN WEB</strong> está dirigida únicamente para personas con mayoría de edad <strong>(+18 años)</strong>. Debido a esto queda expresamente prohibida la utilización de la <strong>APLICACIÓN WEB</strong> y navegación por menores de edad. Asimismo, no se permite la admisión de menores con permiso de sus padres, ni menores legalmente emancipados. Si eres menor de edad, abandona inmediatamente la <strong>APLICACIÓN WEB</strong>.</p>

            </div>

            <div className="sectionInfo">
                <h3>  <span> 4) </span> Definición de servicio de la aplicación web</h3>
                <p>El servicio de la <strong>APLICACIÓN WEB</strong> consiste en un hardware, un software y una conexión segura a internet SSL, para el <strong>HOSPEDAJE DE ANUNCIOS CLASIFICADOS PORNO</strong> de carácter personal, estos anuncios son <strong>CREADOS POR LOS ANUNCIANTES</strong> de caracter <strong>INFORMATIVO</strong>.</p>
            </div>

            <div className="sectionInfo">
                <h3>  <span> 5) </span> Condiciones generales sobre ANUNCIANTES</h3>
                <p>Los anunciantes declaran ser mayores de edad, tener la capacidad jurídica para ofrecer sus servicios, ser la persona que manifiestan, otorgando su autorización, consentimiento tácito y expreso de que se divulguen sus datos, fotografías y contenido videográfico personal sin ningún tipo de vicio del consentimiento.</p>
            </div>
            <div className="sectionInfo">
                <h3>  <span> 6) </span>Marco Legal</h3>
                <p><strong>PROVEEDOR DE SERVICIOS</strong> se manifiesta en contra de la trata de personas, la pedofilia, el estupro, la violencia cibernética y la violación a la intimidad sexual a través de medios digitales.</p>
                <p>Por ello nos regimos bajo el <strong>Código Penal Federal</strong> y a las nuevas disposiciones incluidas por la <strong>"Ley Olimpia"</strong>, el <strong>PROVEEDOR DE SERVICIOS</strong> pondrá a disposición inmediata de la policía, juzgados o entidades gubernamentales aquella cualquier información que le sea requerida mediante orden judicial haciéndonoslo llegar mediante nuestro correo electrónico de contacto {contacto?.email}</p>

            </div>

        </div>
    )
}
