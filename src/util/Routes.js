import { lazy,Suspense } from "react";
import { Navigate,Outlet } from "react-router-dom";
import Product from "../pages/product/Product";
import Checkout from "../pages/checkout/Checkout";
import ProductDetail from "../pages/productdetail/ProductDetail";
import Personalpage from "../pages/personal/Personalpage";
import AccountPage from "../pages/accountpage/AccountPage";
import ErrorPage from "../pages/errorpage/ErrorPage";
import PersonalINF from "../components/personal/information/PersonalINF";
import PersonalItem from "../components/personal/item/PersonalItem";
import ItemDetail from "../components/personal/itemdetail/ItemDetail";
import ProtectedRoute from "./ProtectedRoute";


export const productRoutes=(currentUser)=>[
    {
        path:"/",
        element:<Product />
    },
    {
        path:"products/:id",
        element:<ProductDetail />
    },
    {
        path:"checkout",
        element:<Checkout />
    },
    {
        path:"login",
        element:<AccountPage />
    },
    {
        path:"personal", 
        element:currentUser?<Personalpage />:<ErrorPage />,
        children:[
            {path:"",element:<PersonalINF />},
            {path:"order",element:<PersonalItem />},
            {path:"order/:id",element:<ItemDetail />}
        ]
    },
    {
        path:"*",
        element:<ErrorPage />
    }
    
];
