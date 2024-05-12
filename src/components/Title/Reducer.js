import { useReducer } from 'react';
import { useImmerReducer } from 'use-immer';
// 什么是 reducer 函数
// Reducer 是处理状态的另一种方式。你可以通过三个步骤将 useState 迁移到 useReducer：
function handleAddTask(text) {  // 在用户点击 “添加” 时被调用。
    setTasks([
      ...tasks,
      {
        id: nextId++,
        text: text,
        done: false,
      },
    ]);
  }
  
  function handleChangeTask(task) {   //修改时调用
    setTasks(
      tasks.map((t) => {
        if (t.id === task.id) {
          return task;
        } else {
          return t;
        }
      })
    );
  }
  
  function handleDeleteTask(taskId) {        //删除时调用
    setTasks(tasks.filter((t) => t.id !== taskId));
  }
// 1. 将设置状态的逻辑修改成dispatch的一个 action；  怎么做？
//---------目前函数是通过set状态来实现逻辑。而Reducer不是通过设置状态来告诉 React “要做什么”，而是通过事件处理程序 dispatch 一个 “action” 来指明 “用户刚刚做了什么”。
// （而状态更新逻辑则保存在其他地方！）因此，我们不再通过事件处理器直接 “设置 task”，而是 dispatch 一个 “添加/修改/删除任务” 的 action。这更加符合用户的思维。
  // function 6handleAddTask(text) {
  //   dispatch(
  //       {
  //     type: 'added', // 一个字符串类型的 type 字段来描述发生了什么，并通过其它字段传递额外的信息
  //     id: nextId++,
  //     text: text,
  //   }
  //   // {}内的就是传给dispatch的对象叫action ，至少包含可以表明 发生了什么事情 的信息。
  //   );
  // }
  
  // function handleChangeTask(task) {
  //   dispatch({
  //     type: 'changed',
  //     task: task,
  //   });
  // }
  
  // function handleDeleteTask(taskId) {
  //   dispatch({
  //     type: 'deleted',
  //     id: taskId,
  //   });
  // }
// 2. 编写 一个 reducer 函数；
// reducer 函数就是你放置状态逻辑的地方。它接受两个参数，分别为当前 state 和 action 对象，并且返回的是更新后的 state 声明当前状态（tasks）作为第一个参数；
//将逻辑迁移至 reducer 函数中 需要（1）声明当前状态（tasks）作为第一个参数
// （2）声明 action 对象作为第二个参数；
// （3）从 reducer 返回 下一个 状态（React 会将旧的状态设置为这个最新的状态）。
function tasksReducer(tasks, action) {   //使用switch语句更简洁 switch(action.type){ case 'added':{}} 
    if (action.type === 'added') {
      return [
        ...tasks,
        {
          id: action.id,        //在reducer 函数中可以看到dispatch的action对象有哪些，带action.xxx肯定是在action对象中定义过的。
          text: action.text,
          done: false,
        },
      ];
    //   对应的dispatch应该是
    // dispatch({
    //     type:'added'，
    //     id:nextid++，
    //     text:接收参数的text
    // })
    } else if (action.type === 'changed') {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    } else if (action.type === 'deleted') {
      return tasks.filter((t) => t.id !== action.id);
    } else {
      throw Error('未知 action: ' + action.type);
    }
  }
  // immer版
//     const [tasks, dispatch] = useImmerReducer(tasksReducer, initialTasks);
  function tasksReducerimmer(draft, action) {
    switch (action.type) {
      case 'added': {
        draft.push({
          id: action.id,
          text: action.text,
          done: false,
        });
        break;
      }
      case 'changed': {
        const index = draft.findIndex((t) => t.id === action.task.id);
        draft[index] = action.task;
        break;
      }
      case 'deleted': {
        return draft.filter((t) => t.id !== action.id);
      }
      default: {
        throw Error('未知 action：' + action.type);
      }
    }
  }
 
// 3. 在你的组件中 使用 reducer。


// 如何将 useState 重构成 useReducer？
// useReducer接受 2 个参数：一个 reducer 函数 ,一个初始的 state 
// 返回 一个有状态的值一个 dispatch 函数（用来 “派发” 用户操作给 reducer）
const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

// 什么时候使用 reducer？
// 当多个事件处理程序以相似的方式修改 state 时，useReducer 可以减少代码量。
// 逻辑变得复杂起来，它们会使组件变得臃肿且难以阅读。在这种情况下，useReducer 允许你将状态更新逻辑与事件处理程序分离开来。
// 可调式性更好

