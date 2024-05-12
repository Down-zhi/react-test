import { useReducer } from "react";
//练习题目    使用reducer函数重写聊天组件 1一个聊天框组件Chat 一个文本框和一个按钮发送信息 2一个选择跟谁聊天 3一个主函数
  function Chat({contact, message, dispatch}) {
    return (
      <section className="chat">
        <textarea
          value={message}
          placeholder={'和 ' + contact.name + ' 聊天'}
          onChange={(e) => {
            dispatch({
              type: 'edited_message',
              message: e.target.value,
            });
          }}
        />
        <br />
        <button
          onClick={() => {
            alert(`正在发送 "${message}" 到 ${contact.email}`);
            dispatch({
              type: 'sent_message',
            });
          }}>
          发送到 {contact.email}
        </button>
      </section>
    );
  }
  
 function ContactList({contacts, selectedId, dispatch}) {
    return (
      <section className="contact-list">
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>
              <button
                onClick={() => {
                  dispatch({
                    type: 'changed_selection',
                    contactId: contact.id,
                  });
                }}>
                {selectedId === contact.id ? <b>{contact.name}</b> : contact.name}
              </button>
            </li>
          ))}
        </ul>
      </section>
    );
  }
  const initialState = {
    selectedId: 0,
    messages: {
      0: 'Hello, Taylor',
      1: 'Hello, Alice',
      2: 'Hello, Bob',
    },
  };
  function messengerReducer(state, action) {
    switch (action.type) {
      case 'changed_selection': {
        return {
          ...state,
          selectedId: action.contactId,
        };
      }
      case 'edited_message': {
        return {
          ...state,
          messages: {
            ...state.messages,
            [state.selectedId]: action.message,
          },
        };
      }
      case 'sent_message': {
        return {
          ...state,
          messages: {
            ...state.messages,
            [state.selectedId]: '',
          },
        };
      }
      default: {
        throw Error('未知 action：' + action.type);
      }
    }
  }
  export function Messenger() {
    const [state, dispatch] = useReducer(messengerReducer, initialState);
    const message = state.messages[state.selectedId];
    const contact = contacts.find((c) => c.id === state.selectedId);
    return (
      <div>
        <ContactList
          contacts={contacts}
          selectedId={state.selectedId}
          dispatch={dispatch}
        />
        <Chat
          key={contact.id}
          message={message}
          contact={contact}
          dispatch={dispatch}
        />
      </div>
    );
  }
  
  const contacts = [
    {id: 0, name: 'Taylor', email: 'taylor@mail.com'},
    {id: 1, name: 'Alice', email: 'alice@mail.com'},
    {id: 2, name: 'Bob', email: 'bob@mail.com'},
  ];
  //useReducer接受 2 个参数：一个 reducer 函数 ,一个初始的 state 
  //reducer 接收一个当前的state 和一个action对象 返回的是更新后的 state 
  //dispatch 一个 action 去调用一个具有当前 state 和 action 的 reducer，并将结果存储为下一个 state。