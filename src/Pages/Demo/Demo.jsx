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
export default function Demo() {
    return (
        <section className='demo'>
            <Banners />
            <BannersModal />
            <CategoriSection />
            <PublicacionesHome />
            <BtnWhatsapp />
            <TitleSection title='Mamis Vip' description="El portal más grande de clasificados porno" logo={logo} />
            <Footer />

        </section>
    )
}
