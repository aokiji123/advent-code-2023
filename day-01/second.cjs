const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.resolve(__dirname, 'data.txt'), 'utf8');
const data = input.split('\n');

const numbers = {
    "one": "o1e", 
    "two": "t2o", 
    "three": "t3e",
    "four": "f4r", 
    "five": "f5e",
    "six": "s6x",
    "seven": "s7n", 
    "eight": "e8t", 
    "nine": "n9e",
}

let sum = 0;
for (let element of data) {
    if (element === '') continue;
    
    for (const [word, digit] of Object.entries(numbers)) {
        element = element.replace(new RegExp(word, 'g'), digit);
    }

    let num = element.replace(/[^0-9-]/g, '');

    if (num.length === 1) {
        const numInt = Number(num + num)
        sum += numInt;
    } else {
        const numInt = Number(num[0] + num[num.length - 1])
        sum += numInt;
    }
}

console.log(sum)
