import ParentComponent from './data'
import { useState } from 'react';
// 1.在React中渲染的含义是什么?
// React元素通常是JSX转换成真实的DOM，并将其插入文档中。这个过程是高效的，只会改变必要的DOM元素


//2. 为什么以及什么时候 React 会渲染一个组件?
//渲染的条件 1.组件的初次渲染----React会调用根组件。。2.set函数（或者其祖先之一的状态发生了改变------React 会调用内部状态更新触发了渲染的函数组件。过程是递归的，如果更新时会返回另外一个组件那么渲染完这个组件后会渲染另外一个 以此类推
//3. 在屏幕上显示组件所涉及的步骤?    触发 渲染 提交
//4.为什么渲染并不一定会导致 DOM 更新? 如果渲染结果与上次一样，那么 React 将不会修改 DOM
export default function Ip (){
    return (
        <ParentComponent/>,
        <input></input>
    )
}//React 只会使用最新的 time 更新 <h1> 标签的内容。它看到 <input> 标签出现在 JSX 中与上次相同的位置，因此 React 不会修改 <input> 标签或它的 value！

export  function Counter() {
    const [number, setNumber] = useState(0);
  
    return (
      <>
        <h1>{number}</h1>
        <button onClick={() => {
          setNumber(number + 5);
          setTimeout(() => {
            alert(number);
          }, 3000);       //3秒后 alert的结果仍然是0，虽然React中存储的state已经发生了更改，但它是使用用户与之交互时状态的快照进行调度的！
        }}>+5</button>
      </>
    //   替换法
    //   setNumber(0 + 5);
    //   setTimeout(() => {
    //     alert(0);
    //   }, 3000);
    )
  }

  //调用三次setnumber为什么还是只加了1,因为每次调用时number都0    如何修改
  export function Count(){
   const [number,setNumber]=useState(0)
    return(
        <>
        <h2> {number} </h2>,
        <button onClick={()=>{
            // setNumber(number + 1);
            // setNumber(number+ 1);
            // setNumber(number + 1); 
           
            setNumber(n => n + 1);
            setNumber(n => n + 1);
            setNumber(n => n + 1);
//   n => n + 1 被称为 更新函数。当你将它传递给一个 state 设置函数时：
// 1.React 会将此函数加入队列，以便在事件处理函数中的所有其他代码运行后进行处理。
// 2.在下一次渲染期间，React 会遍历队列并给你更新之后的最终 state。
        }}> +3</button>
        </>
    )
  }