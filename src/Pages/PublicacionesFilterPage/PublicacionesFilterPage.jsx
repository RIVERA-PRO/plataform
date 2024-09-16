import React from 'react'
import PublicacionesFilter from '../../Components/PublicacionesFilter/PublicacionesFilter'
import CardsSection from '../../Components/CardsSection/CardsSection'
import './PublicacionesFilterPage.css'
import BgPageSection from '../../Components/BgPageSection/BgPageSection'
import About from '../../Components/About/About'
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
            <About />
        </div>
    )
}
