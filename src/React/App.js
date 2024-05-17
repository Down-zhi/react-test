import { Route,Routes, useRoutes,Link,NavLink,useNavigate } from "react-router-dom";
import {routes} from'../React/router'
import "./style.css"
//提供三种页面跳转的方式 两种组件Link,NavLink ，一个Hook useNavigate
export function AppRoute(){
    const navigate= useNavigate()
    return (
        <div>
        <div className="link" style={{
                background: "#eee",
                height: "50px",
                display: "flex",
                lineHeight: "50px", //居中
            }}>
            {/*高亮路由链接组件 当位于某个页面时页面链接部分处于高亮*/}
            <NavLink  to="/">站点首页</NavLink>
            <NavLink to="/user">用户中心</NavLink>
            <NavLink to="/login">登陆页面</NavLink>
            <NavLink to="/register">注册页面</NavLink>
        </div>
        <div  className="link">
            {/*普通路由链接组件*/}
            <Link to="/">站点首页</Link>
            <Link to="/user">用户中心</Link>
            <Link to="/login">登陆页面</Link>
            <Link to="/register">注册页面</Link>
        </div>
        <div  className="link">
            {/*Hook*/}
            <a onClick={()=>navigate("/")}>站点首页</a>
            <a onClick={()=>navigate("/user")}>用户中心</a>
            <a onClick={()=>navigate("/login")}>登陆页面</a>
            <a onClick={()=>navigate("/register")}>注册页面</a>
        </div>
        {useRoutes(routes)} 
        {/* 页面文件 */}
        <div>
            <Routes>
                {/* 同一个组件可以绑定不同的Url */}
                {/* 项目中要单独使用一个路由表进行映射不会写在主组件中 */}
                {/* <Route path="/" element={<Home/>} />
                <Route path="/home" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/user" element={<User/>} /> */}
            </Routes>
        </div>
    </div>
    )
}