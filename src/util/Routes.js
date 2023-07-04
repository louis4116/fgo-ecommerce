import { lazy } from "react";
const Product = lazy(() => import("../pages/product/Product"));
const Checkout = lazy(() => import("../pages/checkout/Checkout"));
const ProductDetail = lazy(() =>
  import("../pages/productdetail/ProductDetail")
);
const PersonalPage = lazy(() => import("../pages/personal/Personalpage"));
const AccountPage = lazy(() => import("../pages/accountpage/AccountPage"));
const ErrorPage = lazy(() => import("../pages/errorpage/ErrorPage"));
const PersonalINF = lazy(() =>
  import("../components/personal/information/PersonalINF")
);
const PersonalItem = lazy(() =>
  import("../components/personal/item/PersonalItem")
);
const ItemDetail = lazy(() =>
  import("../components/personal/itemdetail/ItemDetail")
);

export const productRoutes = (currentUser) => [
  {
    path: "/",
    element: <Product />,
  },
  {
    path: "products/:id",
    element: <ProductDetail />,
  },
  {
    path: "checkout",
    element: <Checkout />,
  },
  {
    path: "login",
    element: <AccountPage />,
  },
  {
    path: "personal",
    //查看用戶是否登入
    element: currentUser ? <PersonalPage /> : <ErrorPage />,
    children: [
      { path: "", element: <PersonalINF /> },
      { path: "order", element: <PersonalItem /> },
      { path: "order/:id", element: <ItemDetail /> },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
];
