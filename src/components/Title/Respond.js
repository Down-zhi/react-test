// 编写事件处理函数的不同方法？
export function Button(){
    function handleClick(){
        console.log('点击按钮了');
    }
    return(
        <button onClick={handleClick}>按钮1</button> //<button onClick={handleClick}>正确的传递函数不用加（）
    )
}
export function Button2(){
    return(
        <button onClick={
            function handleClick(){
                console.log('点击第二个按钮了');
            }}>按钮2</button>
    // 或者用箭头函数 <button onClick={() => {
    //             alert('你点击了我！');
    //           }}>
    )
}
// 如何从父组件传递事件处理逻辑？
// 在事件处理函数中读取 props 
function AlertButton({ message, children })  {  //接收两个参数一个是弹窗的信息，一个是按钮的信息
return( <button onClick={()=>{alert(message)}}>{children}</button>)
}
export function Toolbar(){
    return(
        <div>
            <AlertButton message={'正在播放'}>
            播放电影
            </AlertButton>
            <AlertButton message={'正在上传'}>

            上传图片
            </AlertButton>
        </div>
    )
}
//将事件处理函数作为 props 传递 
// 1.Toolbar1 组件渲染了一个 PlayButton 组件和 UploadButton 组件：
// 2.PlayButton 将 handlePlayClick 作为 onClick prop 传入 Button 组件内部。
// UploadButton 将 () => alert('正在上传！') 作为 onClick prop 传入 Button 组件内部。
// Button3 组件接收一个名为 onClick 的 prop。它直接将这个 prop 以 onClick={onClick} 方式传递给浏览器内置的 <button>。当点击按钮时，React 会调用传入的函数。
export function Toolbar1(){
    return(
        <div>
        <PlayButton movieName='权'/>
        <UploadButton/>
        </div>
    )
}
function PlayButton({movieName}){    //要用{}接收参数
    return(
        <Button3 onClick={()=>alert(`正在播放 ${movieName}！`)}>播放{movieName}</Button3>
    )
}
function UploadButton(){
    return(
        <Button3 onClick={()=> alert('正在上传！')}>上传</Button3>
    )
}
function Button3({ onClick, children }) {
    return (
      <button onClick={onClick}>
        {children}
      </button>
    );
  }
  // 事件如何传播以及如何停止它们
 <div className="Toolbar" onClick={() => {
      alert('你点击了 toolbar ！');
    }}>
      <button onClick={() => alert('正在播放！')}>
        播放电影
      </button>
      <button onClick={() => alert('正在上传！')}>
        上传图片
      </button>
    </div>
//事件从发生的地方开始，然后沿着树向上传播。
//点击按钮时先触发自身事件后触发div的事件  阻止传播用e.stopPropagation()阻止触发绑定在外层标签上的事件处理函数 ：
export  function LightSwitch() {
    function handleClick() {
     
    //   if (bodyStyle.backgroundColor === 'black') {
    //     bodyStyle.backgroundColor = 'white';
    //   } else {
    //     bodyStyle.backgroundColor = 'black';
    //   }
    let bodyStyle = document.body.style;
    let color= bodyStyle.backgroundColor
    bodyStyle.backgroundColor=  color ==='black'?'white':'black'

    }
    return (
      <button onClick={handleClick}>
        切换背景
      </button>
    );
    
  }

  