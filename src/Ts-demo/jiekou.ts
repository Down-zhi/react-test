// 接口的作用在开发中针对的是数据对象和类的结构进行描述和规范化 声明一个类/对象，但是这个类/对象长什么样？他会以接口的格式先定义好，然后你照着这个接口定义好的格式进行编写一个类/对象出来，免得你弄乱结构，以后没法复用代码。
 
// 一般只有在中大型项目，或者框架/大型模块中为了更好的组织代码结构才会出现抽象类/接口
//定义接口   接口不能实现属性方法 天生就是去给别人去继承和使用的
interface PayTool {
    SERVER_URL:string;
    pay:()=>string
}

class Alipay implements PayTool{
    SERVER_URL:string;
    constructor(server_url:string){
        this.SERVER_URL = server_url
    }
    pay(){
        return "ok"
    }
}
 
class WechatPay implements PayTool{
    SERVER_URL:string;
    constructor(server_url:string){
        this.SERVER_URL = server_url;
    }
    pay(){
        return "ok"
    }
}
 
var alipay = new Alipay("http://api.alipay.com");
console.log(alipay);
console.log( alipay.pay() );

// 凡是实现(implements)了接口/抽象类的类, 都要和接口/抽象类保持拥有一样的属性和方法
// typescript允许直通过json对象来直接实现接口,跳过了类的实现过程
 

interface Person {
    username: string;
    age: number;
    desc():string
}
 
function main(person: Person) {
    return "Hello, 我叫" + person.username + "，我今年" + person.age+"岁.";
}
 
// typescript允许直通过对象来直接实现接口,跳过了类的实现过程
// var 对象名 = <接口名称>{
//    属性;
//    方法;
// }
let user2=<Person>{
    username: "小白",
   age: 16,
   desc(){
      return "hello"
   }
}
console.log(main(user2));

//多继承 
interface Person {
    age:number
 }
  
 interface Humen{
    username:string
    desc(user:string):string
 }
  
 // 可以同时实现多个接口
 class People implements Person, Humen{
    age:number;
    username:string;
    constructor(username,age){
       this.age = age;
       this.username=username;
    };
    desc(user:string):string{
       return `${user},您好!我叫${this.username},我今年${this.age}岁.`
    }
 }