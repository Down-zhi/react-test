export type Role = "ordinary" | "admin" | "superadmin"|'boss';
export type Grade = "ordinary" | "paying" | "vip" | "lifelong"|'free';

//什么角色
export const ROLE_TYPE ={
    ordinary: {
        key: "ordinary",
        name: "普通用户",
      },
      admin: {
        key: "admin",
        name: "管理员",
      },
      superadmin: {
        key: "superadmin",
        name: "超级管理员",
      },
      boss:{
        key:'boss',
        name:'Ikun老板'
      }
}

//什么等级 下载限制
export const GRADE_TYPE={
    ordinary: {
        key: "ordinary",
        name: "普通用户",
        pay: 0,
        limit: 10,
      },
      paying: {
        key: "paying",
        name: "付费用户",
        pay: 10,
        limit: 50,
      },
      vip: {
        key: "vip",
        name: "VIP用户",
        pay: 50,
        limit: 300,
      },
      lifelong: {
        key: "lifelong",
        name: "终生用户",
        pay: 0,
        limit: 100000,
      },
      free:{
        key:"free",
        name:'老板不要钱',
        pay:1,
        limit:1
      }
}