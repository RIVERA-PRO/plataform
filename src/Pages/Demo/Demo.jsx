import React from 'react'
import Banners from '../../Components/Banners/Banners'
import './Demo.css'
import Footer from '../../Components/Footer/Footer'
import BannersModal from '../../Components/BannersModal/BannersModal'
import PublicacionesHome from '../../Components/PublicacionesHome/PublicacionesHome'
import TitleSection from '../../Components/TitleSection/TitleSection'
import BtnWhatsapp from '../../Components/BtnWhatsapp/BtnWhatsapp'
import logo from '../../images/logo.png'
import CategoriSection from '../../Components/CategoriSection/CategoriSection'
import BgSection from '../../Components/BgSection/BgSection'
export default function Demo() {
    return (
        <section className='demo'>
            <Banners />
            <BannersModal />
            <CategoriSection />
            <PublicacionesHome />
            <BtnWhatsapp />
            <BgSection />
            <TitleSection title='Mamis Vip' description="Mamis VIP México somos una plataforma de hospedaje web para ANUNCIOS CLASIFICADOS PORNO verificados que conecta de forma independiente al Usuario con el Anunciante desde el año 2009 con sede en Victoria, Seychelles para la comunidad mexicana." logo={logo} />


            <Footer />

        </section>
    )
}
