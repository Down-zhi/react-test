import {Link} from "react-router-dom";

export default function Home(props) {
    return (
        <div>
            <h1>首页组件</h1>
            <h4>路径参数</h4>
            <Link to="/user/100/pic">用户Id=100</Link>
            <br/>
            <Link to="/user/40/info">用户Id=40 </Link>
            <hr/>
        <h4>查询参数</h4>
            <Link to="/login?state=/">登陆来源: Home</Link>
            <br/>
            <Link to="/login?state=/user/6/pic">登陆来源: User id=6的用户 </Link>
        </div>
    );
}

