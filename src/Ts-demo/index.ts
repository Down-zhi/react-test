//js一切的语法在ts中都是可以使用的
//类型注解 在声明变量，函数参数
function main(person:string){
  return "Hello"+person;
}

var user:string='Kariy  Owen';
// var user:number[]=[1,2,3]; 声明数组 元素类型后加[]

enum Color{ //枚举
    red=0,
    blue=1,
    pink=3

}
let c:Color=Color.pink

document.body.textContent=main(user);