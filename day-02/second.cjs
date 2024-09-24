const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.resolve(__dirname, 'data.txt'), 'utf8');
const games = input.split('\n').filter(line => line.trim() !== '');

function calculateMinimumCubes(gameData) {
    const sets = gameData.split(';');

    let minRed = 0, minGreen = 0, minBlue = 0;

    for (let set of sets) {
        const cubes = set.trim().split(',');

        let redCount = 0, greenCount = 0, blueCount = 0;

        for (let cube of cubes) {
            const [count, color] = cube.trim().split(' ');
            const cubeCount = parseInt(count);

            if (color === 'red') redCount += cubeCount;
            if (color === 'green') greenCount += cubeCount;
            if (color === 'blue') blueCount += cubeCount;
        }

        minRed = Math.max(minRed, redCount);
        minGreen = Math.max(minGreen, greenCount);
        minBlue = Math.max(minBlue, blueCount);
    }

    return { red: minRed, green: minGreen, blue: minBlue };
}

function calculatePower(cubes) {
    return cubes.red * cubes.green * cubes.blue;
}

function sumCubePowers(games) {
    let totalPower = 0;

    for (let game of games) {
        const [, cubeData] = game.split(':');

        const minCubes = calculateMinimumCubes(cubeData.trim());

        const power = calculatePower(minCubes);

        totalPower += power;
    }

    return totalPower;
}

const result = sumCubePowers(games);
console.log(result);