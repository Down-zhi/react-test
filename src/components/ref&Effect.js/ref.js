import { useRef,useState ,forwardRef} from "react";
// 如何向组件添加 ref
export default function Counter() {
    let ref = useRef(0);        //你想要引用的初始值作为唯一参数。例如，这里的 ref 引用的值是“0”
  
    function handleClick() {
      ref.current = ref.current + 1; //可以用 ref.current 属性访问该 ref 的当前值。这个值是有意被设置为可变的，意味着你既可以读取它也可以写入它
      alert('你点击了 ' + ref.current + ' 次！');
    }
    return (
      <button onClick={handleClick}>
        点击我！
      </button>
    );
  }

// 如何更新 ref 的值?可以用 ref.current 属性访问该 ref 的当前值。这个值是有意被设置为可变的，意味着你既可以读取它也可以写入它
// ref 与 state 有何不同?ref不会重新渲染,ref可以修改current的值,渲染期间不能读取ref的值

//--------------示例：制作秒表
// 当用户按下“开始”时，你将用 setInterval 每 10 毫秒更新一次时间：当按下“停止”按钮时，你需要取消现有的 interval，以便让它停止更新 now state 变量。

export function Stoptime(){
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const intervalRef=useRef(null) //提供 interval ID，此 ID 是之前用户按下 Start、调用 setInterval 时返回的。你需要将 interval ID 保留在某处。 由于 interval ID 不用于渲染，你可以将其保存在 ref 中


  function handleStart(){
    setStartTime(Date.now())
    setNow(Date.now())
    clearInterval(intervalRef.current);//清除已有计时器
    intervalRef.current = setInterval(() => {
        setNow(Date.now());
      }, 10);
  }
  function handleStop() {
    clearInterval(intervalRef.current);
  }
  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }
  return(
    <><h1>开始时间{startTime} </h1><br/>
    <h1>写在时间 { now}</h1>
    <h1>时间过去了{secondsPassed.toFixed(3)}</h1> 
    {/* .toFixed(3)是一个Number对象的方法，它会将数字转换为字符串，并保留小数点后三位。    */}
    <button onClick={handleStart}> 开始</button>
      <button onClick={handleStop}>  停止</button>
    </>
  )
}


// 如何安全地使用 ref
//当你使用外部系统或浏览器 API 时，ref 很有用。如果你很大一部分应用程序逻辑和数据流都依赖于 ref，你可能需要重新考虑你的方法。
// 不要在渲染过程中读取或写入 ref.current。

//练习1   发送信息在3秒内可以撤回
export  function Send() {
    const [text, setText] = useState('');
    const [isSending, setIsSending] = useState(false);
    // let timeoutID = null; 常规变量不会在重新渲染之间“存活”，因为每次渲染都从头开始运行你的组件（并初始化其变量）
  let timeoutID=useRef(null)
    function handleSend() {
      setIsSending(true);
    //   timeoutID 
    timeoutID.current  = setTimeout(() => { //.current属性访问该 timeoutID的当前值
        alert('已发送！');
        setIsSending(false);
      }, 3000);
    }
  
    function handleUndo() {
      setIsSending(false);
      clearTimeout(timeoutID.current); 
    }
    return (
      <>
        <input disabled={isSending}value={text} onChange={e => setText(e.target.value)} />
        <button  disabled={isSending} onClick={handleSend}> {isSending ? '发送中……' : '发送'} </button>
        {isSending && <button onClick={handleUndo}>  撤销  </button> }
      </>
    );
  }
  //练习二 发送信息后再在输入框输入内容声明的是最新的文本框内容 
  export function Sendlast(){
    const [text, setText] = useState('');
    const textRef = useRef(text);
return(<>
<input value={text} onChange={(e)=>{setText(e.target.value);textRef.current=text}}></input> 
{/* JSX语法不能使用逗号操作符, state运作起来 就像快照，因此你无法从 timeout 等异步操作中读取最新的 state。但是，你可以在 ref 中保存最新的输入文本。ref 是可变的，因此你可以随时读取 current 属性。由于当前文本也用于渲染 */}
<button onClick={()=>{setTimeout(()=> alert('发送内容为'+textRef.current),3000)}}>send</button>
</>)
  }

