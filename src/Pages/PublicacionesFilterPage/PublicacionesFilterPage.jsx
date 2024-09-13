import React from 'react'
import PublicacionesFilter from '../../Components/PublicacionesFilter/PublicacionesFilter'
import CardsSection from '../../Components/CardsSection/CardsSection'
import './PublicacionesFilterPage.css'
import BgPageSection from '../../Components/BgPageSection/BgPageSection'
import TitleSection from '../../Components/TitleSection/TitleSection'
import logo from '../../images/logo.png'
import PalabrasClave from '../../Components/PalabrasClave/PalabrasClave'
import Visitas from '../../Components/Visitas/Visitas'
export default function PublicacionesFilterPage() {
    return (
        <div>

            <BgPageSection />

            <div className='sectionGrid'>
                <PublicacionesFilter />
                <CardsSection />

            </div>
            <Visitas />
            <PalabrasClave />
            <TitleSection title='Mamis Vip' description="Mamis VIP México somos una plataforma de hospedaje web para ANUNCIOS CLASIFICADOS PORNO verificados que conecta de forma independiente al Usuario con el Anunciante desde el año 2009 con sede en Victoria, Seychelles para la comunidad mexicana." logo={logo} />
        </div>
    )
}
