import React from 'react';
import Header from '../Header/Header';
import HeaderDash from '../../Components/Admin/HeaderDash/HeaderDash';
import PublicacionesData from '../../Components/Admin/PublicacionesData/PublicacionesData';

export default function Publicaciones() {

    return (
        <div className='containerGrid'>
            <Header />
            <section className='containerSection'>
                <HeaderDash />
                <div className='container'>
                    <PublicacionesData />
                </div>
            </section>
        </div>
    );
}
