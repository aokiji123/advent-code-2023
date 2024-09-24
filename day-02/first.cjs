const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.resolve(__dirname, 'data.txt'), 'utf8');
const games = input.split('\n')

const RED_LIMIT = 12;
const GREEN_LIMIT = 13;
const BLUE_LIMIT = 14;

function isGamePossible(gameData) {
    const sets = gameData.split(';');

    for (let set of sets) {
        const cubes = set.trim().split(',');

        let redCount = 0
        let greenCount = 0
        let blueCount = 0;

        for (let cube of cubes) {
            const [count, color] = cube.trim().split(' ');
            const cubeCount = parseInt(count);

            if (color === 'red') redCount += cubeCount;
            if (color === 'green') greenCount += cubeCount;
            if (color === 'blue') blueCount += cubeCount;
        }

        if (redCount > RED_LIMIT || greenCount > GREEN_LIMIT || blueCount > BLUE_LIMIT) {
            return false; 
        }
    }

    return true;
}

function sumPossibleGameIDs(games) {
    let totalSum = 0;

    for (let game of games) {
        const [idPart, cubeData] = game.split(':');
        const gameId = parseInt(idPart.match(/\d+/)[0]);

        if (isGamePossible(cubeData.trim())) {
            totalSum += gameId;
        }
    }

    return totalSum; 
}

const result = sumPossibleGameIDs(games);
console.log(result);