import React from 'react';
import CardsSection from '../../Components/CardsSection/CardsSection';
import BgPageSection from '../../Components/BgPageSection/BgPageSection';
import PoliticaYPrivacidad from '../../Components/InfoWeb/PoliticaYPrivacidad';
import PoliticaDeCokies from '../../Components/InfoWeb/PoliticaDeCokies';
import TerminosYCondiciones from '../../Components/InfoWeb/TerminosYCondiciones';
import PreguntasFrecuentes from '../../Components/InfoWeb/PreguntasFrecuentes';
import InformaciónDMCA from '../../Components/InfoWeb/InformaciónDMCA';
import Nosotros from '../../Components/InfoWeb/Nosotros';
import { Link as Anchor, useLocation } from 'react-router-dom';
import links from '../../Components/links';
import link from '../../Components/link';
import About from '../../Components/About/About'
import ShareWeb from '../../Components/ShareWeb/ShareWeb'
export default function PagesInfo() {
    const location = useLocation(); // Obtiene la URL actual
    return (
        <div>
            <BgPageSection />

            <div className='sectionGrid'>
                <div className='PublicacionesFilter'>
                    <div className='linksPages'>
                        {
                            links.map(item => (
                                <Anchor
                                    key={item}
                                    to={`/${link}/${item}`}
                                    className={location.pathname === `/${link}/${item}` ? 'activeAnchor' : ''}
                                >
                                    {item?.replace(/-/g, ' ')}
                                </Anchor>
                            ))
                        }
                    </div>

                    {/* Mostrar componente basado en la URL actual */}
                    {location.pathname === `/${link}/nosotros` && <Nosotros />}
                    {location.pathname === `/${link}/politica-de-privacidad` && <PoliticaYPrivacidad />}
                    {location.pathname === `/${link}/politica-de-cookies` && <PoliticaDeCokies />}
                    {location.pathname === `/${link}/terminos-y-condiciones` && <TerminosYCondiciones />}
                    {location.pathname === `/${link}/preguntas-frecuentes` && <PreguntasFrecuentes />}
                    {location.pathname === `/${link}/Informacion-para-la-DMCA` && <InformaciónDMCA />}
                </div>

                <CardsSection />
            </div>

            <About />
            <ShareWeb />
        </div>
    );
}
