import React, { useState, useEffect } from 'react';
import Nabvar from '../Components/Navbar/Navbar'
import { Outlet } from 'react-router-dom';
import { useMediaQuery } from '@react-hook/media-query';
import Footer from '../Components/Footer/Footer'
import ModalCokies from '../Components/ModalCokies/ModalCokies';
import ButonScroll from '../Components/ButonScroll/ButonScroll';
import BtnWhatsapp from '../Components/BtnWhatsapp/BtnWhatsapp'
export default function IndexLayout() {


    const isScreenLarge = useMediaQuery('(min-width: 900px)');
    return (
        <div >
            {isScreenLarge ?
                <>
                    <Nabvar />
                    <Outlet />
                    <Footer />
                    <ButonScroll />
                    <BtnWhatsapp />
                </> :
                <>
                    <Outlet />
                    <Footer />
                </>}
            <ModalCokies />
            <div className='espaciobg2'>

            </div>

        </div>
    );
}
