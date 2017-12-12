var a  =5;
console.log(a);


var numbers = [1,4,5,7];
var person = {};
person.name = "abhishek";
person.age = 23;
person.phones = ["9414014444","86666666666"]
person.address = {}
person.address.street = "hari marg"
person.address.city = "jaipur"
person.address.pincode = 302017
person.speak = function(){
    console.log("hello")
}

person.speak();

console.log(person);

person.phones.push("8888888888");

// numbers.push(8);
// numbers.pop()
var deleted = numbers.splice(1,2,"hello");
console.log(numbers)
console.log(deleted)
numbers.reverse()
console.log(numbers)
var joinedString = numbers.join(":");
console.log(joinedString)

splittedString = joinedString.split(":");
console.log(splittedString);
//concat function
//reference variables

//callback function

var sum = function(a,b){
    console.log("sum");
    return a+b;
}


var operation = function(fx,x,y){
    console.log(fx)
    return fx(x,y)
}


var r = operation(sum,5,6);
var w = operation(diff,5,6);


//Hoisting
function diff(a,b){
    return a-b;
}



console.log(r,w);

//Date
//Random
//Timeout


setTimeout(sum,2000)
console.log("end");












