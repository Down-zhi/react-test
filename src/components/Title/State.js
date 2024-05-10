// 如何使用 useState Hook 添加 state 变量?
// 要使用新数据更新组件，需要做两件事：1.保留 渲染之间的数据。2.触发React使用新数据渲染组件（重新渲染）。
import { useState ,useEffect} from 'react';
import { sculptureList } from './data.js';
import { letters } from './data.js';
export function Gallery(){
    const [index,setIndex]=useState(0);//index 是一个 state 变量，setIndex 是对应的 setter 函数。告诉React你想让这个组件记住INDEX
    const [showMore,setShowMore]=useState(false)

    let isPre=index>0
    let isNex=index<sculptureList.length-1
    function  handlePreClick(){
      //在index<=0时才可以点击
      if( isPre ){
      setIndex(index-1)}
    }
    function  handleNextClick(){
      //当在最后一个后点击禁用按钮
      if(isNex){
       setIndex(index+1);}
    }
     function  handleMoreClick(){
    setShowMore(!showMore)
     }
let sculpture=sculptureList[index];
return(
    <>
    <button onClick={handlePreClick} disabled={!isPre}>Prev</button>
    <button onClick={handleNextClick} disabled={!isNex}>Next</button>
    
    <h2><i>{sculpture.name}</i>
    {sculpture.artist}
    </h2>
    <h3>
        ({index+1}/{sculptureList.length})
    </h3>
    <button onClick={handleMoreClick}> {showMore ? 'Hide' : 'Show'}Details</button>
       {showMore&& <p>{sculpture.description}</p>}
    </>
)
}
// useState Hook 返回哪一对值?
//index 是一个 state 变量，setIndex 是对应的 setter 函数。useState 以及任何其他以“use”开头的函数都被称为 Hook。
// 每次调用 useState 时，React 都会为你提供一个 state 对并增加索引值。

// 如何添加多个 state 变量?
// question ：为什么 state 被称作是局部的? 如果你渲染同一个组件两次，每个副本都会有完全隔离的 state！改变其中一个不会影响另一个。


//题目2：下面代码在输入框输入值时会被卡住 没法显示 原因应该是没有修改firstName的值并重新渲染以便让UseState记住  怎么做？
export default function Form() {
    // let firstName = '';
    // let lastName = '';
  //更新  
  let [firstName,setFirstName]=useState('')
  let [lastName,setLasttName]=useState('')

    function handleFirstNameChange(e) {
        // firstName=e.target.value
      setFirstName ( e.target.value);
    }
  
    function handleLastNameChange(e) {
        // lastName=e.target.value
     setLasttName( e.target.value);
    }
  
    function handleReset() {
        // firstName = '';
        // lastName = '';
      setFirstName('');setLasttName('')
    }
  
    return (
      <form onSubmit={e => e.preventDefault()}>
        <input
          placeholder="First name"
          value={firstName}
          onChange={handleFirstNameChange}
        />
        <input
          placeholder="Last name"
          value={lastName}
          onChange={handleLastNameChange}
        />
        <h1>Hi, {firstName} {lastName}</h1>
        <button onClick={handleReset}>Reset</button>
      </form>
    );
  }
  //题目3：当内容被提交时，先声明再显示一条感谢信息，没提交文本框内容一直在
  export function FeedbackForm() {
    const [isSent, setIsSent] = useState(false);
    const [message, setMessage] = useState('');
    //保证对 Hook 的所有调用都发生在第一个 return 前 ,否则会崩溃
if(isSent){
    return <h1>Thanks you</h1>
}else{
 return(

    <form onSubmit={e=>{
        e.preventDefault();
        alert('发送'+message)
        setIsSent(true)
    }}>  
    {/* 文本框里的value是内容 ，当onchange时改变message */}
           <textarea placeholder='message' 
           value={message}
           onChange={e=>setMessage(e.target.value)}
           >
           </textarea> <br />
<button type='submit'>Send</button>
{/* 当点击时 执行 onSubmit 事件处理函数。
setIsSent(true) 将 isSent 设置为 true 并排列一个新的渲染。
React 根据新的 isSent 值重新渲染组件。 */}
    </form>
 )
}
}

//题目4 移除不必要的 state,你能解释为什么这个 state 变量是不必要的吗？
export function Greet(){
    // const [name, setName] = useState(''); 不需要
    function handleClick(){
        const name=prompt('What is your name?')
        alert('你好'+name)
    }
    return (
        <button onClick={handleClick}> Greet</button>
    )
}
// 因为State 变量仅用于在组件重渲染时保存信息。在单个事件处理函数中，普通变量就足够了。当普通变量运行良好时，不要引入 state 变量。

//----------------------------------------------------------状态管理的state-----------------------------------------------------------------------
// 使用单个state变量还是多个state变量？如果两个state变量总是一起更新，请考虑将它们合并为一个。
function useTime() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}
function Clock(props) {
  return (
    <h1 style={{ color: props.color }}>
      {props.time}
    </h1>
  );
}
export function Timecolor() {
  const time = useTime();
  const [color, setColor] = useState('lightcoral');
  return (
    <div>
      <p>
        Pick a color:{' '}
        <select value={color} onChange={e => setColor(e.target.value)}>
          <option value="lightcoral">lightcoral</option>
          <option value="midnightblue">midnightblue</option>
          <option value="rebeccapurple">rebeccapurple</option>
        </select>
      </p>
      <Clock color={color} time={time.toLocaleTimeString()} />
    </div>
  );
}

// 如何解决 state 结构中的常见问题？
//不要将props放入state中，对于选择类型的UI模式，请在state中保存ID或索引而不是对象本身。
function Letter({letter,onToggle, isSelected}) {  //多选
  return (
    <li className={isSelected ? 'selected' : '' }>
      <label> <input type="checkbox"checked={isSelected}onChange={() => { onToggle(letter.id); }} />
        {letter.subject}
      </label>
    </li>
  )
}
export  function MailClient() {
  const [selectedIds, setSelectedIds] = useState(
    new Set()
  );
  const selectedCount = selectedIds.size;

  function handleToggle(toggledId) {
    // Create a copy (to avoid mutation).
    const nextIds = new Set(selectedIds);
    if (nextIds.has(toggledId)) {
      nextIds.delete(toggledId);
    } else {
      nextIds.add(toggledId);
    }
    setSelectedIds(nextIds);
  }

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map(letter => (
          <Letter key={letter.id} letter={letter} isSelected={  selectedIds.has(letter.id)  }
            onToggle={handleToggle}
          />
        ))}
        <hr />
          <b>
            You selected {selectedCount} letters
          </b>
      </ul>
    </>
  );
}

