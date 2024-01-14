export function sayHello({firstName,lastName,age}:{
    firstName:string,
    lastName?:string,
    age?:number
}){
    console.log(firstName)
    console.log(lastName)
    console.log(age)
}