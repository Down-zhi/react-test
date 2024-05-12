// 如何使用状态提升在组件之间共享状态?       父组件传状态给子组件
import { useState } from 'react';
function Panel({title,children}){
    const [isActive,setIsActive]=useState(false);
    return(
        <section className="panel">
        <h3>{title}</h3>
        {isActive ? ( <p>{children}</p> ) : (<button onClick={() => setIsActive(true)}> 显示 </button>)}
        </section>
    )
};
function  Accordion(){
    return(
        <>
        <h1>水果</h1>
        <Panel title='苹果'>阿克苏苹果</Panel>
        <hr/>
        <Panel title='香蕉'>顶顶顶顶顶香蕉</Panel>
        </>
    )
}
//如何展开第2个面板应会折叠第1个面板。您该如何做到这一点呢？
// 1. Panel 组件对 isActive 的控制权交给他们的父组件。这意味着，父组件会将 isActive 作为 prop 传给子组件 Panel
//2. 为了实现状态提升，必须定位到你想协调的 两个 子组件最近的公共父组件： Accordion()
function Panel1({ title,children,isActive,onShow}) {
    return (
      <section className="panel">
        <h3>{title}</h3>
        {isActive ? (<p>{children}</p>) : ( <button onClick={onShow}>显示</button>)}
      </section>
    );
  }
export function  Accordion1(){
    const [activeIndex, setActiveIndex] = useState(0); //active是数据判断条件是===，set函数改变状态改变值要用set()传入值
    return(
        <>
        <h1>水果</h1>
        <Panel1 title='苹果' isActive={activeIndex===0} onShow={()=>{setActiveIndex(0)}} >阿克苏苹果</Panel1>
        <hr/>
        <Panel1 title='香蕉' isActive={activeIndex===1} onShow={()=>{setActiveIndex(1)}}>奥德赛香蕉</Panel1>
        </>
    )
}

// 什么是受控组件和非受控组件?
//受控组件是有props驱动，父组件控制状态数据的改变，非受控是有自身的state驱动组件自身可以改变数据值或状态

//题目1 现在有两个独立的输入框。为了让它们保持同步：即编辑一个输入框时，另一个输入框也会更新相同的文本
export  function SyncedInputs() {    
    const [text,settext]=useState('')    
    function handleInputChange(e){
        settext(e.target.value)
    }
    return (
        <> 
       {/* <Input title='第一个输入框'  value={text} onchange={handleInputChange}/>
       <Input  title='第二个输入框'  value={text} onchange={handleInputChange}/> */}
       第一个输入框<input value={text}  onChange={handleInputChange}></input>
       第二个输入框<input value={text}  onChange={handleInputChange} ></input>
        </>
    )
}
// function Input({title,value,onchange}){            //不用写一个子组件
//     return(
//         <>
//        {title} <input  value={value} onChange={onchange} ></input>
//         </>
//     )
// }

//题目二 搜索数据功能(列表过滤)
// 1.使用 filterItems(foods, query) 方法来通过搜索条件过滤列表项
//2.SearchBar 组件是一个搜索框 3.List组件是一个把foods给遍历到ul中的组件
export function FilterableList() {
const[query,setquery]=useState('');
let filters=filterItems(foods, query);
function handlequeryChange(e){
 setquery(e.target.value)
}
return( <>
<SearchBar query={query} onChange={handlequeryChange} />
<List items={filters}/>
</>
)
}

 function filterItems(foods, query) {
    query = query.toLowerCase();
    return foods.filter(item =>             
      item.name.split(' ').some(word =>          
        word.toLowerCase().startsWith(query)   
      )
    );
  }

function SearchBar({query,onChange}){
return (<label>
  搜索<input value={query} onChange={onChange}></input>   
</label>)
}
function List({ items }) {
    return (
      <table>
        <tbody> 
          {items.map(food => (
            <tr key={food.id}>
              <td>{food.name}</td>
              <td>{food.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
const foods = [{
    id: 0,
    name: '寿司',
    description: '寿司是一道传统的日本菜，是用醋米饭做成的'
  }, {
    id: 1,
    name: '木豆',
    description: '制作木豆最常见的方法是在汤中加入洋葱、西红柿和各种香料'
  }, {
    id: 2,
    name: '饺子',
    description: '饺子是用未发酵的面团包裹咸的或甜的馅料，然后在沸水中煮制而成的'
  }, {
    id: 3,
    name: '烤肉串',
    description: '烤肉串是一种很受欢迎的食物，是用肉串和肉块做成。'
  }, {
    id: 4,
    name: '点心',
    description: '点心是广东人的传统喜好，是在餐馆吃早餐和午餐时喜欢吃的一系列小菜'
  }, {
    id: 5,
    name: 'state',
    description: '饺子是用未发酵的面团包裹咸的或甜的馅料，然后在沸水中煮制而成的'
  }];

