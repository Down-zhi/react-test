import { DatePicker,message,Alert } from 'antd';
import React, { useState } from 'react';
import {useRoutes} from "react-router-dom";
import {routes} from '../Antd-views/routes';
import "./style.css"
function Appantd(){
    const [date, setDate] = useState(null);
    return (
        <div>
            <DatePicker></DatePicker>
            当前日期：{date ? date.format('YYYY-MM-DD') : '未选择'}
            <Alert message="当前日期" description={date ? date.format('YYYY年MM月DD日') : '未选择'} />
            {useRoutes(routes)}
        </div>
    )
}
 
export default Appantd;