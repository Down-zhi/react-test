import { createContext } from "react";
// 为了将它们从组件树往下传，你将 创建 两个不同的 context：
// TasksContext 提供当前的 tasks 列表。
// TasksDispatchContext 提供了一个函数可以让组件分发动作
export const TasksContext = createContext(null);          //这里把null 作为默认值传递给两个context。实际值是由主组件TaskApp 组件提供的。
export const TasksDispatchContext = createContext(null);