//   --------------------------------------------ref操作Dom-------------------------------------------------------------
// 如何使用 ref 属性访问由 React 管理的 DOM 节点
// 1.引入userefHook ,2声明一个ref,3 ref 作为 ref 属性值传递给想要获取的 DOM 节点的 JSX 标签

export function CatFriends() {
    const firstCatRef = useRef(null);
    const secondCatRef = useRef(null);
    const thirdCatRef = useRef(null);
  
    function handleScrollToFirstCat() {
      firstCatRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest', 
        inline: 'center'
      });
    }
  
    function handleScrollToSecondCat() {
      secondCatRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  
    function handleScrollToThirdCat() {
      thirdCatRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  
    return (
      <>
        <nav>
          <button onClick={handleScrollToFirstCat}>
            Tom
          </button>
          <button onClick={handleScrollToSecondCat}>
            Maru
          </button>
          <button onClick={handleScrollToThirdCat}>
            Jellylorum
          </button>
        </nav>
        <div>
          <ul>
            <li>
              <img
                src="/th (1).jpg"
                alt="Tom"
                ref={firstCatRef}
              />
            </li>
            <li>
              <img
                src="/th (2).jpg"
                alt="Maru"
                ref={secondCatRef}
              />
            </li>
            <li>
              <img
                src="/th.jpg"
                alt="Jellylorum"
                ref={thirdCatRef}
              />
            </li>
          </ul>
        </div>
      </>
    );
  }
  
// ref JSX 属性如何与 useRef Hook 相关联
// 如何访问另一个组件的 DOM 节点?
//默认情况下React 不允许组件访问其他组件的 DOM 节点。甚至自己的子组件也不行！
// function MyInput(props) {
//     return <input {...props} />;
//   }
const MyInput = forwardRef((props, ref) => { //MyInput 组件将自己接收到的 ref 传递给它内部的 <input>现在可以了
    return <input {...props} ref={ref} />;
  });

  export  function MyForm() {
    const inputRef = useRef(null);
  
    function handleClick() {
      inputRef.current.focus();
    }
  
    return (
      <>
        <MyInput ref={inputRef} /> 
        {/* 会有错误 ref 放在像 <input /> 这样输出浏览器元素的内置组件上时React 会将该 ref 的 current 属性设置为相应的 DOM 节点
        但将 ref 放在 你自己的 组件上 <MyInput/>在默认情况下不行 */}
        <button onClick={handleClick}>
          聚焦输入框
        </button>
      </>
    );
  }


// 在哪些情况下修改 React 管理的 DOM 是安全的
// 管理焦点、滚动位置或调用 React 未暴露的浏览器 API 避免更改由 React 管理的 DOM 节点。 对 React 管理的元素进行修改、添加子元素、从中删除子元素会导致不一致的视觉结果，或与上述类似的崩溃。
// 你可以安全地修改 React 没有理由更新的部分 DOM。 例如，如果某些 <div> 在 JSX 中始终为空，React 将没有理由去变动其子列表。 因此，在那里手动增删元素是安全的。

// 练习1 播放和暂停
export function VideoPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const ref = useRef(null);
  
    function handleClick() {
      const nextIsPlaying = !isPlaying;
      setIsPlaying(nextIsPlaying);
      if (nextIsPlaying) {
        ref.current.play();
      } else {
        ref.current.pause();
      }
    }
    return (
      <>
        <button onClick={handleClick}>
          {isPlaying ? '暂停' : '播放'}
        </button>
        <video
          width="250"
          ref={ref}
        >
          <source
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
            type="video/mp4"
          />
        </video>
      </>
    )
  }