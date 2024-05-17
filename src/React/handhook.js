import  {useState, useEffect} from 'react';
import axios from "axios";

const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue)
    //可以直接返回,这里是在使用一种称为“受控组件”的模式，其中组件的状态（value）与用户界面保持同步。
    return {
        value,
        onChange: e => setValue(e.target.value)
    }
}

function useAxiosGet(url) {
    const [ data, setData ] = useState('')
    useEffect(() => {
        // get请求
        axios.get(url)
            .then(response => setData(response))
    }, [url])  // 注意这里要传入参数url，代表url改变的时候才触发
    return [data] // 直接返回变量
}

function useTable(city, data){
    return (
        <>
            <input type="text" {...city}/>
            <table style={{
                width: "600px",
                border: "1px solid red"
            }}>
                <tbody>
                <tr style={{border: "1px solid red"}}>
                    <td>日期</td>
                    <td>情报</td>
                </tr>
                {
                    // 如果data存在，并且data中有data属性，data属性中还有month属性，那么就对month这个数组执行map方法
                    data?.data?.month?.map((item, key)=>
                        <tr key={key}>
                            <td>{item.date}</td>
                            <td>{item.day.narrative}</td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </>
    )
}

export function Appget(){
    const city = useInput("北京")
    const [data, error] = useAxiosGet(`https://v0.tianqiapi.com/?version=day&unit=m&language=zh&query=${city.value}&appid=43656176&appsecret=I42og6Lm`)
    const ui = useTable(city, data)
    return (
        <div>
        {ui}
        </div>
    )
}


