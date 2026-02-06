import { log } from "node:console";

const now = new Date();


// console.log(`Date : ${now.getDate()}`);


// console.log(`Day: ${now.getDay()}`);

// console.log(`Hour : ${now.getHours()}`);


// console.log(`seconds : ${now.getSeconds()}`);


// console.log(`Date String : ${now.toDateString()}`);


let second;

setTimeout( ()=>{

    second = new Date();


    let diff = second - now;

    console.log(`Diff is : ${diff/1000}s`);
    


}, 5000)