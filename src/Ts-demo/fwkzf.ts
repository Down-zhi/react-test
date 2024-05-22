// TypeScript 中，可以使用访问控制符来保护对类、变量、方法和构造方法的访问。TypeScript 支持 3 种不同的访问权限。
 
// public（默认）: 公有的，可以在任何地方被访问。
// protected: 受保护，可以被其自身以及其子类和父类访问。
// private : 私有，只能被其定义所在的类访问。
// 公有属性: 允许任何一个地方调用
// 私有属性: 仅允许当前类内部进行调用
// 保护属性: 仅允许当前类或直接间接继承了当前类的子类内部进行调用
class Proto{
   public desc(){                   // 公有方法
      return `我住在树上`;
   }
}
 
class Humen extends Proto{
   public address:string = "北京市"; // 公有属性
   public desc(){                   // 公有方法
      return `我住在${this.address}`;
   }
 
   private money:number = 10000;    // 私有属性
   private calc_money(){
      return this.money*0.1;  // 类的内部才可以调用私有属性,私有方法
   }
   // 如果允许私有属性提供给外界查看, 往往通过公有方法来进行暴露
   public show_money(){
      return this.calc_money();
   }
 
   protected phone:string = "13300000000";  // 保护属性
   protected get_phone(){                   // 保护方法
      return `我的手机号码:${this.phone}`; // 类的内部或者子类才可以调用保护属性/方法
   }
   // 如果允许保护属性提供给外界查看,往往通过公有方法来进行暴露
   public show_phone(key?){
      if(key == "123456"){
         return this.get_phone();
      }
   }
}
 
class People extends Humen{
   public show_father_data(){
      // return this.phone;    // 调用了父类的保护属性
      // return this.get_phone(); // 调用了父类的保护方法
 
      return this.show_money();       // 子类无法调用父类的私有属性或方法
 
      // return this.desc();  // 调用继承到的父类方法或者属性,如果当前类重载了则出现覆盖
      // return super.desc();
   }
 
   public desc(){
      return `您好, 我住在${this.address}`;
   }
 
}
 
var xiaoming = new People();
// console.log(xiaoming.phone); // 类的外部无法调用私有或受保护的属性
// console.log(xiaoming.address);
// console.log(xiaoming.desc());
// console.log(xiaoming.show_money());
// console.log(xiaoming.show_phone());
// console.log(xiaoming.show_phone(123456));
// console.log(xiaoming.show_father_data());