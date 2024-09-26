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
    return !(isFinite(char) || char === '.');
}

function getFullPartNumber(schematic, row, col) {
    let numberStr = schematic[row][col];
    
    let leftCol = col - 1;
    while (leftCol >= 0 && isFinite(schematic[row][leftCol])) {
        numberStr = schematic[row][leftCol] + numberStr;
        leftCol--;
    }

    let rightCol = col + 1;
    while (rightCol < schematic[row].length && isFinite(schematic[row][rightCol])) {
        numberStr += schematic[row][rightCol];
        rightCol++;
    }

    return parseInt(numberStr, 10);
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

function getGearRatio(schematic, row, col) {
    const adjacentNumbers = [];

    for (let [dx, dy] of DIRECTIONS) {
        const adjacentRow = row + dx;
        const adjacentCol = col + dy;

        if (adjacentRow >= 0 && adjacentRow < schematic.length && adjacentCol >= 0 && adjacentCol < schematic[adjacentRow].length) {
            if (isFinite(schematic[adjacentRow][adjacentCol])) {
                const partNumber = getFullPartNumber(schematic, adjacentRow, adjacentCol);
                if (!adjacentNumbers.includes(partNumber)) {
                    adjacentNumbers.push(partNumber);
                }
            }
        }
    }

    if (adjacentNumbers.length === 2) {
        return adjacentNumbers[0] * adjacentNumbers[1];
    }
    return 0;
}

function calculateSumOfAllGearRatios(schematic) {
    let totalSum = 0;

    for (let i = 0; i < schematic.length; i++) {
        for (let j = 0; j < schematic[i].length; j++) {
            if (schematic[i][j] === '*') {
                totalSum += getGearRatio(schematic, i, j);
            }
        }
    }

    return totalSum;
}

const input = fs.readFileSync(path.resolve(__dirname, 'data.txt'), 'utf8');
const schematic = input.split('\n').map(line => line.split(''));
const totalGearRatioSum = calculateSumOfAllGearRatios(schematic);
console.log(totalGearRatioSum);