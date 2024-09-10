import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faArrowUp, faArrowDown, faSync, faEye } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import baseURL from '../../url';
import NewPublicacion from '../NewPublicacion/NewPublicacion';
import { Link as Anchor } from "react-router-dom";
import './PublicacionesData.css'
import estadosYmunicipios from '../../estadosYmunicipios';
import link from '../../link';
export default function PublicacionesData() {
    const [publicaciones, setPublicaciones] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [nuevoTitulo, setNuevoTitulo] = useState('');
    const [nuevaDescripcion, setNuevaDescripcion] = useState('');
    const [nuevaCategoria, setNuevaCategoria] = useState('');
    const [publicacion, setPublicacion] = useState({});
    const [modalImagenVisible, setModalImagenVisible] = useState(false);
    const [imagenSeleccionada, setImagenSeleccionada] = useState('');
    const [filtroId, setFiltroId] = useState('');
    const [filtroTitulo, setFiltroTitulo] = useState('');
    const [ordenInvertido, setOrdenInvertido] = useState(false);
    const [imagenPreview, setImagenPreview] = useState(null);
    const [imagenPreview2, setImagenPreview2] = useState(null);
    const [imagenPreview3, setImagenPreview3] = useState(null);
    const [imagenPreview4, setImagenPreview4] = useState(null);
    const [nuevaImagen, setNuevaImagen] = useState(null);
    const [nuevaImagen2, setNuevaImagen2] = useState(null);
    const [nuevaImagen3, setNuevaImagen3] = useState(null);
    const [nuevaImagen4, setNuevaImagen4] = useState(null);
    const [selectedSection, setSelectedSection] = useState('texto');
    const [categorias, setCategoras] = useState([]);
    const [recomendado, setRecomendado] = useState({});
    const [vista, setVista] = useState({});
    const [telefono, setTelefono] = useState({});
    const [estado, setEstado] = useState([]);
    const [municipio, setMunicipio] = useState([]);
    const [estados, setEstados] = useState([]);
    const [municipios, setMunicipios] = useState([]);
    const [estadoSeleccionado, setEstadoSeleccionado] = useState('');
    const [municipioSeleccionado, setMunicipioSeleccionado] = useState('');

    const cerrarModalImagen = () => {
        setModalImagenVisible(false);
    };
    const abrirModalImagenSeleccionada = (imagen) => {
        setImagenSeleccionada(imagen);
        setModalImagenVisible(true);
    };


    useEffect(() => {
        cargarPublicaiones();
        cargarCategoria();
        setEstados(estadosYmunicipios.map(e => e.nombre));
    }, []);

    useEffect(() => {
        // Actualiza el valor del select cuando cambia el estado nuevoEstado
        setNuevoTitulo(publicacion.titulo);
        setNuevaDescripcion(publicacion.descripcion);
        setNuevaCategoria(publicacion.idCategoria)
        setVista(publicacion.idCategoria)
        setRecomendado(publicacion.recomendado)
        setMunicipio(publicacion.municipio)
        setEstado(publicacion.estado)
        setTelefono(publicacion.telefono)
    }, [publicacion]);


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

    const cargarPublicaiones = () => {
        fetch(`${baseURL}/publicacionesGet.php`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {

                setPublicaciones(data.publicaciones || []);
            })
            .catch(error => console.error('Error al cargar publicaciones:', error));
    };


    const eliminar = (idPublicacion) => {
        // Reemplaza el window.confirm con SweetAlert2
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¡No podrás revertir esto!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${baseURL}/publicacionesDelete.php?idPublicacion=${idPublicacion}`, {
                    method: 'DELETE',
                })
                    .then(response => response.json())
                    .then(data => {
                        Swal.fire(
                            '¡Eliminado!',
                            data.mensaje,
                            'success'
                        );
                        cargarPublicaiones();
                    })
                    .catch(error => {
                        console.error('Error al eliminar el Producto:', error);
                        toast.error(error);
                    });
            }
        });
    };

    const abrirModal = (item) => {
        setPublicacion(item);
        setNuevoTitulo(item.titulo);
        setNuevaDescripcion(item.descripcion);
        setNuevaCategoria(item.idCategoria);
        setModalVisible(true);
    };

    const cerrarModal = () => {
        setModalVisible(false);
    };


    const Filtrados = publicaciones.filter(item => {
        const idMatch = item.idPublicacion.toString().includes(filtroId);
        const tituloMatch = !filtroTitulo || item.titulo.includes(filtroTitulo);
        return idMatch && tituloMatch;
    });

    const descargarExcel = () => {
        const data = Filtrados.map(item => ({
            idPublicacion: item.idPublicacion,
            Titulo: item.titulo,
            Descripcion: item.descripcion,
            Categoria: item.categoria,
            Fecha: item.createdAt,
            Imagen1: item.imagen1,
            Imagen2: item.imagen2,
            Imagen3: item.imagen3,
            Imagen4: item.imagen4,

        }));

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Publicaciones');
        XLSX.writeFile(wb, 'Publicaciones.xlsx');
    };

    const descargarPDF = () => {
        const pdf = new jsPDF();
        pdf.text('Lista de Publicaciones', 10, 10);

        const columns = [
            { title: 'idPublicacion', dataKey: 'idPublicacion' },
            { title: 'Titulo', dataKey: 'titulo' },
            { title: 'Descripcion', dataKey: 'descripcion' },
            { title: 'Categoria', dataKey: 'categoria' },
            { title: 'Fecha', dataKey: 'createdAt' },
        ];

        const data = Filtrados.map(item => ({
            idPublicacion: item.idPublicacion,
            Titulo: item.titulo,
            Descripcion: item.descripcion,
            Categoria: item.categoria,
            Fecha: item.createdAt,

        }));

        pdf.autoTable({
            head: [columns.map(col => col.title)],
            body: data.map(item => Object.values(item)),
        });

        pdf.save('Publicaciones.pdf');
    };

    const recargar = () => {
        cargarPublicaiones();
    };
    const invertirOrden = () => {
        setPublicaciones([...publicaciones].reverse());
        setOrdenInvertido(!ordenInvertido);
    };

    const handleEstadoChange = (event) => {
        const estadoC = event.target.value;
        setEstadoSeleccionado(estadoC);
        const estadoSeleccionado = estadosYmunicipios.find(e => e.nombre === estadoC);
        setMunicipios(estadoSeleccionado ? estadoSeleccionado.municipios : []);
    };
    const handleMunicipio = (e) => {
        setMunicipioSeleccionado(e.target.value);
    };
    const handleUpdateText = (idPublicacion) => {
        const payload = {

            titulo: nuevoTitulo !== '' ? nuevoTitulo : publicacion.titulo,
            descripcion: nuevaDescripcion !== '' ? nuevaDescripcion : publicacion.descripcion,
            idCategoria: nuevaCategoria !== '' ? nuevaCategoria : publicacion.idCategoria,
            telefono: telefono !== '' ? telefono : publicacion.telefono,
            recomendado: recomendado !== '' ? recomendado : publicacion.recomendado,
            vista: vista !== '' ? vista : publicacion.vista,
            estado: estadoSeleccionado !== '' ? estadoSeleccionado : publicacion.estado,
            municipio: municipioSeleccionado !== '' ? municipioSeleccionado : publicacion.municipio,
        };

        fetch(`${baseURL}/publicacionesTextPut.php?idPublicacion=${idPublicacion}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {

                    Swal.fire(
                        'Error!',
                        data.error,
                        'error'
                    );
                } else {

                    Swal.fire(
                        'Editado!',
                        data.mensaje,
                        'success'
                    );
                    cargarPublicaiones();
                    cerrarModal()
                }
            })
            .catch(error => {
                console.log(error.message);
                toast.error(error.message);
            });
    };

    const handleFileChange = (event, setFile, setPreview) => {
        const file = event.target.files[0];

        if (file) {
            // Crear una URL de objeto para la imagen seleccionada
            const previewURL = URL.createObjectURL(file);
            setFile(file);
            setPreview(previewURL);
        }
    };
    const handleEditarImagenBanner = (idPublicacion) => {
        const formData = new FormData();
        formData.append('idPublicacion', idPublicacion);
        formData.append('updateAction', 'update'); // Campo adicional para indicar que es una actualización

        if (nuevaImagen) {
            formData.append('imagen1', nuevaImagen);
        }
        if (nuevaImagen2) {
            formData.append('imagen2', nuevaImagen2);
        }
        if (nuevaImagen3) {
            formData.append('imagen3', nuevaImagen3);
        }
        if (nuevaImagen4) {
            formData.append('imagen4', nuevaImagen4);
        }


        fetch(`${baseURL}/publicacionesImagePut.php`, {
            method: 'POST',  // Cambiado a POST
            body: formData
        })
            .then(response => {
                // Manejar el caso cuando la respuesta no es un JSON válido o está vacía
                if (!response.ok) {
                    throw new Error('La solicitud no fue exitosa');

                }

                return response.json();
            })
            .then(data => {
                if (data.error) {

                    toast.error(data.error);
                    console.log(formData)
                } else {

                    toast.success(data.mensaje);
                    window.location.reload();
                }
            })
            .catch(error => {
                console.log(error)
                toast.error(error.message);
                console.log(formData)
                console.log(idPublicacion)
            });
    };

    const handleSectionChange = (section) => {
        setSelectedSection(section);
    };




    return (
        <div>

            <ToastContainer />

            <div className='deFlexContent'>

                <div className='deFlex2'>
                    <NewPublicacion />
                    <button className='excel' onClick={descargarExcel}><FontAwesomeIcon icon={faArrowDown} /> Excel</button>
                    <button className='pdf' onClick={descargarPDF}><FontAwesomeIcon icon={faArrowDown} /> PDF</button>
                </div>
                <div className='filtrosContain'>
                    <div className='inputsColumn'>
                        <input type="number" value={filtroId} onChange={(e) => setFiltroId(e.target.value)} placeholder='Id' />
                    </div>

                    <div className='inputsColumn'>
                        <input type="text" value={filtroTitulo} onChange={(e) => setFiltroTitulo(e.target.value)} placeholder='Titulo' />
                    </div>


                    <button className='reload' onClick={recargar}><FontAwesomeIcon icon={faSync} /></button>
                    <button className='reverse' onClick={invertirOrden}>
                        {ordenInvertido ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} />}
                    </button>

                </div>

            </div>


            {modalImagenVisible && (
                <div className="modalImg">
                    <div className="modal-contentImg">


                        <span className="close2" onClick={cerrarModalImagen}>
                            &times;
                        </span>

                        <img src={imagenSeleccionada} alt="Imagen Seleccionada" />
                    </div>
                </div>
            )}

            {modalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <div className='deFlexBtnsModal'>

                            <div className='deFlexBtnsModal'>
                                <button
                                    className={selectedSection === 'texto' ? 'selected' : ''}
                                    onClick={() => handleSectionChange('texto')}
                                >
                                    Editar Texto
                                </button>
                                <button
                                    className={selectedSection === 'imagenes' ? 'selected' : ''}
                                    onClick={() => handleSectionChange('imagenes')}
                                >
                                    Editar Imagenes
                                </button>
                            </div>
                            <span className="close" onClick={cerrarModal}>
                                &times;
                            </span>
                        </div>
                        <div className='sectiontext' style={{ display: selectedSection === 'texto' ? 'flex' : 'none' }}>
                            <div className='flexGrap'>
                                <fieldset>
                                    <legend>Titulo</legend>
                                    <input
                                        type="text"
                                        value={nuevoTitulo !== '' ? nuevoTitulo : publicacion.titulo}
                                        onChange={(e) => setNuevoTitulo(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset>
                                    <legend>Telefono</legend>
                                    <input
                                        type="number"
                                        value={telefono !== '' ? telefono : publicacion.telefono}
                                        onChange={(e) => setTelefono(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset>
                                    <legend>Categoria</legend>
                                    <select
                                        value={nuevaCategoria !== '' ? nuevaCategoria : publicacion.categoria}
                                        onChange={(e) => setNuevaCategoria(e.target.value)}
                                    >

                                        {
                                            categorias
                                                .filter(categoriaFiltrada => categoriaFiltrada.idCategoria === publicacion.idCategoria)
                                                .map(categoriaFiltrada => (

                                                    <option value={publicacion.categoria}> {categoriaFiltrada.categoria}</option>
                                                ))
                                        }

                                        {
                                            categorias.map(item => (
                                                <option value={item?.idCategoria}>{item?.categoria}</option>
                                            ))
                                        }
                                    </select>
                                </fieldset>
                                <fieldset>
                                    <legend htmlFor="estado">Estado (obligatorio)</legend>
                                    <select id="estado" name="estado" value={estadoSeleccionado} onChange={handleEstadoChange}>
                                        <option value="">Seleccione un estado</option>
                                        {estados?.map((estado, index) => (
                                            <option key={index} value={estado}>{estado}</option>
                                        ))}
                                    </select>
                                </fieldset>
                                <fieldset>

                                    <legend htmlFor="municipio">Municipio (obligatorio)</legend>
                                    <select id="municipio" name="municipio" value={municipioSeleccionado} onChange={handleMunicipio}>
                                        <option value="">Seleccione un municipio</option>
                                        {municipios?.map((municipio, index) => (
                                            <option key={index} value={municipio}>{municipio}</option>
                                        ))}
                                    </select>
                                </fieldset>
                                <fieldset id='descripcion'>
                                    <legend>Descripcion</legend>
                                    <textarea
                                        type="text"
                                        id="nuevaDescripcion"
                                        name="nuevaDescripcion"
                                        required
                                        value={nuevaDescripcion !== '' ? nuevaDescripcion : publicacion.descripcion}
                                        onChange={(e) => setNuevaDescripcion(e.target.value)}
                                    />
                                </fieldset>

                            </div>

                            <button className='btnPost' onClick={() => handleUpdateText(publicacion.idPublicacion)} >Guardar </button>

                        </div>


                        <div className='sectionImg' style={{ display: selectedSection === 'imagenes' ? 'flex' : 'none' }}>
                            <div className='previevProduct'>

                                {imagenPreview ? (
                                    <img src={imagenPreview} alt="Vista previa de la imagen" onClick={() => abrirModalImagenSeleccionada(publicacion.imagen1)} />
                                ) : (
                                    <>
                                        {publicacion.imagen1 ? (
                                            <img src={publicacion.imagen1} alt="imagen" onClick={() => abrirModalImagenSeleccionada(publicacion.imagen1)} />

                                        ) : (
                                            <span className='imgNone'>
                                                No hay imagen

                                            </span>
                                        )}
                                    </>
                                )}

                                {imagenPreview2 ? (
                                    <img src={imagenPreview2} alt="Vista previa de la imagen" />
                                ) : (
                                    <>
                                        {publicacion.imagen2 ? (
                                            <img src={publicacion.imagen2} alt="imagen" onClick={() => abrirModalImagenSeleccionada(publicacion.imagen2)} />

                                        ) : (
                                            <span className='imgNone'>
                                                No hay imagen

                                            </span>
                                        )}
                                    </>
                                )}
                                {imagenPreview3 ? (
                                    <img src={imagenPreview3} alt="Vista previa de la imagen" />
                                ) : (
                                    <>
                                        {publicacion.imagen3 ? (
                                            <img src={publicacion.imagen3} alt="imagen" onClick={() => abrirModalImagenSeleccionada(publicacion.imagen3)} />

                                        ) : (
                                            <span className='imgNone'>
                                                No hay imagen

                                            </span>
                                        )}
                                    </>
                                )}
                                {imagenPreview4 ? (
                                    <img src={imagenPreview4} alt="Vista previa de la imagen" />
                                ) : (
                                    <>
                                        {publicacion.imagen4 ? (
                                            <img src={publicacion.imagen4} alt="imagen" onClick={() => abrirModalImagenSeleccionada(publicacion.imagen4)} />

                                        ) : (
                                            <span className='imgNone'>
                                                No hay imagen

                                            </span>
                                        )}
                                    </>
                                )}
                            </div>
                            <fieldset>
                                <legend>Editar Imagen1 </legend>
                                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setNuevaImagen, setImagenPreview)} />
                            </fieldset>
                            <fieldset>
                                <legend>Editar Imagen2 </legend>
                                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setNuevaImagen2, setImagenPreview2)} />
                            </fieldset>
                            <fieldset>
                                <legend>Editar Imagen3 </legend>
                                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setNuevaImagen3, setImagenPreview3)} />
                            </fieldset>
                            <fieldset>
                                <legend>Editar Imagen4 </legend>
                                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setNuevaImagen4, setImagenPreview4)} />
                            </fieldset>


                            <button className='btnPost' onClick={() => handleEditarImagenBanner(publicacion.idPublicacion)}>Guardar </button>

                        </div>



                    </div>
                </div>
            )}
            <div className='table-container'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Id publicacion</th>
                            <th>Categoria</th>
                            <th>Estado</th>
                            <th>Municipio</th>
                            <th>Titulo</th>
                            <th>Dscripcion</th>
                            <th>Telefono</th>
                            <th>Vista</th>
                            <th>Imagen</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>

                        {Filtrados.map(item => (
                            <tr key={item.idPublicacion}>
                                <td>{item.idPublicacion}</td>

                                {categorias
                                    .filter(categoriaFiltrada => categoriaFiltrada.idCategoria === item.idCategoria)
                                    .map(categoriaFiltrada => (
                                        <td
                                            key={categoriaFiltrada.idCategoria}
                                            style={{ color: '#DAA520' }}
                                        >
                                            {categoriaFiltrada.categoria}
                                        </td>
                                    ))
                                }
                                <td>{item.estado}</td>
                                <td>{item.municipio}</td>
                                <td>{item.titulo}</td>
                                <td>{item.descripcion}</td>
                                <td>{item.telefono}</td>
                                <td>{item.vista}</td>
                                <td>
                                    {item.imagen1 ? (
                                        <img src={item.imagen1} alt="imagen1" />
                                    ) : (
                                        <span className='imgNonetd'>
                                            Sin imagen
                                        </span>
                                    )}
                                </td>


                                <td>
                                    <button className='eliminar' onClick={() => eliminar(item.idPublicacion)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                    <button className='editar' onClick={() => abrirModal(item)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <Anchor className='editar' to={`/${link}/${item?.idPublicacion}/${item?.titulo?.replace(/\s+/g, '-')}`}>
                                        <FontAwesomeIcon icon={faEye} />
                                    </Anchor>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};
