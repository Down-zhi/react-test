import { recipes,poem } from './data.js';
import { Fragment } from 'react';

// 如何通过 JavaScript 的 map() 方法从数组中生成组件
const peoples = [
    '凯瑟琳·约翰逊: 数学家',
    '马里奥·莫利纳: 化学家',
    '穆罕默德·阿卜杜勒·萨拉姆: 物理学家',
    '珀西·莱温·朱利亚: 化学家',
    '苏布拉马尼扬·钱德拉塞卡: 天体物理学家',
  ];

  export function List(){
    const listItems = peoples.map(person =>
        <li>{person}</li>
      );
    return <ul>{listItems}</ul>
  }
// 如何通过 JavaScript 的 filter() 筛选需要渲染的组件
const people = [
    {
      id: 0,
      name: '凯瑟琳·约翰逊',
      profession: '数学家',
    },
    {
      id: 1,
      name: '马里奥·莫利纳',
      profession: '化学家',
    },
    {
      id: 2,
      name: '穆罕默德·阿卜杜勒·萨拉姆',
      profession: '物理学家',
    },
    {
      name: '珀西·莱温·朱利亚',
      profession: '化学家',
    },
    {
      name: '苏布拉马尼扬·钱德拉塞卡',
      profession: '天体物理学家',
    },
  ];


export function Chemists(){
    const chemists = people.filter(person =>
        person.profession === '化学家'
      );
       const everyoneElse = people.filter(person =>
    person.profession !== '化学家')
      //这些 key 会告诉 React，每个组件对应着数组里的哪一项，所以 React 可以把它们匹配起来。这在数组项进行移动（例如排序）
      //插入或删除等操作时非常重要。一个合适的 key 可以帮助 React 推断发生了什么，从而得以正确地更新 DOM 树。
      const listItems=chemists.map(people=>{   //因为箭头函数会隐式地返回位于 => 之后的表达式，所以你可以省略 return 语句。
      return  <li>key={people.id},{people.name}</li>      //如果你的 => 后面跟了一对花括号 { ，那你必须使用 return 来指定返回值！
      })
      // return <ul>{listItems}</ul>;

      return (
        <><h1>科学家</h1>
        <h1>化学家</h1>
        <ul>
          {chemists.map(person=>
          //如果有{}必须要有return
            <li key={person.id}> <b>{person.name}:</b></li>
          )}
        </ul>
        <h1>其他科学家</h1>
        <ul>
          {everyoneElse.map(person=>
             <li key={person.id}> <b>{person.name}:</b></li>
          )}
        </ul>
        </>
        )
}      

//两次map
// export function RecipeList(){
//   return(
//     <div>
//     <h1>菜谱</h1>
//     {recipes.map(recipe=>{                 //如果你的 => 后面跟了一对花括号 {} ，那你必须使用 return 来指定返回值！
//    return   <div key={recipe.id}>
//              <h2>{recipe.name}</h2>
//       <ul>
//       {recipe.ingredients.map(ingredient=>
//          <li key={ingredient}>{ingredient}</li>
//       )}
//       </ul>
//       </div>
//     })}
//     </div>
//   )
// }
//把菜谱封装一个组件
function Recipe({id,name,ingredients}){      //对象要用{}
  return(
    <div>
    <h2>{name}</h2>  
    <ul>{ingredients.map(ingredient=>
     <li  key={ingredient}>{ingredient}</li>   )}</ul>
    </div>
  )
}
export function RecipeList(){
  return( 
    <div>
      <h1>菜谱</h1>
      {recipes.map(recipe=>
       <Recipe {...recipe} key={recipe.id} />  )}
    </div>
  )
}
/* <Recipe {...recipe} key={recipe.id} /> 是一种简写方式，它表示“把 recipe 对象里的每个属性都作为 props 传给 Recipe 组件”。
这和直接写明每一个 prop 是等价的：<Recipe id={recipe.id} name={recipe.name} ingredients={recipe.ingredients} key={recipe.id} />。 */

export function Poem(){
  return(  
  <article>
    {poem.lines.map((line, i) =>
      <Fragment key={i}>
        {i > 0 && <hr />}  
        {/* //有几行，每行前面都有一个hr        */}
        <p>{line}</p>
      </Fragment>
    )}
  </article>
  )
}

// 何时以及为何使用 React 中的 key
//它使 React 能追踪这些组件，即便后者的位置或数据发生了变化。