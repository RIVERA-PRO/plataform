import React, { useState, useEffect } from 'react';
import Nabvar from '../Components/Navbar/Navbar'
import Demo from '../Pages/Demo/Demo'
import ModalCokies from '../Components/ModalCokies/ModalCokies';
import ButonScroll from '../Components/ButonScroll/ButonScroll';
export default function IndexLayout() {




    return (
        <div className='section-bg-color'>
            <Nabvar />
            <div className='espaciobg'>

            </div>
            <Demo />
            <ButonScroll />
            <ModalCokies />
        </div>
    );
}
