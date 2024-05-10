// 如何正确地更新 React state 中的对象?
import { useState } from 'react';
import { Background,Box } from './data';
export  function MovingDot() {
  const [position, setPosition] = useState({ x: 0,  y: 0 });
  return (
    <div
      onPointerMove={e => {
      setPosition ({x :e.clientX,y:e.clientY})  //让跟随鼠标移动
              //   position.x = e.clientX;
              //   position.y = e.clientY; 这样是有问题的改变了state中现有的对象
              // 可以修改一个你创建的对象 比如const nextPosition = {};
              //  nextPosition.x = e.clientX;
              // nextPosition.y = e.clientY;            等同于{x :e.clientX,y:e.clientY}
              // setPosition(nextPosition);

      }}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}>
      <div style={{
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: '50%',
        transform: `translate(${position.x}px, ${position.y}px)`,
        left: -10,
        top: -10,
        width: 20,  //初始位置
        height: 20,
      }} />
    </div>
  );
}
//又是一个修改了state对象的例子
export  function Form1() {
    const [person, setPerson] = useState({
      firstName: 'Barbara',
      lastName: 'Hepworth',
      email: 'bhepworth@sculpture.com'
    });
    function handleFirstNameChange(e) {
        // person.firstName = e.target.value;    又是直接改变了state
        setPerson({  ...person, firstName : e.target.value})
      }
    
      function handleLastNameChange(e) {
        // person.lastName = e.target.value;
        setPerson({  ...person, lastName : e.target.value})
      }
    
      function handleEmailChange(e) {
        // person.email = e.target.value;
        setPerson({  ...person, email : e.target.value})
      }
      //上面三个函数也可以使用下面这一个
      function handleChange(e) {
        setPerson({
          ...person,
          [e.target.name]: e.target.value
        });
      }
      
return(
    <>
    <label>FirstName</label>
    <input value={person.firstName} onChange={handleFirstNameChange}>
    </input>
    <label> Last name:
     <input value={person.lastName} onChange={handleLastNameChange} />
      </label>
    <label> Email:<input value={person.email}onChange={handleEmailChange} />
      </label>
      <p>
        {person.firstName} {person.lastName} ({person.email})
      </p>
    </>
)

}
// 如何在不产生 mutation 的情况下更新一个嵌套对象?
function  A(){
    const [person, setPerson] = useState({
        name: 'Niki de Saint Phalle',
        artwork: {
          title: 'Blue Nana',
          city: 'Hamburg',
          image: 'https://i.imgur.com/Sd1AgUOm.jpg',
        }
        
      } ,
        //想改变artwork的值用 mutation 来实现的方法非常容易理解：person.artwork.city = 'New Delhi';
        //但是在React中你需要将state视为不可变的！为了修改 city 的值，你首先需要创建一个新的 artwork 对象（其中预先填充了上一个 artwork 对象中的数据），然后创建一个新的 person 对象，并使得其中的 artwork 属性指向新创建的 artwork 对象：
        setPerson({ ...person,              // 复制其它字段的数据 
            artwork: {                 // 替换 artwork 字段 
                ...person.artwork,       // 复制之前 person.artwork 中的数据
                city: 'New Delhi'       // 但是将 city 的值替换为 New Delhi！
            }
        }));
}


// 什么是不可变性（immutability），以及如何不破坏它?
// 如何使用 Immer 使复制对象不那么繁琐? Immer是一个非常流行的库,它可以让你使用简便但可以直接修改的语法编写代码,并会帮你处理好复制的过程
function HandleCityChange(e) {
    const [person, setPerson] = useState({name:'Nihao'})
    setPerson(draft => {
      draft.artwork.city = e.target.value;         //看起来就像是你“打破了规则”而直接修改了对象,但immer都已经处理好了
    });
  }

//   练习题1
// 这个表单有几个 bug。试着点击几次增加分数的按钮。你会注意到分数并没有增加。然后试着编辑一下名字字段，你会注意到分数突然“响应”了你之前的修改。最后，试着编辑一下姓氏字段，你会发现分数完全消失了。
// 你的任务就是修复所有的这些 bug。在你修复它们的同时，解释一下它们为什么会产生。
export function Scoreboard() {
    const [player, setPlayer] = useState({
      firstName: 'Ranjani',
      lastName: 'Shettar',
      score: 10,
    });
  
    function handlePlusClick() { //直接修改了 player 对象。这就造成了 React 并不知道需要重新渲染的原因，也就没有更新屏幕上分数的值。这就是为什么，当你修改名字字段的时候，state 发生了更新，state 更新触发了重新渲染
    //   player.score++;   修改
    setPlayer({
        ...player,
        score:player.score+1
    })
    }
    function handleFirstNameChange(e) {
      setPlayer({
        ...player,
        firstName: e.target.value,
      });
    }
  
    function handleLastNameChange(e) {
      setPlayer({
        ...player,
        lastName: e.target.value
      });
    }
  
    return (
      <>
        <label> Score: <b>{player.score}</b>
          <button onClick={handlePlusClick}>  +1</button>
        </label><br/>
        <label>  First name:
          <input
            value={player.firstName}
            onChange={handleFirstNameChange}
          />
        </label><br/>
        <label>
          Last name:
          <input
            value={player.lastName}
            onChange={handleLastNameChange}
          />
        </label>
      </>
    );
  }
  //练习题2 
//   当你先移动了方形，再去修改它的颜色时，背景会突然“跳”到方形所在的位置 引用了data里的box和background组件
const initialPosition = {
    x: 0,
    y: 0
  };
//
  export function Canvas() {
    const [shape, setShape] = useState({   //state保存默认位置和默认颜色
      color: 'orange',
      position: initialPosition
    });
  
    function handleMove(dx, dy) {             //移动
    //   shape.position.x += dx;
    //   shape.position.y += dy;
    setShape({                 
        ...shape,
        position: {               //:
          x: shape.position.x + dx,
          y: shape.position.y + dy,
        }
      });
    }
  //immer方法
//   function handleMove(dx, dy) {
//     setShape(draft => {
//       draft.position.x += dx;
//       draft.position.y += dy;
//     });
//   }
    function handleColorChange(e) {    //改变颜色要重新渲染
      setShape({
        ...shape,
        color: e.target.value
      });
    }
    return (
      <>
        <select
          value={shape.color}
          onChange={handleColorChange}
        >
          <option value="orange">orange</option>
          <option value="lightpink">lightpink</option>
          <option value="aliceblue">aliceblue</option>
          <option value="red">red</option>
        </select>
        <Background
          position={initialPosition}
        />
        <Box
          color={shape.color}
          position={shape.position}  //box组件接收四个参数color,position,onmove,chlidren
          onMove={handleMove}
        >
          Drag me!
        </Box>
      </>
    );
  }

  
  