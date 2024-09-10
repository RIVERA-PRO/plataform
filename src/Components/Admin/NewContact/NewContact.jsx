import React, { useState, useEffect } from 'react';
import './NewContact.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import baseURL from '../../url';

export default function NewContact() {
    const [mensaje, setMensaje] = useState('');
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [usuario, setUsuario] = useState({});
    const [direccion, setDireccion] = useState('');
    const toggleModal = () => {
        setTelefono('');
        setEmail('');
        setMensaje('');
        setDireccion('');
        setModalOpen(!modalOpen);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseURL}/userLogued.php`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUsuario(data);
            } catch (error) {
                console.error
                    ('Error al obtener datos:', error);
            }
        };

        fetchData();
    }, []);
    const crear = async () => {
        const formData = new FormData();
        formData.append('idUsuario', usuario.idUsuario);
        formData.append('nombre', nombre);
        formData.append('telefono', telefono);
        formData.append('email', email);
        formData.append('direccion', direccion);

        setMensaje('Procesando...');

        try {
            const response = await fetch(`${baseURL}/contactoPost.php`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.mensaje) {
                setMensaje('');
                toast.success(data.mensaje);
                toggleModal();
                window.location.reload();
            } else if (data.error) {
                setMensaje('');
                toast.error(data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            setMensaje('');
            toast.error('Error de conexión. Por favor, inténtelo de nuevo.');
        }
    };
    const idUsuarioPost = usuario.idUsuario;
    return (
        <div className='NewContain'>
            <ToastContainer />
            <button onClick={toggleModal} className='btnSave'>
                <span>+</span> Agregar
            </button>
            {modalOpen && (
                <div className='modal'>
                    <div className='modal-content'>
                        <div className='deFlexBtnsModal'>
                            <button className='selected'>Agregar Contacto</button>
                            <span className='close' onClick={toggleModal}>
                                &times;
                            </span>
                        </div>
                        <form className='flexGrap'>
                            <div className='flexGrap'>
                                <fieldset id='deNoneInput'>
                                    <legend>IdUsuario</legend>
                                    <input
                                        type="number"
                                        id="idUsuario"
                                        name="idUsuario"
                                        required
                                        value={idUsuarioPost}
                                        readOnly
                                    />
                                </fieldset>
                                <fieldset>
                                    <legend>Nombre (obligatorio)</legend>
                                    <input
                                        type='text'
                                        name='nombre'
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset>
                                    <legend>Telefono (obligatorio)</legend>
                                    <input
                                        type='text'
                                        name='telefono'
                                        value={telefono}
                                        onChange={(e) => setTelefono(e.target.value)}
                                    />
                                </fieldset>


                                <fieldset>
                                    <legend>Email (obligatorio)</legend>
                                    <input
                                        type='email'
                                        name='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset>
                                    <legend>Dirección</legend>
                                    <input
                                        type='text'
                                        name='direccion'
                                        value={direccion}
                                        onChange={(e) => setDireccion(e.target.value)}
                                    />
                                </fieldset>
                            </div>


                            {mensaje ? (
                                <button type='button' className='btnLoading' disabled>
                                    {mensaje}
                                </button>
                            ) : (
                                <button type='button' onClick={crear} className='btnPost'>
                                    Agregar
                                </button>
                            )}
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
