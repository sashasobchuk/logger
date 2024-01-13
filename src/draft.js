


let  arr =  [{id:1,name:1},{id:2,name:2}]

let first = arr.find(i=>i.name===1)

function myFunc (arr,name){
  const first_1 = arr.find(i=>i.name===name)
  first_1.name = 'new new'
}
myFunc(arr,1)


console.log(first);

