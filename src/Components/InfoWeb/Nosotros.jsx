import React from "react";
import { useParams } from "react-router-dom";
import './PoliticaYPrivacidad.css';
import contact from "../contact";
export default function Nosotros() {
    const contacto = contact[0]
    const { info } = useParams();
    return (
        <div className="InfoContain">
            <div className="sectionInfo">
                <h1> {info?.replace(/-/g, ' ')} {contacto?.nombre}</h1>
                <p>{contacto?.nosotros}</p>
            </div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15019488.843121493!2d-113.27686028470063!3d23.21150278560879!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x84043a3b88685353%3A0xed64b4be6b099811!2zTcOpeGljbw!5e0!3m2!1ses!2sar!4v1726159323361!5m2!1ses!2sar" referrerpolicy="no-referrer-when-downgrade"></iframe>

            <p>Contáctenos  <strong>{contacto?.email}</strong></p>
            <p> CEO y representante legal <strong>{contacto?.ceo}</strong>.</p>

            <hr />
        </div >
    );
}
