import React, { useState, useEffect } from 'react'
import './NavbarDashboard.css'
import { Link as Anchor, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faBook, faImage, faAddressBook, faTachometerAlt, faStar, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import logo from '../../../images/logo.png'
import Logout from '../Logout/Logout';
import baseURL from '../../url';
export default function Navbar() {
    const location = useLocation();
    const [usuario, setUsuario] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseURL}/userLogued.php`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUsuario(data);
                setLoading(false);

            } catch (error) {
                console.error('Error al obtener datos:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    return (

        <div class="navbarDashboard" >
            <Anchor className='logo'>
                <img src={logo} alt="logo" />

            </Anchor>
            <div className='links'>
                <Anchor to={`/dashboard`} className={location.pathname === '/dashboard' ? 'activeLink' : ''}><FontAwesomeIcon icon={faHome} /> Inicio</Anchor>
                <Anchor to={`/dashboard/categorias`} className={location.pathname === '/dashboard/categorias' ? 'activeLink' : ''}><FontAwesomeIcon icon={faStar} /> Categorias</Anchor>
                <Anchor to={`/dashboard/publicaciones`} className={location.pathname === '/dashboard/publicaciones' ? 'activeLink' : ''}><FontAwesomeIcon icon={faBook} /> Publicaiones</Anchor>
                <Anchor to={`/dashboard/usuarios`} className={location.pathname === '/dashboard/usuarios' ? 'activeLink' : ''}><FontAwesomeIcon icon={faUser} /> Usuarios</Anchor>
                <Anchor to={`/dashboard/banners`} className={location.pathname === '/dashboard/banners' ? 'activeLink' : ''}><FontAwesomeIcon icon={faImage} /> Banners</Anchor>
                <Anchor to={`/dashboard/contacto`} className={location.pathname === '/dashboard/contacto' ? 'activeLink' : ''}><FontAwesomeIcon icon={faAddressBook} /> Contacto</Anchor>
            </div>

            <Logout />

        </div>

    );
}
