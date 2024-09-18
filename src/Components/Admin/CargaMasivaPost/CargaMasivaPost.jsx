import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import baseURL from '../../url';
import estadosYmunicipios from '../../estadosYmunicipios';
import './CargaMasivaPost.css'
export default function CargaMasivaPost() {
    const [mensaje, setMensaje] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [usuario, setUsuario] = useState({});
    const [telefonos, setTelefonos] = useState(['']); // Inicializar con un campo de teléfono vacío
    const [numRecords, setNumRecords] = useState(1); // Por defecto, un registro
    const [categoria, setCategoria] = useState(''); // ID de la categoría seleccionada
    const [categorias, setCategoras] = useState([]);
    const [estados, setEstados] = useState([]);
    const [municipios, setMunicipios] = useState([]);
    const [estadoSeleccionado, setEstadoSeleccionado] = useState('');
    const [municipioSeleccionado, setMunicipioSeleccionado] = useState('');

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    useEffect(() => {
        // Cargar datos locales de estados y municipios
        setEstados(estadosYmunicipios.map(e => e.nombre));
    }, []);

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
                console.error('Error al obtener datos:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        cargarCategoria();
    }, []);

    const cargarCategoria = () => {
        fetch(`${baseURL}/categoriasGet.php`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                setCategoras(data.categorias || []);
                console.log(data.categorias);
            })
            .catch(error => console.error('Error al cargar categorías:', error));
    };

    const handleCategoriaChange = (e) => {
        setCategoria(e.target.value);
    };

    const handleEstadoChange = (event) => {
        const estado = event.target.value;
        setEstadoSeleccionado(estado);
        const estadoSeleccionado = estadosYmunicipios.find(e => e.nombre === estado);
        setMunicipios(estadoSeleccionado ? estadoSeleccionado.municipios : []);
    };

    const handleMunicipioChange = (e) => {
        setMunicipioSeleccionado(e.target.value);
    };

    const agregarTelefono = () => {
        setTelefonos([...telefonos, '']); // Agregar un nuevo teléfono vacío
    };

    const actualizarTelefono = (index, value) => {
        const nuevosTelefonos = [...telefonos];
        nuevosTelefonos[index] = value; // Actualizar el valor del teléfono
        setTelefonos(nuevosTelefonos);
    };

    const eliminarTelefono = (index) => {
        const nuevosTelefonos = [...telefonos];
        nuevosTelefonos.splice(index, 1); // Eliminar teléfono en la posición dada
        setTelefonos(nuevosTelefonos);
    };

    const crear = async () => {
        if (telefonos.some(telefono => telefono.trim() === '')) {
            toast.error('Se requiere un teléfono');
            return;
        }
        if (numRecords <= 0) {
            toast.error('La cantidad de registros debe ser mayor a cero.');
            return;
        }
        setMensaje('Procesando...');
        try {
            const response = await fetch(`${baseURL}/cargaMasivaPost.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    numRecords, // Cantidad de registros
                    telefonos,  // Lista de teléfonos
                    idUsuario: usuario.idUsuario || 1, // Usar el idUsuario del estado o un valor por defecto
                    idCategoria: categoria || undefined, // Pasar el idCategoria si está definido, de lo contrario se enviará como `undefined`
                    estado: estadoSeleccionado || undefined, // Pasar el estado si está definido, de lo contrario se enviará como `undefined`
                    municipio: municipioSeleccionado || undefined // Pasar el municipio si está definido, de lo contrario se enviará como `undefined`
                })
            });

            const data = await response.json();
            console.log(data); // Agregar este console.log para ver la respuesta

            if (data.status === 'success') {
                setMensaje(''); // Limpiar mensaje al finalizar
                toast.success(data.message);
                setModalOpen(false); // Cerrar el modal
                setTelefonos(['']); // Reiniciar el estado de teléfonos
                window.location.reload();
                console.log(categoria);
            } else {
                setMensaje('');
                toast.error(data.message || 'Error desconocido');
            }
        } catch (error) {
            console.error('Error en el servidor:', error);
            setMensaje('');
            toast.error('Error de conexión. Por favor, inténtelo de nuevo.');
        }
    };

    return (
        <div className='NewContain'>
            <ToastContainer />
            <button onClick={toggleModal} className='btnSave'>
                <span> +</span> Masivo
            </button>
            {modalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <div className='deFlexBtnsModal'>
                            <button className='selected'>Agregar publicaciones masivas</button>
                            <span className="close" onClick={toggleModal}>&times;</span>
                        </div>
                        <form id="crearForm">
                            <div className='flexGrap'>
                                <fieldset>
                                    <legend>Cantidad de publicaciones</legend>
                                    <input
                                        type="number"
                                        id="numRecords"
                                        name="numRecords"
                                        min="1"
                                        value={numRecords}
                                        onChange={(e) => setNumRecords(e.target.value)}
                                        required
                                    />
                                </fieldset>

                                {telefonos.map((telefono, index) => (
                                    <fieldset key={index}>
                                        <legend>Teléfono {index + 1}</legend>
                                        <input
                                            type="number"
                                            id={`telefono_${index}`}
                                            name={`telefono_${index}`}
                                            value={telefono}
                                            onChange={(e) => actualizarTelefono(index, e.target.value)}
                                            required
                                        />
                                        <button type="button" className='elimin' onClick={() => eliminarTelefono(index)}>
                                            Eliminar
                                        </button>
                                    </fieldset>
                                ))}
                                <fieldset>
                                    <legend>Categoría (opcional)</legend>
                                    <select
                                        id="idCategoria"
                                        name="idCategoria"
                                        value={categoria}
                                        onChange={handleCategoriaChange}
                                    >
                                        <option value="">Selecciona una categoría</option>
                                        {categorias.map(item => (
                                            <option key={item.idCategoria} value={item.idCategoria}>{item.categoria}</option>
                                        ))}
                                    </select>
                                </fieldset>

                                <fieldset>
                                    <legend htmlFor="estado">Estado (opcional)</legend>
                                    <select id="estado" name="estado" value={estadoSeleccionado} onChange={handleEstadoChange}>
                                        <option value="">Seleccione un estado</option>
                                        {estados.map((estado, index) => (
                                            <option key={index} value={estado}>{estado}</option>
                                        ))}
                                    </select>
                                </fieldset>

                                <fieldset>
                                    <legend htmlFor="municipio">Municipio (opcional)</legend>
                                    <select id="municipio" name="municipio" value={municipioSeleccionado} onChange={handleMunicipioChange}>
                                        <option value="">Seleccione un municipio</option>
                                        {municipios.map((municipio, index) => (
                                            <option key={index} value={municipio}>{municipio}</option>
                                        ))}
                                    </select>
                                </fieldset>

                            </div>
                            <button type="button" onClick={agregarTelefono} className='agregar'>
                                Agregar otro teléfono
                            </button>
                            {mensaje ? (
                                <button type="button" className='btnLoading' disabled>
                                    {mensaje}
                                </button>
                            ) : (
                                <button type="button" onClick={crear} className='btnPost'>
                                    Crear publicaciones
                                </button>
                            )}
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
