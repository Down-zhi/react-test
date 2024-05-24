import { ChromePicker } from "react-color";
import React,{useState} from 'react';
import { Popover } from "antd";

import styles from "./index.less";
interface ColorChoose{
value:string;
onChange:(key:string)=>void;  //接收的参数是字符串类型的key标识
}

const ColorCatch =(porps:ColorChoose){
    const{value,onChange}=porps;

    //颜色选择函数
    const handleColorChange=(color:any)=>{
        onChange(color?.hex);  //如果存在且有hex属性就把值传入 ，hex颜色的十六进制（Hexadecimal）表示法
    }

    return(
      <Popover        //弹出框
      title={null}   
      placement="bottomLeft"  //位置在被点击元素的左下
      trigger="click"         //触发方式
      overlayStyle={{ padding: 6 }} 
      content={            //内容是颜色选择库
        <ChromePicker
          className={styles["color-picker"]}
          color={value}
          onChange={handleColorChange}
        />
      }
    >
      <div style={{ backgroundColor: value }} className={styles["color-hold"]}></div>
    </Popover>
    )
}