import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/Ul/App';
import Title from './components/Title';
import { List ,Chemists,RecipeList,Poem} from './components/Title/List rendering';
import { Buy ,TeaSet,Clock } from './components/Title/module';
// import ParentComponent from './components/Title';//导入Title里index.js的函数
import ParentComponent from './components/Title/data';
import './components/Ul/styles.css';
import { Button,Button2 ,Toolbar,Toolbar1,LightSwitch} from './components/Title/Respond';
import Form, { Gallery ,FeedbackForm,Greet} from './components/Title/State';
import Ip ,{Counter,Count}from'./components/Title/Reand&sub'
import { MovingDot,Form1,Scoreboard,Canvas } from './components/Title/update-obj';
import { AddList,CountList } from './components/Title/update-arr';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Title/>
    <List/>
    <Chemists/>
    <RecipeList/>
    <Poem/> */}
    {/* <Button/>
    <Button2/>
  <Toolbar/>
  <Toolbar1/>
  <LightSwitch/>   */}
  <div className="Page">
      <Gallery />
      <br/>
      <Gallery />
    </div>
    <Form/><FeedbackForm/><Greet/><ParentComponent/><Ip/><Counter/>
  </React.StrictMode>
);

const children=ReactDOM.createRoot(document.getElementById('children'));
children.render(
  <React.StrictMode>
    {/* <Buy/><TeaSet/> <ParentComponent/> */}
    {/* <App/> */}<Count/>
    <MovingDot/><Form1/><Scoreboard/>
    {/* <Canvas/> */}
    <br/>
    <AddList/><CountList/>
     </React.StrictMode>
)
