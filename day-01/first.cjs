const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.resolve(__dirname, 'data.txt'), 'utf8');
const data = input.split('\n');

let sum = 0;
for (const element of data) {
    let num = element.replace(/[^0-9-]/g, '');

    if (num === '') {
        continue;
    }

    if (num.length === 1) {
        const numInt = Number(num + num)
        sum += numInt;
    } else {
        const numInt = Number(num[0] + num[num.length - 1])
        sum += numInt;
    }
}

console.log(sum)


