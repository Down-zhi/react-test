import { useState, useEffect } from 'react';
import { useSyncExternalStore } from 'react';
import { Dot } from './data';
// 什么是自定义 Hook，以及如何编写?当两个组件的逻辑重复了可以从组件中提取自定义 Hook 
// 比如一个组件在网络连接时显示online 网络断开显示X ，另一个组件在网络连接可以用按钮打印信息而断开按钮被禁用了
function useOnlineStatus() {//共享状态逻辑而不是状态本身
    const [isOnline, setIsOnline] = useState(true);
    useEffect(() => {
      function handleOnline() {
        setIsOnline(true);
      }
      function handleOffline() {
        setIsOnline(false);
      }
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }, []);
    return isOnline;
  }
  function StatusBar() {
    const isOnline = useOnlineStatus();
    return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>;
  }
  
  function SaveButton() {
    const isOnline = useOnlineStatus();
    return (
      <button disabled={!isOnline} onClick={()=>console.log('✅ Progress saved')}>
        {isOnline ? 'Save progress' : 'Reconnecting...'}
      </button>
    );
  }
  
  export function Online() {
    return (
      <>
        <SaveButton />
        <StatusBar />
      </>
    );
  }
  //但这不是最好的解决方案。它有许多边界用例没有考虑到。例如假设当组件加载时，isOnline 已经为 true，但是如果网络已经离线的话这就是错误的。
  function subscribe(callback) {
    window.addEventListener('online', callback);
    window.addEventListener('offline', callback);
    return () => {
      window.removeEventListener('online', callback);
      window.removeEventListener('offline', callback);
    };
  }
  function useOnlineStatus1() {
    return useSyncExternalStore(  //是一个让你订阅外部 store 的 React Hook。接收三个参数
      subscribe,
      () => navigator.onLine, // 如何在客户端获取值
      () => true              // 如何在服务端获取值
    );
  }
  //subscribe：定义的函数，用于订阅网络状态变化。getState：一个无参数的函数，用于在客户端获取当前的网络状态。这里使用navigator.onLine来判断浏览器是否在线。getServerSnapshot：一个无参数的函数，用于在服务器端获取状态的快照。
// 如何在组件间重用逻辑?
// 如何给自定义 Hook 命名以及如何构建?以use开头use后的首字母大写
function useChatRoom(){}
export default function ChatRoom({ roomId }) {
    const [serverUrl, setServerUrl] = useState('https://localhost:1234');
  
    useChatRoom({          //自己定义的Hook，如何接收响应值和事件
      roomId: roomId, 
      serverUrl: serverUrl,
    //   onReceiveMessage(msg) {
    //     showNotification('New message: ' + msg);
    //   }
    });
}
// 提取自定义 Hook 的时机和原因?
//题目1  自定义Hook使用了一个 state 变量和一个 Effect 来展示每秒递增的一个数字。
function useCounter(){
const [count,setCount]=useState(0);

useEffect(()=>{
    const id=setInterval(()=>{
        setCount(t=>t+1);
    },1000)
    return ()=>clearInterval(id)
},[])
return count;
}
export function  Interval(){
    const Counter=useCounter();
    return( <h1>Pass: {Counter} </h1>)
}

//题目2 让计时器的 delay 变为可配置项 ,Hook接收可改变的参数delay
function useDelay(delay){
    const [count, setCount] = useState(0);
    useEffect(() => {
      const id = setInterval(() => {
        setCount(c => c + 1);
      }, delay);
      return () => clearInterval(id);
    }, [delay]);
    return count;
  }
  export  function DelayCounter() {
    const [delay, setDelay] = useState(1000);
    const count = useDelay(delay);
    return (
      <>
        <label>
          Tick duration: {delay} ms
          <br />
          <input
            type="range" value={delay}  min="10"   max="2000"
            onChange={e => setDelay(Number(e.target.value))}
          />
        </label>
        <hr />
        <h1>Times pass: {count}</h1>
      </>
    );
  }

  //题目3 5个⚪点的交错运动
  function usePointerPosition() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    useEffect(() => {
      function handleMove(e) {
        setPosition({ x: e.clientX, y: e.clientY });
      }
      window.addEventListener('pointermove', handleMove);
      return () => window.removeEventListener('pointermove', handleMove);
    }, []);
    return position;
  }

function useDelayedValue(value, delay) {                 //接收原点的位置和设置延迟时间后的移动到鼠标位置
    const [delayedValue, setDelayedValue] = useState(value);
    useEffect(() => {
      setTimeout(() => {
        setDelayedValue(value);       //当 value 更新时，Effect会安排一个timeout来更新 delayedValue
      }, delay);
    }, [value, delay]); 
    return delayedValue;
  }

  export function Pointer(){
        const pos1 = usePointerPosition();
        const pos2 = useDelayedValue(pos1, 100);
        const pos3 = useDelayedValue(pos2, 100);
        const pos4 = useDelayedValue(pos3, 100);
        const pos5 = useDelayedValue(pos4, 100);      
        return (
          <>
            <Dot position={pos1} opacity={1} />
            <Dot position={pos2} opacity={0.8} />
            <Dot position={pos3} opacity={0.6} />
            <Dot position={pos4} opacity={0.4} />
            <Dot position={pos5} opacity={1} />
          </>
        );
      
  }