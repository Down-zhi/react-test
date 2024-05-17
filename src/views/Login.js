import {useSearchParams, Link, useLocation} from "react-router-dom";

export default function Login(props) {
    const [search, setSearch] = useSearchParams()
    const location = useLocation()
    console.log(location)
    return (
        <div>
            <h1>登陆页面</h1>
            <p>登陆成功以后，页面进行跳转
                <Link to={search.get("state")}>{search.get("state")}</Link>
            </p>
        </div>
    );
}

