import Base from "./Base";
import Goods from "./Goods";
import Home from "./Home";
import Login from "./Login";
import User from "./User";
export const routes = [
    {
        path: "/",
        element: <Base/>,
        children: [
            {
                path: "",
                element: <Home/>,
            },
            {
                path: "user",
                element: <User/>,
            },
            {
                path: "goods",
                element: <Goods/>,
            },
        ]
    },
    {
        path: "/login",
        element: <Login/>,
    },
];