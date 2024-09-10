import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Link as Anchor, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../images/logo.png';
import alt from '../alt';
import 'swiper/swiper-bundle.css';
import Profile from '../Profile/Profile';
import './Navbar.css';
import Favoritos from '../Favoritos/Favoritos';
import InputSerach from '../InputSerach/InputSearchs';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header>
            <nav>
                <Anchor to={`/`} className='logo'>
                    {/* <img src={logo} alt={alt} /> */}
                    <h1>Mamis Vip</h1>
                </Anchor>
                <div className='deFLexNavs'>
                    <InputSerach />


                    <Favoritos />
                    <div className={`nav_toggle ${isOpen && "open"}`} onClick={() => setIsOpen(!isOpen)}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <Modal
                    isOpen={isOpen}
                    onRequestClose={() => setIsOpen(false)}
                    className="modalNav"
                    overlayClassName="overlay"
                >
                    <div className="modalNav-content">
                        <Profile />

                    </div>
                </Modal>
            </nav>
        </header>
    );
}
