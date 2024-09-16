import React from 'react';
import './ShareWeb.css';

export default function ShareWeb() {
    function handleShare() {
        if (navigator.share) {
            navigator.share({
                title: 'Mamis VIP México',
                text: `Echa un vistazo a Mamis VIP México:`,
                url: window.location.href,
            })
                .then(() => console.log('Contenido compartido correctamente'))
                .catch((error) => console.error('Error al compartir:', error));
        } else {
            console.error('La API de compartir no está disponible en este navegador.');
        }
    }

    return (
        <div className='shareButonsContain'>
            <button onClick={handleShare} className="share-button">
                Compartir en.. <i className='fa fa-share'></i>
            </button>

            {/* Botones personalizados para otras redes */}
            <div className="social-buttons">



                {/* Compartir en Twitter */}
                <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent('Echa un vistazo a Mamis VIP México')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="twitter-button-t"
                >
                    <i className='fa fa-twitter'></i>  Twitter
                </a>

                {/* Compartir en WhatsApp */}
                <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent('Echa un vistazo a Mamis VIP México: ' + window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsapp-button-w"
                >
                    <i className='fa fa-whatsapp'></i>   WhatsApp
                </a>
            </div>
        </div>
    );
}
