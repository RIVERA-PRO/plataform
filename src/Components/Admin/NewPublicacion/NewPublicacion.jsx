import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import baseURL from '../../url';
import estadosYmunicipios from '../../estadosYmunicipios';
export default function NewPublicacion() {
    const [mensaje, setMensaje] = useState('');
    const [imagenPreview1, setImagenPreview1] = useState(null);
    const [imagenPreview2, setImagenPreview2] = useState(null);
    const [imagenPreview3, setImagenPreview3] = useState(null);
    const [imagenPreview4, setImagenPreview4] = useState(null);

    const [isImage1Selected, setIsImage1Selected] = useState(false);
    const [isImage2Selected, setIsImage2Selected] = useState(false);
    const [isImage3Selected, setIsImage3Selected] = useState(false);
    const [isImage4Selected, setIsImage4Selected] = useState(false);

    const [descripcion, setDescripcion] = useState('');
    const [titulo, setTitulo] = useState('');
    const [categoria, setCategoria] = useState('');
    const [categorias, setCategoras] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [usuario, setUsuario] = useState({});
    const [recomendado, setRecomendado] = useState({});
    const [vista, setVista] = useState({});
    const [telefono, setTelefono] = useState({});
    const [estados, setEstados] = useState([]);
    const [municipios, setMunicipios] = useState([]);
    const [estadoSeleccionado, setEstadoSeleccionado] = useState('');
    const [municipioSeleccionado, setMunicipioSeleccionado] = useState('');


    useEffect(() => {
        // Cargar datos locales de estados y municipios
        setEstados(estadosYmunicipios.map(e => e.nombre));
    }, []);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    const handleImagenChange = (event, setImagenPreview, setIsImageSelected) => {
        const file = event.target.files[0];

        if (file) {
            const previewURL = URL.createObjectURL(file);
            setImagenPreview(previewURL);
            setIsImageSelected(true);
        }
    };

    const handleEstadoChange = (event) => {
        const estado = event.target.value;
        setEstadoSeleccionado(estado);
        const estadoSeleccionado = estadosYmunicipios.find(e => e.nombre === estado);
        setMunicipios(estadoSeleccionado ? estadoSeleccionado.municipios : []);
    };

    const handleCategoriaChange = (e) => {
        setCategoria(e.target.value);
    };
    const handleRecomendado = (e) => {
        setRecomendado(e.target.value);
    };
    const handleVista = (e) => {
        setVista(e.target.value);
    };

    const handleMunicipio = (e) => {
        setMunicipioSeleccionado(e.target.value);
    };
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
                console.log(data.categorias)
            })
            .catch(error => console.error('Error al cargar contactos:', error));
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
                console.error('Error al obtener datos:', error);
            }
        };

        fetchData();
    }, []);



    const crear = async () => {
        const form = document.getElementById("crearForm");
        const formData = new FormData(form);

        // Agregar idUsuario al formData
        formData.append('idUsuario', usuario.idUsuario);

        const resetForm = () => {
            form.reset();
            setImagenPreview1(null);
            setImagenPreview2(null);
            setImagenPreview3(null);
            setImagenPreview4(null);
            setIsImage1Selected(false);
            setIsImage2Selected(false);
            setIsImage3Selected(false);
            setIsImage4Selected(false);
        };
        setMensaje('');

        // Validar que todos los campos estén completos
        if (
            !formData.get('titulo') ||
            !formData.get('descripcion') ||
            !formData.get('idCategoria') ||
            !formData.get('vista') ||
            !formData.get('recomendado') ||
            !formData.get('imagen1') ||
            !formData.get('imagen2') ||
            !formData.get('imagen3') ||
            !formData.get('imagen4')
        ) {
            toast.error('Por favor, completa los campos obligatorios');
            return;
        }

        setMensaje('Procesando...');

        try {
            const response = await fetch(`${baseURL}/publicacionesPost.php`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            console.log(formData)
            if (data.mensaje) {
                setMensaje('');
                resetForm();
                toast.success(data.mensaje);
                window.location.reload();
            } else if (data.error) {
                setMensaje('');
                toast.error(data.error);
                console.log(data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            setMensaje('');
            toast.error('Error de conexión. Por favor, inténtelo de nuevo.');
        }
    };
    const idUsuarioPost = 1;
    return (
        <div className='NewContain'>
            <ToastContainer />
            <button onClick={toggleModal} className='btnSave'>
                <span>  +</span> Agregar
            </button>
            {modalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <div className='deFlexBtnsModal'>
                            <button className='selected'>Agregar publicacion</button>
                            <span className="close" onClick={toggleModal}>&times;</span>
                        </div>
                        <form id="crearForm">
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
                                    <legend>Título (obligatorio)</legend>
                                    <input
                                        type="text"
                                        id="titulo"
                                        name="titulo"
                                        required
                                        value={titulo}
                                        onChange={(e) => setTitulo(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset>
                                    <legend>Categoría (obligatorio)</legend>
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
                                    <legend>Teléfono (obligatorio)</legend>
                                    <input
                                        type="number"
                                        id="telefono"
                                        name="telefono"
                                        required
                                        value={telefono}
                                        onChange={(e) => setTelefono(e.target.value)}
                                    />
                                </fieldset>

                                <fieldset>
                                    <legend htmlFor="estado">Estado (obligatorio)</legend>
                                    <select id="estado" name="estado" value={estadoSeleccionado} onChange={handleEstadoChange}>
                                        <option value="">Seleccione un estado</option>
                                        {estados.map((estado, index) => (
                                            <option key={index} value={estado}>{estado}</option>
                                        ))}
                                    </select>
                                </fieldset>
                                <fieldset>

                                    <legend htmlFor="municipio">Municipio (obligatorio)</legend>
                                    <select id="municipio" name="municipio" value={municipioSeleccionado} onChange={handleMunicipio}>
                                        <option value="">Seleccione un municipio</option>
                                        {municipios.map((municipio, index) => (
                                            <option key={index} value={municipio}>{municipio}</option>
                                        ))}
                                    </select>
                                </fieldset>

                                <fieldset id='descripcion'>
                                    <legend>Descripción (obligatorio)</legend>
                                    <textarea
                                        id="descripcion"
                                        name="descripcion"
                                        required
                                        value={descripcion}
                                        onChange={(e) => setDescripcion(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset>
                                    <legend>Recomendado (obligatorio)</legend>
                                    <select
                                        id="recomendado"
                                        name="recomendado"
                                        value={recomendado}
                                        onChange={handleRecomendado}
                                    >
                                        <option value="si">Si</option>
                                        <option value="no">No</option>
                                    </select>
                                </fieldset>
                                <fieldset>
                                    <legend>Vista (obligatorio)</legend>
                                    <select
                                        id="vista"
                                        name="vista"
                                        value={vista}
                                        onChange={handleVista}
                                    >
                                        <option value="visible">Visible</option>
                                        <option value="no-visible">No visible</option>
                                    </select>
                                </fieldset>
                                <fieldset>
                                    <legend>Imagen 1</legend>
                                    <input
                                        type="file"
                                        id="imagen1"
                                        name="imagen1"
                                        accept="image/*"
                                        onChange={(e) => handleImagenChange(e, setImagenPreview1, setIsImage1Selected)}
                                    />
                                </fieldset>
                                <fieldset>
                                    <legend>Imagen 2</legend>
                                    <input
                                        type="file"
                                        id="imagen2"
                                        name="imagen2"
                                        accept="image/*"
                                        onChange={(e) => handleImagenChange(e, setImagenPreview2, setIsImage2Selected)}
                                    />
                                </fieldset>
                                <fieldset>
                                    <legend>Imagen 3</legend>
                                    <input
                                        type="file"
                                        id="imagen3"
                                        name="imagen3"
                                        accept="image/*"
                                        onChange={(e) => handleImagenChange(e, setImagenPreview3, setIsImage3Selected)}
                                    />
                                </fieldset>
                                <fieldset>
                                    <legend>Imagen 4</legend>
                                    <input
                                        type="file"
                                        id="imagen4"
                                        name="imagen4"
                                        accept="image/*"
                                        onChange={(e) => handleImagenChange(e, setImagenPreview4, setIsImage4Selected)}
                                    />
                                </fieldset>


                            </div>
                            {(isImage1Selected || isImage2Selected || isImage3Selected || isImage4Selected) &&
                                <div className='previevCategori'>
                                    {isImage1Selected && <img src={imagenPreview1} alt="Vista previa 1" />}
                                    {isImage2Selected && <img src={imagenPreview2} alt="Vista previa 2" />}
                                    {isImage3Selected && <img src={imagenPreview3} alt="Vista previa 3" />}
                                    {isImage4Selected && <img src={imagenPreview4} alt="Vista previa 4" />}
                                </div>
                            }
                            {mensaje ? (
                                <button type="button" className='btnLoading' disabled>
                                    {mensaje}
                                </button>
                            ) : (
                                <button type="button" onClick={crear} className='btnPost'>
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
