const fs = require('fs');
const path = require('path');

// Чтение файла
const input = fs.readFileSync(path.resolve(__dirname, 'data.txt'), 'utf8');
const lines = input.split('\n').filter(line => line.length);

const cardCopies = {};

for (let i = 0; i < lines.length; i += 1) {
    if (!(i in cardCopies)) {
        cardCopies[i] = 1;
    }

    const [winningNums, nums] = lines[i].split('|').map(part => part.trim());

    const a = winningNums.split(':')[1].trim().split(/\s+/).map(num => parseInt(num));
    const b = nums.split(/\s+/).map(num => parseInt(num));

    const matches = b.reduce((sum, num) => sum + (a.includes(num) ? 1 : 0), 0);

    for (let j = i + 1; j <= i + matches && j < lines.length; j += 1) {
        cardCopies[j] = (cardCopies[j] || 1) + cardCopies[i];
    }
}

const totalCards = Object.values(cardCopies).reduce((sum, count) => sum + count, 0);

console.log(totalCards);