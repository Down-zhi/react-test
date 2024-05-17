import {NavLink, useParams, Outlet} from "react-router-dom";

export default function User(props) {
    const params = useParams() //useParams 这个hook来接受路径参数。
    return (
        <div>
            <h1>用户中心</h1>
            <p>id= {params.id}</p>
            <div style={{
                background: "#eee",
                height: "50px",
                display: "flex",
                lineHeight: "50px",
            }}> 
            {/* 使用Outlet路由占位符组件，表示"路由映射表"中匹配的子路由应对的组件将在此处展示 */}
                <NavLink to={`/user/${params.id}/info`}>基本信息</NavLink>
                <NavLink to={`/user/${params.id}/pic`}>相册中心</NavLink>
            </div>
            <Outlet></Outlet>
            {/* 根据当前URL路径自动展示与之匹配的子路由组件，实现了动态内容区域的灵活切换，而无需手动编写条件渲染逻辑 */}
        </div>
    );
}
