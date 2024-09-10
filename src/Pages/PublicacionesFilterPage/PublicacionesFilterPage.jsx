import React from 'react'
import PublicacionesFilter from '../../Components/PublicacionesFilter/PublicacionesFilter'
import CardsSection from '../../Components/CardsSection/CardsSection'
import './PublicacionesFilterPage.css'
import BgPageSection from '../../Components/BgPageSection/BgPageSection'
export default function PublicacionesFilterPage() {
    return (
        <div>

            <BgPageSection />

            <div className='sectionGrid'>
                <PublicacionesFilter />
                <CardsSection />

            </div>

        </div>
    )
}
