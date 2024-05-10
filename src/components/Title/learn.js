// import React from "react";
// import { useState  } from "react";
// ////渲染逻辑和标签共同存在于同一个地方——组件。
// // JSX 执行更快，因为它在编译为 JavaScript 代码后进行了优化。
// // 它是类型安全的，在编译过程中就能发现错误。
// // 使用 JSX 编写模板更加简单快速。
// // function Clock({ date }) {
// //     return (
// //       <div>
// //         <h1>Hello, world!</h1>
// //         <h2>现在是 {date.toLocaleTimeString()}.</h2>
// //       </div>
// //     );
// //   }
  
// //  export default function Tick() {
// //     const [now, setNow] = useState(new Date());
// //     useEffect(() => {
// //       const intervalId = setInterval(() => {
// //         setNow(new Date());
// //       }, 1000); // 更新间隔设为1秒，原代码中的1毫秒可能过于频繁
  
// //       // 清理函数：当组件卸载时清除定时器
// //       return () => clearInterval(intervalId);
// //     }, []); // 空依赖数组意味着这个effect只会在组件挂载时执行一次
  
// //     return <Clock date={now} />;
// //   }

// //从下面的代码中提取一个 Card 组件，并使用 children prop 将不同的 JSX 传递给它：
// // export default function Profile() {
// //   return (
// //     <div>
// //       <div className="card">
// //         <div className="card-content">
// //           <h1>Photo</h1>
// //           <img
// //             className="avatar"
// //             src="https://i.imgur.com/OKS67lhm.jpg"
// //             alt="Aklilu Lemma"
// //             width={70}
// //             height={70}
// //           />
// //         </div>
// //       </div>
// //       <div className="card">
// //         <div className="card-content">
// //           <h1>About</h1>
// //           <p>Aklilu Lemma was a distinguished Ethiopian scientist who discovered a natural treatment to schistosomiasis.</p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// //这是你可以在两个地方使用 Card 组件的方法：
// function Card( {children}){
//     return (
//       <div className="card">
//         <div className="card-content">
//           {children}
//         </div>
//       </div>
//     );
//   }
//    function Profile() {
//   return(  
//     <div>
//       <Card>
//         <h1>Photo</h1>
//       <img
//               className="avatar"
//               src="https://i.imgur.com/OKS67lhm.jpg"
//               alt="Aklilu Lemma"
//               width={70}
//               height={70}
//             />
//             </Card>
//             <Card>
//               <h1>About</h1>
//           <p>Aklilu Lemma was a distinguished Ethiopian scientist who discovered a natural treatment to schistosomiasis.</p>
//           </Card>
              
//       </div>
//   )
  
//   }
// //   let content;
// //   if (isLoggedIn) {
// //     content = <AdminPanel />;
// //   } else {
// //     content = <LoginForm />;
// //   }
// //   return (
// //     <div>
// //       {content}
// //     </div>
// //   );
//   //更为紧凑的代码可以可以使用条件?运算符。与if不同的是它工作于JSX内部
// //   <div>
// //     {isLoggedIn ? (
// //       <AdminPanel />
// //     ) : (
// //       <LoginForm />
// //     )}
// //   </div>
//   //   当你不需要 else 分支时，你还可以使用 逻辑 && 语法：
//   //   <div>
//   //     {isLoggedIn && <AdminPanel />}
//   //   </div>
  
//   // onClick={handleClick} 的结尾没有小括号！不要 调用 事件处理函数：
//   // 你只需 把函数传递给事件 即可。当用户点击按钮时 React 会调用你传递的事件处理函数。
// /*   function MyButton() {
//       function handleClick() {
//         alert('You clicked me!');
//       }
    
//       return (
//         <button onClick={handleClick}>
//           Click me
//         </button>
//       );
//     }
//  */