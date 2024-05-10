// 了解----声明式 UI 编程与****命令式 UI 编程有何不同?
// ***你必须去根据要发生的事情写一些明确的命令去操作UI 必须从加载动画到按钮地“命令”每个元素，所以这种告诉计算机如何去更新 UI 的编程方式被称为命令式编程
//--- React 中，你不必直接去操作 UI —— 你不必直接启用、关闭、显示或隐藏组件。相反你只需要声明你想要显示的内容，React 就会通过计算得出该如何去更新 UI。

// 了解如何列举组件可能处于的不同视图状态?
// 无数据：表单有一个不可用状态的“提交”按钮。
// 输入中：表单有一个可用状态的“提交”按钮。
// 提交中：表单完全处于不可用状态，加载动画出现。
// 成功时：显示“成功”的消息而非表单。
// 错误时：与输入状态类似，但会多错误的消息。

import { useState } from 'react';

export default function Formanswer() {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');

  if (status === 'success') {
    return <h1>That's right!</h1>
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      await submitForm(answer);
      setStatus('success');
    } catch (err) {
      setStatus('typing');
      setError(err);
    }
  }

  function handleTextareaChange(e) {
    setAnswer(e.target.value);
  }

  return (
    <>
      <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={answer}
          onChange={handleTextareaChange}
          disabled={status === 'submitting'}
        />
        <br />
        <button disabled={
          answer.length === 0 ||
          status === 'submitting'
        }>
          Submit
        </button>
        {error !== null &&
          <p style={{color:'red'}}>
            {error.message}
          </p>
        }
      </form>
    </>
  );
}

function submitForm(answer) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shouldError = answer !== '八九十'
      if (shouldError) {
        reject(new Error('Good guess but a wrong answer. Try again!'));
      } else {
        resolve();
      }
    }, 1500);
  });
}

// 了解如何在代码中触发不同视图状态的变化 如何开发一个组件时？
// 1.写出你的组件中所有的视图状态。
// 2.确定是什么触发了这些 state 的改变。
// 3.通过 useState 模块化内存中的 state。
// 4.删除任何不必要的 state 变量。
// 5.连接事件处理函数去设置 state。

// 给图片或背景添加类名
 export function Picture(){
    const[isActive,setisActive]=useState(false)    //当点击时改变状态
    let backgroundClassName = 'background';
    let pictureClassName = 'picture';
    if(isActive){
        pictureClassName='picture-active'
    }else{
        backgroundClassName='background-active';
    }

    return(
<div className={backgroundClassName} onClick={()=>{setisActive(false)}}>
<img className={pictureClassName} onClick={e=>{e.stopPropagation();setisActive(true)}}  alt="Rainbow houses"/>
</div>
    )
 }
 //个人信息编辑器
 export  function EditProfile() {
  const [isEdit,setIsEdit]=useState(false);
  const [firstName, setFirstName] = useState('Jane');
  const [lastName, setLastName] = useState('Jacobs');
  
    return (
      <form onSubmit={(e)=>{e.preventDefault();setIsEdit(!isEdit)}}>          
      {/* 输入框有东西提交才会触发onsubmit */}
        <label>
          First name:{}
         {isEdit? <input value={firstName} onChange={e=>{setFirstName(e.target.value)}}>
          </input>:<b>{firstName}</b> }
        </label><br/>
        <label>
          Last name:{}
         {isEdit? <input value={lastName} onChange={e=>{setLastName(e.target.value)}}>
          </input>:<b>{lastName}</b> }
        </label><br/>
        <button type="submit" >
        {isEdit ? 'Save' : 'Edit'} Profile
        </button>
        <p><i>Hello {firstName} {lastName} </i></p>
      </form>
    );
  }
  