// var myObject; 
// var myThing = body.forEach(myObject);
// console.log(myThing);
var item = ""
var body = [
    {first: "John",
    last: "Doe"
}, 
    {first: "Alison",
    last: "Smith"
}]
for (let item in body) {
    console.log(body[item].first)
}


//   Object.keys(body).forEach(function(key) {
    
//     console.log(key, body[key]);
//   })