// React 何时选择保留---或重置状态***?---相同位置的相同组件会使得state被保留下来 ，*** React 在移除一个组件时，也会销毁它的 state。
//:当向组件改变一个状态时，状态不是保留在组件里，而是react中 ，通过组件在渲染树的位置将正确的组件和保存的状态关联起来
import { useState } from 'react';
import { images } from './data';

export function Count1() {
  const [showB, setShowB] = useState(true);
  return (
    <div>
      <Counter />
      {showB && <Counter />} 
      <label>
        <input
          type="checkbox"
          checked={showB}
          onChange={e => {
            setShowB(e.target.checked)
          }}
        />
        渲染第二个计数器
      </label>
    </div>
  );
}

function Counter() {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        加一
      </button>
    </div>
  );
}
//为什么你不应该把组件函数的定义嵌套起来？。
export  function MyComponent() {
const [count,sercount]=useState(0)
 function Myinput(){
    const [text,settext]=useState('')
    return(
        <input value={text} onChange={(e)=>settext(e.target.value)} ></input>
    )
 }
 return(<>
 <Myinput/> 
  <button onClick={()=>sercount(count+1)}>点击了{count}次</button>
  </> )
}
// 每次点击按钮时输入框内的值都会消失因为每次点击按钮，Myconponent渲染时都产生新的MYinput组件
// 你在相同位置渲染的是 不同 的组件，所以 React 将其下所有的 state 都重置了

// 如何强制 React 重置组件的状态?
// 两个方法


// 写一个聊天组件   1一个聊天框组件Chat 一个文本框和一个按钮发送信息 2一个选择跟谁聊天 3一个主函数
const peoples = [
    { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
    { id: 1, name: 'Alice', email: 'alice@mail.com' },
    { id: 2, name: 'Bob', email: 'bob@mail.com' }
  ];
function Chat({ people}){
const [text,settext]=useState('')
return(
    <section className="chat">
    <textarea value={text} placeholder={'跟'+people.name+'聊天'} onChange={(e)=>settext(e.target.value)}> </textarea>
    <button onClick={()=>alert('发送成功')}>{'发送到'+people.email}</button>
    </section>
)
}
function ContactList({peoples,Select,  selectedContact}){  //从父组件哪里接收那些参数想一想，可以先写写到了再回头
return( <section className="contact-list">
 <ul>
    {peoples.map(people=><li key={people.id}><button onClick={()=>Select(people)}>{people.name}</button></li>)}                     
    {/* 一个是按钮点击的函数，一个是遍历的 内容     */}
    </ul>                                   
</section>)
}
export function Messenger(){
const [to,setto]=useState(peoples[0]) //给谁发
return(
    <>
    <ContactList peoples={peoples} Select={people=>setto(people) }  />
    {/* <Chat people={to} />   为什么这样当点击其他人的时候聊天框内容没有变化
     */}
     <Chat people={to} key={to.id}/>
    </> 
)
}
//复选框控制哪个字段放在前面，reverse后文本框重置了 为什么怎么解决？
function Field({ label }) {
    const [text, setText] = useState('');
    return (
      <label>
        {label}：
        <input value={text} placeholder={label} onChange={e => setText(e.target.value)}
        />
      </label>
    );
  }
export function Reverse(){
    const [reverse,setreverse]=useState(false);
   let checkbox=( <input type='checkbox' checked={reverse} onClick={(e)=>setreverse(e.target.checked)}>
                 </input>)
   if (reverse) {
    return (
      <>
        <Field key="lastName" label="姓氏" />      
        <Field key="firstName" label="名字" />
        {/* 只知道它们在父组件中的位置并不足以实现功能。有没有办法告诉 React 如何匹配多次重新渲染中的 state？ */}
        {/* <Field> 组件都指定一个 key。这样可以告诉 React 如何为两个 <Field> “匹配”正确的状态——即使它们在父组件中的顺序会发生变化 */}
        {checkbox}
      </>
    );
  } else {
    return (
      <>
        <Field key="firstName" label="名字" /> 
        <Field key="lastName" label="姓氏" />
        {checkbox}
      </>
    );    
  }
}
// 练习3 清除正在加载的图片
export  function Clearimg() {
    const [index, setIndex] = useState(0);
    const hasNext = index < images.length - 1;
  
    function handleClick() {
      if (hasNext) {
        setIndex(index + 1);
      } else {
        setIndex(0);
      }
    }
  
    let image = images[index];
    return (
      <>
        <button onClick={handleClick}>
          下一张
        </button>
        <h3>
          {images.length} 张图片中的第 {index + 1} 张
        </h3>
        <img src={image.src} />
        <p>
          {image.place}
        </p>
      </>
    );
  }
//   为 <img>提供一个 key当key更改时,React 将从头开始重新创建 <img> DOM 节点。