import store from './store';
//store.dispatch() 是 View 发出 Action 的唯一方法，这就需要在View中引入store然后调用dispatch派发Action，dispatch一调用就会调用reducer来改变state从而改变View。
export function Appstore(){
    return (
        <div>
            <p>{store.getState()}</p>
            {/* getState方法可以获取返回当前state的值，可以在任意组件中 */}
            <button onClick={()=>{
                store.dispatch({type: "INCREMENT", val: 10});
            }}>点击自增</button>
            <button onClick={()=>{
                store.dispatch({type: "DECREMENT", val: 10});
            }}>点击自减</button>
        </div>
    )
}