const fs = require('fs');
const path = require('path');

const DIRECTIONS = [
    [-1, -1], 
    [-1, 0],
    [-1, 1],  
    [0, -1],  
    [0, 1],   
    [1, -1],  
    [1, 0],
    [1, 1]
];

function isValidSymbol(char) {
    return isNaN(parseInt(char)) && char !== '.';
}

function isAdjacentToSymbol(schematic, row, col) {
    for (let [dx, dy] of DIRECTIONS) {
        const newRow = row + dx;
        const newCol = col + dy;
        if (newRow >= 0 && newRow < schematic.length && newCol >= 0 && newCol < schematic[newRow].length) {
            if (isValidSymbol(schematic[newRow][newCol])) {
                return true;
            }
        }
    }
    return false;
}

function calculateSumOfPartNumbers(schematic) {
    let totalSum = 0;
    let processedLocations = new Set();

    for (let i = 0; i < schematic.length; i++) {
        let row = schematic[i];
        let j = 0;

        while (j < row.length) {
            if (!isNaN(parseInt(row[j])) && !processedLocations.has(`${i},${j}`)) {
                let number = row[j];
                let init_j = j;

                while (j + 1 < row.length && !isNaN(parseInt(row[j + 1]))) {
                    number += row[j + 1];
                    j++;
                }

                for (let colIndex = init_j; colIndex <= j; colIndex++) {
                    processedLocations.add(`${i},${colIndex}`);

                    if (isAdjacentToSymbol(schematic, i, colIndex)) {
                        totalSum += parseInt(number);
                        break; 
                    }
                }
            }
            j++;
        }
    }

    return totalSum;
}

const input = fs.readFileSync(path.resolve(__dirname, 'data.txt'), 'utf8');
const schematic = input.split('\n').map(line => line.split('')); 
const totalSum = calculateSumOfPartNumbers(schematic);
console.log(totalSum);