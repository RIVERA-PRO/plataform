import React, { useEffect, useState } from 'react';
import baseURL from '../url';
import link from '../link';
import estadosYmunicipios from '../estadosYmunicipios';
import './Search.css';
import { Link as Anchor } from "react-router-dom";
import Swal from 'sweetalert2'; // Importar SweetAlert2
import TitleHome from '../TitleHome/TitleHome';

export default function Search() {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [publicaciones, setPublicacions] = useState([]);
    const [selectedCategoria, setSelectedCategoria] = useState('');
    const [selectedCategoriaId, setSelectedCategoriaId] = useState('');
    const [selectedEstado, setSelectedEstado] = useState('');
    const [selectedMunicipio, setSelectedMunicipio] = useState('');

    useEffect(() => {
        cargarPublicaciones();
        cargarCategorias();
    }, []);

    const cargarPublicaciones = () => {
        fetch(`${baseURL}/publicacionesFront.php`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                setPublicacions(data.publicaciones);
                setLoading(false);
            })
            .catch(error => console.error('Error al cargar publicaciones:', error));
    };

    const cargarCategorias = () => {
        fetch(`${baseURL}/categoriasGet.php`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                setCategorias(data.categorias || []);
            })
            .catch(error => console.error('Error al cargar categorías:', error));
    };

    const handleEstadoChange = (e) => {
        const estadoSeleccionado = e.target.value;
        setSelectedEstado(estadoSeleccionado);
        setSelectedMunicipio(''); // Limpiar municipio cuando cambia el estado
    };

    const handleMunicipioChange = (e) => {
        setSelectedMunicipio(e.target.value);
    };

    const filteredMunicipios = estadosYmunicipios.find(estado => estado.nombre === selectedEstado)?.municipios || [];

    const handleSearch = () => {
        if (!selectedCategoria || !selectedEstado) {
            Swal.fire({
                icon: 'warning',
                title: 'Selecciona una Categoría y un Estado',
            });
            return;
        }

        const municipioPart = selectedMunicipio ? `/${selectedMunicipio.replace(/\s+/g, '-')}` : '';

        const url = `${link}/busqueda/${selectedCategoria?.replace(/\s+/g, '-')}/${selectedCategoriaId}/${selectedEstado?.replace(/\s+/g, '-')}${municipioPart}`;

        window.location.href = url;
    };

    return (
        <div className='Search'>
            <TitleHome />
            {loading ? (
                <div className='filterSectionInputsLoading'>
                    <div className='inputLoading'> </div>
                    <div className='inputLoading'> </div>
                    <div className='inputLoading'> </div>
                    <div className='inputLoading'> </div>
                </div>
            ) : (
                <div>
                    <div className='filterSectionInputs'>
                        <select onChange={(e) => {
                            const selectedOption = e.target.options[e.target.selectedIndex];
                            setSelectedCategoria(selectedOption.text);
                            setSelectedCategoriaId(selectedOption.value);
                        }} value={selectedCategoriaId}>
                            <option value="">Categoría...</option>
                            {categorias.map(categoria => (
                                <option key={categoria.idCategoria} value={categoria.idCategoria}>
                                    {categoria.categoria}
                                </option>
                            ))}
                        </select>

                        <select onChange={handleEstadoChange} value={selectedEstado}>
                            <option value="">Estado...</option>
                            {estadosYmunicipios.map(estado => (
                                <option key={estado.nombre} value={estado.nombre}>
                                    {estado.nombre}
                                </option>
                            ))}
                        </select>

                        <select onChange={handleMunicipioChange} value={selectedMunicipio}>
                            <option value="">Municipio...</option>
                            {filteredMunicipios.map(municipio => (
                                <option key={municipio} value={municipio}>
                                    {municipio}
                                </option>
                            ))}
                        </select>

                        <button onClick={handleSearch}>Buscar</button>
                    </div>
                </div>
            )}
        </div>
    );
}
