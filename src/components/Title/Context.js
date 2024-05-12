// Context 允许父组件向其下层无论多深的任何组件提供信息，而无需通过 props 显式传递
import { createContext } from 'react';
import {useState, useContext } from 'react';

const LevelContext = createContext(1);//1 表示最大的标题级别，但是你可以传递任何类型的值（甚至可以传入一个对象）
 function Heading({ children }) {
    const level = useContext(LevelContext); // useContext 是一个 Hook。和 useState 以及 useReducer一样，
    // 你只能在 React 组件中（不是循环或者条件里）立即调用 Hook。useContext 告诉 React Heading 组件想要读取 LevelContext。
    switch (level) {
      case 1:
        return <h1>{children}</h1>;
      case 2:
        return <h2>{children}</h2>;
      case 3:
        return <h3>{children}</h3>;
      case 4:
        return <h4>{children}</h4>;
      case 5:
        return <h5>{children}</h5>;
      case 6:
        return <h6>{children}</h6>;
      default:
        throw Error('未知的 level：' + level);
    }
  }
//  function Section({ children }) {
//     return (
//       <section className="section">
//         {children}
//       </section>
//     );
//   }
  export function Page() {
    return (
      <Section level={1}>
        <Heading>主标题</Heading>
        <Section level={2}> 
        {/* 原本想要实现必须在每个heading组件上传参level 可以使用创建 一个 context。
在需要数据的组件内 使用 刚刚创建的 context。（Heading 将会使用 LevelContext。）
在指定数据的组件中 提供 这个 context。 （Section 将会提供 LevelContext。） */}
          <Heading>副标题</Heading>        
          <Heading>副标题</Heading>
          <Heading>副标题</Heading>
          <Section level={3}>
            <Heading>子标题</Heading>
            <Heading>子标题</Heading>
            <Heading>子标题</Heading>
            <Section level={4}>
              <Heading>子子标题</Heading>
              <Heading>子子标题</Heading>
              <Heading>子子标题</Heading>
            </Section>
          </Section>
        </Section>
      </Section>
    );
  }
  //所有 headings 的尺寸都一样，因为 即使你正在使用 context，但是你还没有提供它。 React 不知道从哪里获取这个 context！
function Section({ level, children }) {   //修改上面的Section函数把它们用 context provider 包裹起来  以提供 LevelContext 给它们
   const level = useContext(LevelContext); 
  return (
      <section className="section">
        <LevelContext.Provider value={level}>        
          {/* context 让你可以从上层的组件读取信息，每个 Section 都会从上层的 Section 读取 level，并自动向下层传递 level + 1 这样提供context后你不用将 level 参数传给 <Section> 或者是 <Heading>  */}
          {children}
        </LevelContext.Provider>
      </section>
    );
  }
  
// 什么是 “prop 逐级透传”? 父组件的props可以一直传递到最内层的子组件
// 如何使用 context 代替重复的参数传递?
//通过 export const MyContext = createContext(defaultValue) 创建并导出 context。
// 在无论层级多深的任何子组件中，把 context 传递给 useContext(MyContext) Hook 来读取它。
// 在父组件中把 children 包在 <MyContext.Provider value={...}> 中来提供 context。
// Context 的常见用法? 如果多个组件中都需要这个值 或者 获取值和使用值的层级相隔很远,就可以使Context共享数据
//主题：在最顶层放一个context provider并在需要调整其外观的组件中使用该 context。，当前账户：需要看到用户信息
 // Context 的常见替代方案?  用前先看看使用props传递 或者用Jsx作为children传递给它们



 //题目用 context 替代逐层 props   下面代码是用imageSize作为参数一级级向下传递 ，移除 imageSize 参数，并在 App 组件中直接将其传递给 PlaceImage。
 //首先分几步 ：1创建一个context  2.在父组件中提供context把children包在里面 3.在子组件用useContext把context传递并读取它

 const  imageSizeContext=createContext(100) 
export  function App() {
  const [isLarge, setIsLarge] = useState(false);
  const imageSize = isLarge ? 150 : 100;
  return (
    <imageSizeContext.Provider value={imageSize}>
      <label>
        <input
          type="checkbox"
          checked={isLarge}
          onChange={e => {
            setIsLarge(e.target.checked);
          }}
        />
        Use large images
      </label>
      <hr />
      {/* <List imageSize={imageSize} />  不用向下传递imageSize参数了*/}
      <List/>
    </imageSizeContext.Provider>
  )
}

function List() {
  const listItems = places.map(place =>
    <li key={place.id}>
      <Place
        place={place}
        // imageSize={imageSize}
      />
    </li>
  );
  return <ul>{listItems}</ul>;
}

function Place({ place}) {
  return (
    <>
      <PlaceImage
        place={place}
        // imageSize={imageSize}
      />
      <p>
        <b>{place.name}</b>
        {': ' + place.description}
      </p>
    </>
  );
}

function PlaceImage({ place}) {
  const imageSize=useContext(imageSizeContext) //用useContext(ImageSizeContext)读取
  return (
    <img
      src={getImageUrl(place)}
      alt={place.name}
      width={imageSize}
      height={imageSize}
    />
  );
}
