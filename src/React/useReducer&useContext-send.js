import {useReducer, createContext, useContext} from "react";

const GlobalContext = createContext()

const reducer = (state, action)=>{
    const newState = {...state}
    switch (action.type) {
        case "add":
            newState.num = action.val

    }
    return newState
}

const initialState = 100

const init = (initialState)=>{
    return {
        "num": initialState
    }
}

export function AppSend() {
    // const [num, setNum] = useState(100);
    const [state, dispatch] = useReducer(reducer, initialState, init);
    return (
        <div>
            {
                <GlobalContext.Provider value={{
                    state,
                    dispatch,
                }}>
                    <Header></Header>
                    <Footer></Footer>
                </GlobalContext.Provider>
            }
        </div>)
}

function Header(){
    const {state, dispatch} = useContext(GlobalContext)
    return (
        <div>
            <h1>头部组件</h1>
            <button onClick={()=>dispatch({type: "add", val: state.num+1})}>{state.num}</button>
        </div>
    )
}

function Footer(){
    const {state, dispatch} = useContext(GlobalContext)
    return (
        <div>
            <h1>脚部组件</h1>
            <button onClick={()=>dispatch({type: "add", val: state.num+1})}>{state.num}</button>
        </div>
    )
}
