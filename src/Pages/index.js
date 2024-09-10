import IndexLayout from "../Layouts/IndexLayout";
import MainLayout from "../Layouts/MainLayout";
import PagesLayaut from '../Layouts/PagesLayaut'
import { createBrowserRouter } from "react-router-dom";
import Usuarios from '../Pages/Usuarios/Usuarios'
import Banners from "./Banners/Banners";
import Main from "./Main/Main";
import Contacto from "./Contacto/Contacto";
import PageDetail from '../Pages/PageDetail/PageDetail';
import PublicacionDetail from '../Pages/PublicacionDetail/PublicacionDetail';
import PagePublicaciones from "./PagePublicaciones/PagePublicaciones";
import Publicaciones from "./Publicaciones/Publicaciones";
import Categorias from "./Categorias/Categorias";
import PublicacionesFilterPage from "./PublicacionesFilterPage/PublicacionesFilterPage";
export const router = createBrowserRouter([

    {
        path: "/",
        element: <IndexLayout />,

    },
    {
        path: "/",
        element: <PagesLayaut />,
        children: [
            {
                path: `/mamisvip/:idPublicacion/:publicacion`,
                element: <PageDetail />,
            },
            {
                path: `/mamisvip/:categoria/:idCategoria/:estado`,
                element: <PublicacionesFilterPage />,
            },


            {
                path: `/blog`,
                element: <PagePublicaciones />,
            },
            {
                path: `/blog/:idPublicacion/:publicacion`,
                element: <PublicacionDetail />,
            },

        ]
    },

    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: `/dashboard`,
                element: <Main />,
            },

            {
                path: `/dashboard/usuarios`,
                element: <Usuarios />,
            },
            {
                path: `/dashboard/banners`,
                element: <Banners />,
            },
            {
                path: `/dashboard/contacto`,
                element: <Contacto />,
            },
            {
                path: `/dashboard/publicaciones`,
                element: <Publicaciones />,
            },
            {
                path: `/dashboard/categorias`,
                element: <Categorias />,
            },

        ],
    },


]);
