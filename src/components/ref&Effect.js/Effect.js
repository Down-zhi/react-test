// Effects 会在渲染后运行一些代码，以便可以将组件与 React 之外的某些系统同步
// 什么是 Effect?
// Effect 与事件（event）有何不同?
//如何编写一个effect?
// 1.声明 Effect。默认情况下，Effect 会在每次渲染后都会执行。
import {  useState, useRef, useEffect,useMemo } from 'react';
function MyComponent() {
    useEffect(() => {
      // 每次渲染后都会执行此处的代码
    });
    return <div />;
  }
  function VideoPlayer({ src, isPlaying }) {
    const ref = useRef(null);
    useEffect(() => {    //同时使用了ref和isplaying但isPlaying 被声明为了依赖项,是因为ref有稳定的标识保证 每轮渲染中调用 useRef 所产生的引用对象时，
      if (isPlaying) {     //获取到的对象引用总是相同的，即获取到的对象引用永远不会改变，所以它不会导致重新运行 Effect
        ref.current.play();
      } else {
        ref.current.pause();
      }
    },[isPlaying]); //isPlaying prop 以控制逻辑，但又没有直接告诉 Effect 需要依赖这个属性。为了解决这个问题，将 isPlaying 添加至依赖数组 ,每次渲染后只会在isplaying的值和上次不一样时会重新执行
    //如果为空[]这告诉 React 仅在组件“挂载”时运行此代码，即首次出现在屏幕上这一阶段。
    return <video ref={ref} src={src} loop playsInline />;
  }
  
  export default function App() {
    const [isPlaying, setIsPlaying] = useState(false);
    return (
      <>
        <button onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? '暂停' : '播放'}
        </button>
        <VideoPlayer
          isPlaying={isPlaying}
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
        />
      </>
    );
  }
  
// 2.指定 Effect 依赖。大多数 Effect 应该按需执行，而不是在每次渲染后都执行。例如，淡入动画应该只在组件出现时触发。连接和断开服务器的操作只应在组件出现和消失时，或者切换聊天室时执行。
// 依赖数组 传入 useEffect 的第二个参数，以告诉 React 跳过不必要地重新运行 Effect,在Effect像定时器传时间参数那样传入一个空数组 依赖数组可以包含多个依赖项。当指定的所有依赖项在上一次渲染期间的值与当前值完全相同时，React 会跳过重新运行该 Effect
// 3.必要时添加清理（cleanup）函数。有时 Effect 需要指定如何停止、撤销，或者清除它的效果。例如，“连接”操作需要“断连”，“订阅”需要“退订”，“获取”既需要“取消”也需要“忽略”。

// 为什么 Effect 在开发环境中会影响两次，如何修复它们?
// 出现两次的原因是在卸载后 没有关闭连接又重新挂载了. 正确的态度是“如何修复 Effect 以便它在重复挂载后能正常工作”，而不是“如何只运行一次 Effect”。

// React 会在初始挂载组件后，立即再挂载一次。有清理函数也是会重新挂载组件一次，以验证你是否正确地实现了清理函数。

//题目1  每秒执行了两次?如何修改 setInterval 返回一个 interval ID，你可以将其传递给 clearInterval 来停止计时
 function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    function onTick() {
      setCount(c => c + 1);    //没有清理函数,react挂载了两次
    }
  let intervaID = setInterval(onTick, 1000);
  return ()=>clearInterval(intervaID);        //保存 setInterval 返回的 interval ID，并使用 clearInterval 实现一个清理函数
  }, []);

  return <h1>{count}</h1>;
}
export function Showcount() {
    const [show, setShow] = useState(false);
    return (
      <>
        <button onClick={() => setShow(s => !s)}>{show ? '隐藏' : '展示'}计时器</button>
        <br />
        <hr />
        {show && <Counter />}
      </>
    );
  }
  
//-----------------------------------------移除不必要的 Effect 可以让你的代码更容易理解--------------------------------
// 1.你不必使用 Effect 来转换渲染所需的数据
// 2.你不必使用 Effect 来处理用户事件
function TodoList({ todos, filter }) {
    const [newTodo, setNewTodo] = useState('');
    // ✅ 除非 todos 或 filter 发生变化，否则不会重新执行 getFilteredTodos()
    const visibleTodos = useMemo(() => getFilteredTodos(todos, filter), [todos, filter]);//useMemo不会加快第一次渲染,只是跳过不必要的更新
    //React 会在初次渲染的时候记住 getFilteredTodos() 的返回值。在下一次渲染中，它会检查 todos 或 filter 是否发生了变化。如果它们跟上次渲染时一样，useMemo 会直接返回它最后保存的结果。如果不一样，React 将再次调用传入的函数
  }
function getFilteredTodos(){}
  function Form() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
  
    // ✅ 非常好：这个逻辑应该在组件显示时执行
    // useEffect(() => {
    //   post('/analytics/event', { eventName: 'visit_form' });
    // }, []);
  
    // 🔴 避免：在 Effect 中处理属于事件特定的逻辑
    // const [jsonToSubmit, setJsonToSubmit] = useState(null);
    // useEffect(() => {
    //   if (jsonToSubmit !== null) {
    //     post('/api/register', jsonToSubmit);
    //   }
    // }, [jsonToSubmit]);
  
    // function handleSubmit(e) {
    //   e.preventDefault();
    //   setJsonToSubmit({ firstName, lastName });
    // }
    // ...
  }
  //-------------------------------Effect的生命周期----------------------------
  
  function createConnection(serverUrl, roomId) {
    // 实际的实现将会连接到服务器
    return {
      connect() {
        console.log('✅ 连接到 "' + roomId + '" 房间，位于' + serverUrl + '...');
      },
      disconnect() {
        console.log('❌ 断开 "' + roomId + '" 房间，位于' + serverUrl);
      }
    };
  }
  function ChatRoom({ roomId }) {                //在组件主体中声明的所有变量都是响应式的
    const [serverUrl, setServerUrl] = useState('https://localhost:1234');
    // const settings = useContext(SettingsContext); // settings 是响应式的
    // const serverUrl = selectedServerUrl ?? settings.defaultServerUrl; // serverUrl 是响应式的
    useEffect(() => {
      const connection = createConnection(serverUrl, roomId); 
      connection.connect();
      return () => connection.disconnect();
    }, [roomId, serverUrl]);  //这时两个值都会变化,依赖项只有在随时间变化时才会起作用所以都要作为依赖项,避免将对象和函数作为依赖项
  
    return (
      <>
        <label>
          服务器 URL：{' '}
          <input
            value={serverUrl}
            onChange={e => setServerUrl(e.target.value)}
          />
        </label>
        <h1>欢迎来到 {roomId} 房间！</h1>
      </>
    );
  }
  
  export  function ChooseRoom() {
    const [roomId, setRoomId] = useState('general');
    return (
      <>
        <label>
          选择聊天室：{' '}
          <select
            value={roomId}
            onChange={e => setRoomId(e.target.value)}
          >
            <option value="general">所有</option>
            <option value="travel">旅游</option>
            <option value="music">音乐</option>
          </select>
        </label>
        <hr />
        <ChatRoom roomId={roomId} />
      </>
    );
  }
  //可变值(包括全局变量)React 渲染数据流之外的任何时间发生变化。更改它不会触发组件的重新渲染。因此，即使在依赖项中指定了它，React 也无法知道在其更改时重新同步 Effect。