const estadosYmunicipios = [
    {
        nombre: "Aguascalientes",
        municipios: [
            "Aguascalientes",
            "Asientos",
            "Calvillo",
            "Cosío",
            "Jesús María",
            "Pabellón de Arteaga",
            "Rincón de Romos",
            "San Francisco de los Romo"
        ]
    },
    {
        nombre: "Baja California",
        municipios: [
            "Ensenada",
            "Mexicali",
            "Tecate",
            "Playas de Rosarito",
            "San Quintín"
        ]
    },
    {
        nombre: "Baja California Sur",
        municipios: [
            "La Paz",
            "Los Cabos",
            "Comondú",
            "Loreto",
            "Mulegé"
        ]
    },
    {
        nombre: "Campeche",
        municipios: [
            "Campeche",
            "Calkiní",
            "Ciudad del Carmen",
            "Escárcega",
            "Hopelchén",
            "Palizada",
            "Tenabo",
            "Champotón"
        ]
    },
    {
        nombre: "Chiapas",
        municipios: [
            "Tuxtla Gutiérrez",
            "San Cristóbal de las Casas",
            "Comitán",
            "Tapachula",
            "Palenque",
            "Ocosingo",
            "Chiapas de Corzo",
            "Motozintla"
        ]
    },
    {
        nombre: "Chihuahua",
        municipios: [
            "Chihuahua",
            "Ciudad Juárez",
            "Cuauhtémoc",
            "Delicias",
            "Parral",
            "Nuevo Casas Grandes",
            "Meoqui",
            "Camargo"
        ]
    },
    {
        nombre: "Coahuila",
        municipios: [
            "Saltillo",
            "Torreón",
            "Monclova",
            "Piedras Negras",
            "Acuña",
            "Ramos Arizpe",
            "San Pedro",
            "Frontera"
        ]
    },
    {
        nombre: "Colima",
        municipios: [
            "Colima",
            "Manzanillo",
            "Tecomán",
            "Comala",
            "Villa de Álvarez",
            "Armería",
            "Cuauhtémoc"
        ]
    },
    {
        nombre: "Durango",
        municipios: [
            "Durango",
            "Gómez Palacio",
            "Lerdo",
            "Santiago Papasquiaro",
            "Pueblo Nuevo",
            "Canatlán",
            "Mapimí",
            "Nuevo Ideal"
        ]
    },
    {
        nombre: "Guanajuato",
        municipios: [
            "Guanajuato",
            "León",
            "Celaya",
            "Irapuato",
            "Salamanca",
            "Silao",
            "San Miguel de Allende",
            "Dolores Hidalgo"
        ]
    },
    {
        nombre: "Guerrero",
        municipios: [
            "Acapulco",
            "Chilpancingo",
            "Iguala",
            "Taxco",
            "Zihuatanejo",
            "Tlapa",
            "Coyuca de Benítez",
            "Tecpan de Galeana",
            "Acapulco de Juárez",
            "Chilpancingo de los Bravo",
            "Iguala de la Independencia",
            "Taxco de Alarcón",
            "Zihuatanejo de Azueta",
            "Ayutla de los Libres",
            "Ometepec"
        ]
    },
    {
        nombre: "Hidalgo",
        municipios: [
            "Pachuca",
            "Tulancingo",
            "Tula de Allende",
            "Ixmiquilpan",
            "Huejutla de Reyes",
            "Actopan",
            "Tepeji del Río",
            "Tizayuca"
        ]
    },
    {
        nombre: "Jalisco",
        municipios: [
            "Guadalajara",
            "Zapopan",
            "Tlaquepaque",
            "Tonalá",
            "Puerto Vallarta",
            "Lagos de Moreno",
            "Tepatitlán",
            "El Salto"
        ]
    },
    {
        nombre: "Estado de México",
        municipios: [
            "Toluca",
            "Ecatepec",
            "Naucalpan",
            "Tlalnepantla",
            "Nezahualcóyotl",
            "Cuautitlán Izcalli",
            "Chimalhuacán",
            "Texcoco"
        ]
    },
    {
        nombre: "Michoacán",
        municipios: [
            "Morelia",
            "Uruapan",
            "Zamora",
            "Lázaro Cárdenas",
            "Apatzingán",
            "Pátzcuaro",
            "Zitácuaro",
            "La Piedad"
        ]
    },
    {
        nombre: "Morelos",
        municipios: [
            "Cuernavaca",
            "Jiutepec",
            "Cuautla",
            "Temixco",
            "Yautepec",
            "Jojutla",
            "Puente de Ixtla",
            "Xochitepec"
        ]
    },
    {
        nombre: "Nayarit",
        municipios: [
            "Tepic",
            "Bahía de Banderas",
            "Compostela",
            "Santiago Ixcuintla",
            "Acaponeta",
            "Tuxpan",
            "Ixtlán del Río",
            "Xalisco"
        ]
    },
    {
        nombre: "Nuevo León",
        municipios: [
            "Monterrey",
            "Guadalupe",
            "Apodaca",
            "San Nicolás de los Garza",
            "Santa Catarina",
            "San Pedro Garza García",
            "Escobedo",
            "Linares"
        ]
    },
    {
        nombre: "Ciudad de México",
        municipios: [
            "Álvaro Obregón",
            "Azcapotzalco",
            "Benito Juárez",
            "Coyoacán",
            "Cuajimalpa de Morelos",
            "Cuauhtémoc",
            "Gustavo A. Madero",
            "Iztacalco",
            "Iztapalapa",
            "Magdalena Contreras",
            "Miguel Hidalgo",
            "Milpa Alta",
            "Tláhuac",
            "Tlalpan",
            "Venustiano Carranza",
            "Xochimilco"
        ]
    },

    {
        nombre: "Oaxaca",
        municipios: [
            "Oaxaca de Juárez",
            "Juchitán de Zaragoza",
            "Salina Cruz",
            "San Juan Bautista Tuxtepec",
            "Huajuapan de León",
            "Tehuantepec",
            "Puerto Escondido",
            "Miahuatlán de Porfirio Díaz"
        ]
    },
    {
        nombre: "Puebla",
        municipios: [
            "Puebla",
            "Tehuacán",
            "San Martín Texmelucan",
            "Atlixco",
            "Cholula",
            "Izúcar de Matamoros",
            "Amozoc",
            "Huauchinango"
        ]
    },
    {
        nombre: "Querétaro",
        municipios: [
            "Querétaro",
            "San Juan del Río",
            "El Marqués",
            "Corregidora",
            "Tequisquiapan",
            "Pedro Escobedo",
            "Ezequiel Montes",
            "Colón"
        ]
    },
    {
        nombre: "Quintana Roo",
        municipios: [
            "Cancún",
            "Chetumal",
            "Playa del Carmen",
            "Cozumel",
            "Tulum",
            "Felipe Carrillo Puerto",
            "Isla Mujeres",
            "José María Morelos"
        ]
    },
    {
        nombre: "San Luis Potosí",
        municipios: [
            "San Luis Potosí",
            "Soledad de Graciano Sánchez",
            "Ciudad Valles",
            "Matehuala",
            "Rioverde",
            "Tamazunchale",
            "Cerritos",
            "Santa María del Río"
        ]
    },
    {
        nombre: "Sinaloa",
        municipios: [
            "Culiacán",
            "Mazatlán",
            "Los Mochis",
            "Guasave",
            "Navolato",
            "El Fuerte",
            "Escuinapa",
            "Salvador Alvarado"
        ]
    },
    {
        nombre: "Sonora",
        municipios: [
            "Hermosillo",
            "Cajeme",
            "Nogales",
            "Guaymas",
            "Navojoa",
            "San Luis Río Colorado",
            "Cananea",
            "Caborca"
        ]
    },
    {
        nombre: "Tabasco",
        municipios: [
            "Villahermosa",
            "Cárdenas",
            "Comalcalco",
            "Macuspana",
            "Paraíso",
            "Teapa",
            "Jalapa",
            "Huimanguillo"
        ]
    },
    {
        nombre: "Tamaulipas",
        municipios: [
            "Reynosa",
            "Matamoros",
            "Nuevo Laredo",
            "Ciudad Victoria",
            "Tampico",
            "Altamira",
            "Madero",
            "Río Bravo"
        ]
    },
    {
        nombre: "Tlaxcala",
        municipios: [
            "Tlaxcala",
            "Apizaco",
            "Chiautempan",
            "Huamantla",
            "Calpulalpan",
            "Zacatelco",
            "San Pablo del Monte",
            "Contla"
        ]
    },
    {
        nombre: "Veracruz",
        municipios: [
            "Veracruz",
            "Xalapa",
            "Coatzacoalcos",
            "Poza Rica",
            "Córdoba",
            "Orizaba",
            "Minatitlán",
            "Tuxpan"
        ]
    },
    {
        nombre: "Yucatán",
        municipios: [
            "Mérida",
            "Valladolid",
            "Tizimín",
            "Progreso",
            "Motul",
            "Izamal",
            "Tekax",
            "Umán"
        ]
    },
    {
        nombre: "Zacatecas",
        municipios: [
            "Zacatecas",
            "Guadalupe",
            "Fresnillo",
            "Jerez",
            "Río Grande",
            "Sombrerete",
            "Ojocaliente",
            "Loreto"
        ]
    }

    // Añadir más estados y municipios aquí si es necesario
];

export default estadosYmunicipios;
