import IndexLayout from "../Layouts/IndexLayout";
import MainLayout from "../Layouts/MainLayout";
import PagesLayaut from '../Layouts/PagesLayaut'
import { createBrowserRouter } from "react-router-dom";
import Usuarios from '../Pages/Usuarios/Usuarios'
import Banners from "./Banners/Banners";
import Main from "./Main/Main";
import Contacto from "./Contacto/Contacto";
import PageDetail from '../Pages/PageDetail/PageDetail';
import Publicaciones from "./Publicaciones/Publicaciones";
import Categorias from "./Categorias/Categorias";
import PublicacionesFilterPage from "./PublicacionesFilterPage/PublicacionesFilterPage";
import PagesInfo from "./PagesInfo/PagesInfo";
import link from "../Components/link";
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
                path: `/${link}/:categoria/:estado/:idPublicacion/:publicacion`,
                element: <PageDetail />,
            },
            {
                path: `/${link}/:categoria/:idCategoria/:estado`,
                element: <PublicacionesFilterPage />,
            },


            {
                path: `/${link}/:info`,
                element: <PagesInfo />,
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
