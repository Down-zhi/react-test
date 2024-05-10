// 如何添加、删除或者修改 React state 中的数组中的元素?
import { useState } from 'react';
let nextId = 0;
export function AddList(){
    const [name,setName]=useState('请添加');
    const [artists, setArtists]=useState([]);
return(
    <>
    <h1>请输入</h1>
    <input value={name} onChange={e=>setName(e.target.value)}></input>  
    {/* onChange 有变化就要set函数来重新渲染 */}
   <button onClick={()=>{
setArtists([ ...artists,  //之前元素不变只渲染新元素，将{id:nextId, name:name}放在前面添加的元素就添加在前面
    {id:nextId++, name:name}]); //是数组就用【】而不是{},里面又有对象
    setName(''); }} disabled={name.trim() === ''}>提交</button>
        <ul>
            {artists.map(artist => (
                // 对于每项，添加一个删除按钮并绑定删除函数
                <li key={artist.id}>
                    {artist.name}
                    <button onClick={() => {
                        setArtists(
                            artists.filter(a =>
                                a.id !== artist.id
                            )
                        );
                    }}>  删除
                    </button>
                </li>
            ))}
        </ul>
    </>
)

}
//如果你想改变数组中的某些或全部元素，你可以用 map() 创建一个新数组。你传入 map 的函数决定了要根据每个元素的值或索引（或二者都要）对元素做何处理。

let initialCounters = [
    0, 0, 0
  ];
export function CountList(){
    const[counters, setCounters] = useState( initialCounters );
    function handleIncrementClick(index){
        const nextcounter=counters.map((num,i)=>{
            if(i===index){
                return num+1;
            }else{
                
            }
        })
        setCounters(nextcounter)
    }

    return( 
        <>
        <ul>
            {counters.map((counter,i) =>{
                <li key={i}>{counter} <button onClick={handleIncrementClick}>+1</button></li>
            })}
        </ul>
        </>
    )
}  
// 如何更新数组内部的对象?



// 如何通过 Immer 降低数组拷贝的重复度?