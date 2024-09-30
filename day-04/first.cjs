const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.resolve(__dirname, 'data.txt'), 'utf8');
const lines = input.split('\n');

let totalScore = 0;

for (const line of lines) {
    const [winningNums, nums] = line.split('|');

    const winningNumsFormatted = winningNums.split(':')[1]
        .trim()
        .split(/\s+/)
        .map(num => parseInt(num));

    const numsFormatted = nums.trim()
        .split(/\s+/)
        .map(num => parseInt(num));

    let sum = 0

    for (const num of numsFormatted) {
        if (winningNumsFormatted.includes(num)) {
            if (!sum) sum = 1;
            else sum *= 2;
        }
    }

    totalScore += sum;
}

console.log(totalScore);