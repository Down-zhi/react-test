import { useState, useEffect  } from 'react';
// import { experimental_useEffectEvent as useEffectEvent } from 'react';
// 无论是否执行指定交互操作，都保证当前选中的聊天室服务器一直有一个活跃连接。用户是否只启动了应用，或选中了不同的聊天室，又或者导航到另一个屏幕后返回，Effect 都可以确保组件和当前选中的聊天室保持同步，并在必要时 重新连接。
function createConnection(serverUrl, roomId) {
    return {
      connect() {
        console.log('✅ Connecting to "' + roomId + '" room at ' + serverUrl + '...');
      },
      disconnect() {
        console.log('❌ Disconnected from "' + roomId + '" room at ' + serverUrl);
      }
    };
  }
  function sendMessage(message) {
    console.log('🔵 You sent: ' + message);
  }
  const serverUrl = 'http://localhost:3000/'
  function ChatRoom({ roomId }) {
    const [message, setMessage] = useState('');
  //roomId和message都是响应式的值，参与组件的渲染数据流
    useEffect(() => {
      const connection = createConnection(serverUrl, roomId);
      connection.connect();
      return () => connection.disconnect();
    }, [roomId]); //记住 只有当依赖项和上次渲染不一样 ，有变化才会重新同步（更新重新执行）
    function handleSendClick() {
        sendMessage(message);
      }
    return (
      <>
        <h1>Welcome to the {roomId} room!</h1>
        <input value={message} onChange={e => setMessage(e.target.value)} />
        <button onClick={handleSendClick}>Send</button>
      </>
    );
  }
  export  function ChooseChat() {
    const [roomId, setRoomId] = useState('general');
    const [show, setShow] = useState(false);
    return (
      <>
        <label>
          Choose the chat room:{' '}
          <select
            value={roomId}
            onChange={e => setRoomId(e.target.value)}
          >
            <option value="general">general</option>
            <option value="travel">travel</option>
            <option value="music">music</option>
          </select>
        </label>
        <button onClick={() => setShow(!show)}>
          {show ? 'Close chat' : 'Open chat'}
        </button>
        {show && <hr />}
        {show && <ChatRoom roomId={roomId} />}
      </>
    );
  }

  //在Effect中如何进行非响应式逻辑 ,使用 useEffectEvent 这个特殊的 Hook 从 Effect 中提取非响应式逻辑   
  function ChatRoom1({ roomId, theme }) {
    // const onConnected = useEffectEvent(() => {       //useEffectEvent暂时还不能用,接收的是函数
    //   // 改变主题
    // });
  
    useEffect(() => {
      const connection = createConnection(serverUrl, roomId);
      connection.on('connected', () => {                               //这样就可以在Effect中使用非响应逻辑
        // onConnected();
      });
      connection.connect();
      return () => connection.disconnect();
    }, [roomId]);
  
    return <h1>Welcome to the {roomId} room!</h1>
  }
  //在Effect中进行非响应式逻辑的局限性和有什么用？ 局限性在于只能在Effect这调用它 并且不能把它传递给其他组件  作用是可以读取最新的 props 和 state

  //练习timer Timer 组件保存了一个 count 的 state 变量，这个变量每秒增加一次。每次增加的值存储在 increment state 变量中，你可以使用加减按钮控制它。例如，尝试点击加号按钮九次，注意现在 count 每次都增加 10 而不是 1。
  //但是每次点击每秒增加数的时候，Effect都会重新同步，有停顿，如何让他不产生停顿
  export  function AddTimer() {
    const [count, setCount] = useState(0);
    const [increment, setIncrement] = useState(1);
  //调用 setCount 而使用当前 increment 值不需要响应，但是要在Effect中触发因此可以使用
  // const onclick=useEffectEvent(()=>{
  //   setCount(c => c + increment);
  // })
    useEffect(() => {
      const id = setInterval(() => {
        // setCount(c => c + increment);
        onclick()
      }, 1000);
      return () => {
        clearInterval(id);
      };
    }, []);
  
    return (
      <>
        <h1>
          Counter: {count}
          <button onClick={() => setCount(0)}>Reset</button>
        </h1>
        <hr />
        <p>
          Every second, increment by:
          <button disabled={increment === 0} onClick={() => {
            setIncrement(i => i - 1);
          }}>–</button>
          <b>{increment}</b>
          <button onClick={() => {
            setIncrement(i => i + 1);
          }}>+</button>
        </p>
      </>
    );
  }
  //------------------------------------------------移除 Effect 依赖----------------------------------

  //1.首先要思考这段代码应该移到事件处理程序中吗？特定的交互请将该逻辑直接放到相应的事件处理程序中而不是在Effect中使用依赖来进行
  //2。Effect 是否在做几件不相关的事情？ 比如你想要根据 选择国家 通过网络同步 city state和根据 city 状态通过网络同步 areas state
  // 两件不同的事情由两个独立的 Effect 来同步。两个独立的 Effect 有两个独立的依赖，所以它们不会在无意中相互触发。
  function Timer() {
    const [count, setCount] = useState(0);
    useEffect(() => {
      console.log('✅ 创建定时器');
      const id = setInterval(() => {
        console.log('⏰ Interval');
        // setCount(count+1); Effect 内部将count状态更新为count + 1会使 Effect依赖于count，会导致每次更新定时器都会清除重新创建
        setCount(c=>c+1);  //使用更新函数就不会，并清除掉依赖项
      }, 1000);
      return () => {
        console.log('❌ 清除定时器');
        clearInterval(id);
      };
    },[]); //如果不写依赖数组，React会默认认为该副作用函数依赖于所有外部变量（包括props和state）
  
    return <h1>计数器: {count}</h1>
  }