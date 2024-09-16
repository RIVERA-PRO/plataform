import React from 'react'
import Banners from '../../Components/Banners/Banners'
import './Demo.css'
import Footer from '../../Components/Footer/Footer'
import BannersModal from '../../Components/BannersModal/BannersModal'
import PublicacionesHome from '../../Components/PublicacionesHome/PublicacionesHome'
import About from '../../Components/About/About'
import BtnWhatsapp from '../../Components/BtnWhatsapp/BtnWhatsapp'
import CategoriSection from '../../Components/CategoriSection/CategoriSection'
import BgSection from '../../Components/BgSection/BgSection'
import PublicacionesCardHome from '../../Components/PublicacionesCardHome/PublicacionesCardHome'
import Search from '../../Components/Search/Search'
import PalabrasClave from '../../Components/PalabrasClave/PalabrasClave'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import Visitas from '../../Components/Visitas/Visitas'
import ShareWeb from '../../Components/ShareWeb/ShareWeb'
import UserOnline from '../../Components/UserOnline/UserOnline'
export default function Demo() {
    return (
        <section className='demo'>
            <Banners />

            <Search />
            <BannersModal />

            <CategoriSection />
            <PublicacionesHome />
            <UserOnline />
            <BtnWhatsapp />
            <BgSection />
            <Visitas />
            <PublicacionesCardHome />
            <div className='sectionPading'>
                <div className='deFlexTitlesection'>
                    <h3>   <FontAwesomeIcon icon={faStar} /> Palabras claves</h3>
                    <hr />
                    <FontAwesomeIcon icon={faAngleDoubleRight} className='iconSection' />
                </div>
            </div>
            <PalabrasClave />
            <About />
            <ShareWeb />
            <Footer />

        </section>
    )
}
