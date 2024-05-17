import Home from '../views/Home'
import Login from '../views/Login'
import Register from '../views/Register'
import User from '../views/User'

import Info from "../views/Info";
import Pic from "../views/Pic";
export const routes = [
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/register",
        element: <Register/>,
    },
    {
        path: "/user/:id/", //新加两个路由参数id和info
        element: <User/>,
        //嵌套路由
        children: [      // 被嵌套的路径的path路径不能以 / 开头
            {path: '', element: <Info/>},
            {path: 'info', element: <Info/>},
            {path: 'pic', element: <Pic/>}
        ]
    },
];