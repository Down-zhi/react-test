//1. 纯函数是什么，以及它如何帮助你避免 bug ?
// 只负责自己的任务。它不会更改在该函数调用前就已存在的对象或变量。
// 输入相同，则输出相同。给定相同的输入，纯函数应总是返回相同的结果。
function double(number) {
    return 2 * number;
  }

  function Recipe({price}){
return(
    <li>water{price} $ one cup</li>
)
  }
export function Buy(){
    return( 
        <Recipe  price={2}/>
    )
}

// 如何将数据变更与渲染过程分离，以保持组件的纯粹?
//组件应该只 返回 它们的 JSX，而不 改变 在渲染前，就已存在的任何对象或变量 — 这将会使它们变得不纯粹！
let guest = 0;
function Cup() {
// Bad: changing a preexisting variable! 该组件正在读写其外部声明的 guest 变量。
//这意味着 多次调用这个组件会产生不同的 JSX！并且，如果 其他 组件读取 guest ，它们也会产生不同的 JSX
  guest = guest + 1;
  return <h2>Tea cup for guest #{guest}</h2>;
}
export  function TeaSet() {
  return (
    <>
      <Cup />
      <Cup />
      <Cup />
    </>
  );
}
//解决把guest作为props传入Cup


export  function Clock({ time }) {
    let hours = time.getHours();
    let className;
    let isNight = hours >= 0 && hours <= 6
    let color=isNight ? 'red':'blue'
    // if (hours >= 0 && hours <= 6) {
    //   className = 'night';
    // } else {
    //   className = 'day';
    // }
    return (
      <h1 style={{color}} className={className}>
        {time.toLocaleTimeString()}
      </h1>
    );
  }

// 如何使用严格模式发现组件中的错误